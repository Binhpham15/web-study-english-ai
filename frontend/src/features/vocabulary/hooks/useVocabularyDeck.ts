"use client";

import { useSyncExternalStore } from "react";
import { VocabularyItem } from "../types/vocabulary_types";

const DECK_KEY = "vocabulary_deck";

let cachedRaw: string | null = null;
let cachedDeck: VocabularyItem[] = [];

function getSnapshot(): VocabularyItem[] {
  const raw = localStorage.getItem(DECK_KEY);
  if (raw === cachedRaw) return cachedDeck;

  cachedRaw = raw;
  try {
    cachedDeck = raw ? JSON.parse(raw) : [];
  } catch {
    cachedDeck = [];
  }
  return cachedDeck;
}

function getServerSnapshot(): VocabularyItem[] {
  return [];
}

function subscribe(callback: () => void) {
  window.addEventListener("vocabulary-deck-updated", callback);
  return () => window.removeEventListener("vocabulary-deck-updated", callback);
}

function writeDeck(newDeck: VocabularyItem[]) {
  localStorage.setItem(DECK_KEY, JSON.stringify(newDeck));
  window.dispatchEvent(new Event("vocabulary-deck-updated"));
}

export function useVocabularyDeck() {
  const deck = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function addToDeck(item: VocabularyItem) {
    const current = getSnapshot();
    if (current.some((w) => w.id === item.id)) return;
    writeDeck([...current, item]);
  }

  function removeFromDeck(id: string) {
    const current = getSnapshot();
    writeDeck(current.filter((w) => w.id !== id));
  }

  function isInDeck(id: string) {
    return deck.some((w) => w.id === id);
  }

  return { deck, addToDeck, removeFromDeck, isInDeck };
}