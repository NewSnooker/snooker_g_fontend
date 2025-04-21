import {
  Geist,
  Geist_Mono,
  Pacifico,
  Sriracha,
  Prompt,
  Nunito,
} from "next/font/google";

export const pacificoFont = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const srirachaFont = Sriracha({
  subsets: ["thai"],
  weight: "400",
  variable: "--font-sriracha",
});

export const promptFont = Prompt({
  subsets: ["thai"],
  weight: ["200", "400", "700"],
  variable: "--font-prompt",
});

export const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-nunito",
});
