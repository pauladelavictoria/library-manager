import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div className="p-14 bg-[url(/images/background.jpg)] bg-cover">
      <div className="space-y-2 bg-background rounded-lg w-full max-w-md mx-auto p-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign up for a new account to get started
        </p>
        <RegisterForm />
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our terms of service and privacy
        policy.
      </p>
    </div>
  );
}
