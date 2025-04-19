"use client";

import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import SignUpForm from "@/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative  flex w-full min-h-screen items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-sm px-4">
        <SignUpForm />
      </div>
    </div>
  );
}
