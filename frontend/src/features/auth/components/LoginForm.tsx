"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className="w-full max-w-[380px]">
      <h1 className="mb-1.5 font-serif text-2xl font-medium text-[#1F2430]">
        Chào mừng trở lại
      </h1>
      <p className="mb-7 text-sm text-[#6B7280]">
        Đăng nhập để tiếp tục lộ trình học của bạn.
      </p>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="ban@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex items-center gap-2 text-[#6B7280]">
            <input type="checkbox" className="h-4 w-4" />
            Ghi nhớ tôi
          </label>
          <a href="#" className="font-semibold text-[#D98C3D]">
            Quên mật khẩu?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#F2A65A] text-[#241505] hover:bg-[#D98C3D]"
        >
          Đăng nhập
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-[#B4AC9C]">
        <span className="h-px flex-1 bg-[#EAE4D6]" />
        hoặc
        <span className="h-px flex-1 bg-[#EAE4D6]" />
      </div>

      <Button variant="outline" className="w-full">
        Tiếp tục với Google
      </Button>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Chưa có tài khoản?{" "}
        <a href="/register" className="font-bold text-[#D98C3D]">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}