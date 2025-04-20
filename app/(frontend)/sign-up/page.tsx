import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (authToken) {
    redirect("/home");
  }
  return (
    <div className="relative  flex w-full min-h-screen items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-sm px-4">
        <SignUpForm />
      </div>
    </div>
  );
}
