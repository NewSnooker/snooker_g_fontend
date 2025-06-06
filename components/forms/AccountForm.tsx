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
import React, { useEffect, useState } from "react";
import { accountFormSchema } from "@/lib/config/schemas";
import { ShineBorder } from "../magicui/shine-border";
import { Loader2 } from "lucide-react";
import MyAvatarUpload from "./uploads/MyAvatarUpload";
import { useMeQuery } from "@/hooks/react-query/queries/user/useMeQuery";
import { useUpdateUsernameMutation } from "@/hooks/react-query/mutation/user/useUpdateUsernameMutation";

export default function AccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: response, isSuccess } = useMeQuery();
  const data = response?.data;
  const usernameMutation = useUpdateUsernameMutation();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data?.username) {
      form.reset({ username: data.username });
    }
  }, [isSuccess, data, form]);

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    try {
      setIsLoading(true);
      if (data?.username === values.username) {
        toast.info("ไม่มีการแก้ไขชื่อผู้ใช้");
        return;
      }
      await usernameMutation.mutateAsync({
        userId: data.id,
        username: values.username,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขชื่อผู้ใช้ ❌");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <div className="flex justify-center sm:justify-start">
          <CardTitle className="text-2xl font-bold ">บัญชีของคุณ</CardTitle>
        </div>
        <CardDescription className="text-center sm:text-left">
          กรอกข้อมูลเพื่อแก้ไขบัญชีของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* image */}
              <div className="grid auto-rows-max items-start gap-4 ">
                <MyAvatarUpload
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>

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
                        disabled={isLoading}
                        {...field}
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
