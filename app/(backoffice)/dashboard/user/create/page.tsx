import React from "react";
import { Metadata } from "next";
import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import UserForm from "@/components/forms/ีUserForm";

export const metadata: Metadata = {
  title: "Create User",
};

export default async function page() {
  return (
    <div className="relative flex w-full min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-[600px] px-2 py-4 sm:px-4 sm:py-0">
        <UserForm />
      </div>
    </div>
  );
}
