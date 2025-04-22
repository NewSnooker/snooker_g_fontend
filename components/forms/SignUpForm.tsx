"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../PasswordInput";
import React, { useState } from "react"; // เพิ่ม useState
import { signupFormSchema } from "@/lib/schemas";
import { ShineBorder } from "../magicui/shine-border";
import { cn } from "@/lib/utils";
import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config";
import { signUp } from "@/lib/api/auth";
import LogoTextGradient from "../frontend/LogoTextGradient";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state โหลดดิ้ง
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    try {
      setIsLoading(true);
      const response = await signUp(
        values.username,
        values.email,
        values.password
      );
      if (response.status === 201) {
        toast.success(response.message + " ✅");
        router.push("/sign-in");
      } else {
        toast.error(response.message + " ❌");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("เกิดข้อผิดพลาดในการลงทะเบียน");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>

          <LogoTextGradient className="text-base" />
        </div>
        <CardDescription>โปรดกรอกข้อมูลของคุณเพื่อลงทะเบียน</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="username"
                        type="text"
                        autoComplete="username"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="email"
                        type="text"
                        autoComplete="email"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                    </div>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                    </div>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        id="confirmPassword"
                        placeholder="******"
                        autoComplete="confirmPassword"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                        disabledEye={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "กำลังสมัคร..." : "Sign Up"}
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Sign Up with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
