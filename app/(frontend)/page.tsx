"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ElegantShapeMotion from "@/components/motion/ElegantShapeMotion";
import WebsiteNameMotion, {
  fadeUpVariants,
} from "@/components/motion/WebsiteNameMotion";
import { useUser } from "../../lib/store/userStore";

export default function HeroGeometric() {
  const auth = useUser();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/[0.15] via-rose-500/[0.10] to-indigo-500/[0.15] dark:bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/[0.05] via-transparent to-rose-200/[0.05] dark:from-indigo-500/[0.05] dark:to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShapeMotion
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.5] dark:from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShapeMotion
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.7] dark:from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShapeMotion
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.7] dark:from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShapeMotion
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.5] dark:from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShapeMotion
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.5] dark:from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <WebsiteNameMotion />
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              "Premium design, ready for you to challenge players around the
              world in a style like no other."
            </p>
          </motion.div>
          <Link href={auth ? "/home" : "/sign-in"} className="inline-block ">
            <motion.button
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className={cn("button-gradient-1 py-2 px-4 rounded-full")}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
      {/* <SmoothCursor /> */}
      <div className="absolute top-0 inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
