"use client";

import { useState } from "react";
import { User } from "../types/auth_types";

const USER_KEY = "auth_user";

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function useCurrentUser() {
  const [user] = useState<User | null>(getInitialUser);

  return user;
}