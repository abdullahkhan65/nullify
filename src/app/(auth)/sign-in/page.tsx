import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Sign in — Nullify" };

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <AuthForm mode="sign-in" />
    </div>
  );
}
