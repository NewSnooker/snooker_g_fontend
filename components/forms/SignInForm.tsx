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
import PasswordInput from "./PasswordInput";
import React, { useState } from "react"; // เพิ่ม useState
import { signinFormSchema } from "@/lib/config/schemas";
import { ShineBorder } from "../magicui/shine-border";
import { signIn } from "@/lib/api/auth.api";
import LogoTextGradient from "../frontend/LogoTextGradient";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Loader2 } from "lucide-react";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/config/constant";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state โหลดดิ้ง
  const router = useRouter();

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    try {
      setIsLoading(true);
      const response = await signIn({
        email: values.email,
        password: values.password,
      });
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        console.log(response);

        router.push("/home");
        router.refresh();
      } else {
        toast.error(response?.message || DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false); // ✅ หยุดโหลด ไม่ว่าจะสำเร็จหรือไม่
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>

          <LogoTextGradient className="text-base" />
        </div>
        <CardDescription>
          โปรดกรอกข้อมูลของคุณเพื่อเข้าสู่ระบบบัญชี
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
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
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        ลืมรหัสผ่านใช่ไหม?
                      </Link>
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

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full rounded-sm"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <GoogleLoginButton text="signin_with" />
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          ยังไม่มีบัญชี?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
