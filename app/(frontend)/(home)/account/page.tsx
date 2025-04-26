import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import AccountForm from "@/components/forms/AccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default async function page() {
  return (
    <div className="relative  flex w-full min-h-screen justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-sm px-4 mt-10 sm:mt-20">
        <AccountForm />
      </div>
    </div>
  );
}
