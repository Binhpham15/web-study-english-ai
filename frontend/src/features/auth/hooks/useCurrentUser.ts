"use client";

import { useEffect, useState } from "react";
import { User } from "../types/auth_types";

const USER_KEY = "auth_user";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  function readUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    setMounted(true);
    readUser();
    window.addEventListener("auth-user-updated", readUser);
    return () => window.removeEventListener("auth-user-updated", readUser);
  }, []);

  // Trước khi mount xong, LUÔN trả về null — đảm bảo khớp với HTML server render ra
  return mounted ? user : null;
}