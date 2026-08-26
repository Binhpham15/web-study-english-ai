import { AuthVisual } from "@/features/auth/components/AuthVisual";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthVisual />
      <div className="flex flex-1 items-center justify-center bg-[#FBF7EF] p-6">
        <div className="relative w-full max-w-[380px] rounded-[20px] bg-white p-9 shadow-[0_30px_60px_-20px_rgba(18,23,43,0.18)]">
          <LoginForm />
        </div>
      </div>
    </>
  );
}