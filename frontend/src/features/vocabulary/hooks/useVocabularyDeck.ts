"use client";

import { useEffect, useState } from "react";
import { VocabularyItem } from "../types/vocabulary_types";

const DECK_KEY = "vocabulary_deck";

function readDeck(): VocabularyItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DECK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeDeck(deck: VocabularyItem[]) {
  localStorage.setItem(DECK_KEY, JSON.stringify(deck));
  window.dispatchEvent(new Event("vocabulary-deck-updated"));
}

export function useVocabularyDeck() {
  const [deck, setDeck] = useState<VocabularyItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDeck(readDeck());

    function sync() {
      setDeck(readDeck());
    }
    window.addEventListener("vocabulary-deck-updated", sync);
    return () => window.removeEventListener("vocabulary-deck-updated", sync);
  }, []);

  function addToDeck(item: VocabularyItem) {
    const current = readDeck();
    if (current.some((w) => w.id === item.id)) return;
    writeDeck([...current, item]);
  }

  function removeFromDeck(id: string) {
    const current = readDeck();
    writeDeck(current.filter((w) => w.id !== id));
  }

  function isInDeck(id: string) {
    return deck.some((w) => w.id === id);
  }

  return {
    deck: mounted ? deck : [], // tránh hydration mismatch, giống pattern useCurrentUser
    addToDeck,
    removeFromDeck,
    isInDeck,
  };
}