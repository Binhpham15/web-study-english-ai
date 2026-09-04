"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginMock, registerMock } from "../api/auth_mock";
import { AuthError, LoginPayload, RegisterPayload, User } from "../types/auth_types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  function persistSession(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // Ghi thêm vào cookie để middleware (server-side) đọc được
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 ngày
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  }

  async function login(payload: LoginPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginMock(payload);
      persistSession(res.token, res.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof AuthError ? err : new AuthError("UNKNOWN", "Đã có lỗi xảy ra, vui lòng thử lại."));
    } finally {
      setIsLoading(false);
    }
  }

  async function register(payload: RegisterPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await registerMock(payload);
      persistSession(res.token, res.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof AuthError ? err : new AuthError("UNKNOWN", "Đã có lỗi xảy ra, vui lòng thử lại."));
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    clearSession();
    router.push("/login");
  }

  function updateUser(updates: Partial<User>) {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return;
    const current: User = JSON.parse(raw);
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("auth-user-updated"));
  }

  return { login, register, logout, updateUser, isLoading, error };
}