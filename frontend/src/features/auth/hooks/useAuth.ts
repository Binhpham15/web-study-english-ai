"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginMock, registerMock } from "../api/auth_mock";
import { AuthError, LoginPayload, RegisterPayload, User } from "../types/auth_types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function persistSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

function normalizeAuthError(err: unknown): AuthError {
  return err instanceof AuthError
    ? err
    : new AuthError("UNKNOWN", "Đã có lỗi xảy ra, vui lòng thử lại.");
}

export function useAuth() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        return await loginMock(payload);
      } catch (err) {
        throw normalizeAuthError(err);
      }
    },
    onSuccess: (res) => {
      persistSession(res.token, res.user);
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      try {
        return await registerMock(payload);
      } catch (err) {
        throw normalizeAuthError(err);
      }
    },
    onSuccess: (res) => {
      persistSession(res.token, res.user);
      router.push("/dashboard");
    },
  });

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

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    updateUser,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: (loginMutation.error ?? registerMutation.error) as AuthError | null,
  };
}