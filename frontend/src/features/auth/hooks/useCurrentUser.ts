"use client";

import { useEffect, useState } from "react";
import { User } from "../types/auth_types";

const USER_KEY = "auth_user";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return user;
}