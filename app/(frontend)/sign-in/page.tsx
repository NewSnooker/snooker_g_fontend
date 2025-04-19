"use client";

import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import SignInForm from "@/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <div className="relative  flex w-full min-h-screen items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-sm px-4">
        <SignInForm />
      </div>
    </div>
  );
}
