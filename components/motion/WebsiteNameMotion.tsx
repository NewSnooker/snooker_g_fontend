"use client";

import React from "react";
import { pacificoFont } from "@/font/font";
import { WEBSITE_NAME } from "@/lib/config/constant";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};
export default function WebsiteNameMotion({
  textClassName,
}: {
  textClassName?: string;
}) {
  return (
    <motion.div
      custom={1}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
    >
      <h1
        className={cn(
          "text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight ",
          textClassName
        )}
      >
        <span className={cn("text-gradient-1", pacificoFont.className)}>
          {WEBSITE_NAME}
        </span>
      </h1>
    </motion.div>
  );
}
