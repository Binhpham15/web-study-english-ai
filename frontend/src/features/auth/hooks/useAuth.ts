"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginMock, registerMock } from "../api/auth_mock";
import { AuthError, LoginPayload, RegisterPayload } from "../types/auth_types";

const TOKEN_KEY = "auth_token";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  async function login(payload: LoginPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginMock(payload);
      localStorage.setItem(TOKEN_KEY, res.token);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err);
      } else {
        setError(new AuthError("UNKNOWN", "Đã có lỗi xảy ra, vui lòng thử lại."));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function register(payload: RegisterPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await registerMock(payload);
      localStorage.setItem(TOKEN_KEY, res.token);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err);
      } else {
        setError(new AuthError("UNKNOWN", "Đã có lỗi xảy ra, vui lòng thử lại."));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { login, register, isLoading, error };
}