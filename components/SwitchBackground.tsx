"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import BackgroundEffect from "./BackgroundEffect";
import CanvasBlurSpotsLarge from "./CanvasBlurSpotsLarge";

export default function SwitchBackground() {
  const isMobile = useIsMobile();
  return isMobile ? <BackgroundEffect /> : <CanvasBlurSpotsLarge />;
}
