import BackgroundEffect from "@/components/BackgroundEffect";
import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import JoinCodeForm from "@/components/forms/JoinCodeForm";
import SwiperSlideGames from "@/components/frontend/SwiperSlideGames";
import SwitchBackground from "@/components/SwitchBackground";
import { pacificoFont } from "@/font/font";
import { WEBSITE_NAME } from "@/lib/config/constant";
import { cn } from "@/lib/utils";
import { Gamepad2 } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function page() {
  const data = [
    {
      id: 1,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 2,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 3,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 4,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 5,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 6,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
    {
      id: 7,
      name: "Game 1",
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
  ];
  return (
    <div className="relative min-h-screen overflow-hidden w-full flex justify-center">
      <SwitchBackground />
      <div className="">
        <div className="my-10 sm:my-20 flex flex-col items-center z-20">
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-10 tracking-tight "
            )}
          >
            <span
              className={cn("text-gradient-1 z-10 ", pacificoFont.className)}
            >
              {WEBSITE_NAME}
            </span>
          </h1>
          <div className="relative">
            <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 blur-3xl opacity-60 rounded-2xl z-[-1] bg-gradient-to-r from-indigo-400 via-white/5 to-rose-400"></div>
            <JoinCodeForm />
          </div>
        </div>
        <div className="z-10 max-w-xs sm:max-w-3xl md:max-w-5xl xl:max-w-7xl flex flex-col items-center justify-center gap-6">
          <div className="w-full flex items-center justify-between px-4 sm:px-0 border-b pb-4">
            {" "}
            <h2 className="text-xl font-semibold flex items-center gap-2 ">
              <Gamepad2 className=" w-5 h-5" />{" "}
              <span className="hidden sm:inline">แนะนำ</span>{" "}
            </h2>{" "}
            <Link href={"/games"} className="underline">
              ดูเกมทั้งหมด
            </Link>
          </div>
          <SwiperSlideGames data={data} />
        </div>
      </div>
    </div>
  );
}
