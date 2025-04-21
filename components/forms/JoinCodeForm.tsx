"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import React, { useState } from "react"; // เพิ่ม useState
import { joinCodeFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { ShineBorder } from "../magicui/shine-border";

export default function JoinCodeForm() {
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state โหลดดิ้ง
  const router = useRouter();

  const form = useForm<z.infer<typeof joinCodeFormSchema>>({
    resolver: zodResolver(joinCodeFormSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof joinCodeFormSchema>) {
    // try {
    //   setIsLoading(true);
    //   const response =
    //   if (response.status === "success") {
    //     toast.success(response.message + " ✅");
    //     router.push("/home");
    //     router.refresh();
    //   } else if (response.status === "error") {
    //     toast.error(response.message + " ❌");
    //   }
    // } catch (error) {
    //   console.error("Form submission error", error);
    //   toast.error("เกิดข้อผิดพลาดในการล็อกอิน");
    // } finally {
    //   setIsLoading(false);
    // }
  }
  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="joinCode"
            render={({ field }) => (
              <FormItem>
                <div className="relative overflow-hidden rounded-md p-0.5">
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <FormControl>
                    <Input
                      id="joinCode"
                      placeholder="Enter a Join Code"
                      type="text"
                      autoComplete="joinCode"
                      disabled={isLoading}
                      {...field}
                      className="pr-28 w-72 h-10 sm:w-96 sm:h-12 placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-0 focus:ring-offset-0" // กันพื้นที่ให้ปุ่ม
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading}
                    className={cn(
                      "font-bold border  absolute right-1 top-1/2 -translate-y-1/2 px-4 button-gradient-1 transition-colors duration-300 "
                    )}
                  >
                    {isLoading ? "กำลังเข้าห้อง..." : "JOIN"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
