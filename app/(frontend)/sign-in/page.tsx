import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import SignInForm from "@/components/forms/SignInForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (authToken) {
    redirect("/home");
  }
  return (
    <div className="relative  flex w-full min-h-screen items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-sm px-4">
        <SignInForm />
      </div>
    </div>
  );
}
