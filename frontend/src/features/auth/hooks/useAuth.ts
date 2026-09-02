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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    router.push("/login");
  }

  return { login, register, logout, isLoading, error };
}