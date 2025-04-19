import { Pacifico } from "next/font/google";
import { Sriracha } from "next/font/google";

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
