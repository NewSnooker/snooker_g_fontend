import { Geist, Geist_Mono, Pacifico, Sriracha } from "next/font/google";

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

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
