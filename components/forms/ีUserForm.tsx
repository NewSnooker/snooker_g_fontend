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
import PasswordInput from "./PasswordInput";
import React, { useState, useEffect } from "react";
import { ShineBorder } from "../magicui/shine-border";
import { Loader2 } from "lucide-react";
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_ERROR_MESSAGE,
} from "@/lib/config/constant";
import Image from "next/image";
import { signupFormSchema, updateUserFormSchema } from "@/lib/config/schemas";
import { useGetUserQuery } from "@/hooks/react-query/queries/user/useGetUser";
import { imageBody, TempUploadProps } from "@/lib/types/common";
import { UpdateUserBody, UserProps, UserSignUpProps } from "@/lib/types/user";
import { deleteFileUploadthing } from "@/app/api/uploadthing/action";
import { Skeleton } from "../ui/skeleton";
import { UploadButton } from "@/lib/utils/uploadthing";
import { useUpdateAvatarMutation } from "@/hooks/react-query/mutation/user/useUpdateAvatarMutation";
import { useGetTempUpload } from "@/hooks/react-query/queries/user/useGetTempUpload";
import { useTempUploadMutation } from "@/hooks/react-query/mutation/admin/useTempUploadMutation";
import { useCreateUserMutation } from "@/hooks/react-query/mutation/user/useCreateUserMutation";
import { useUpdateUserMutation } from "@/hooks/react-query/mutation/user/useUpdateUserMutation";

interface UserFormProps {
  editingId?: string;
}
export default function UserForm({ editingId }: UserFormProps) {
  const isEditing = !!editingId;
  const avatarMutation = useUpdateAvatarMutation();
  const tempUploadMutation = useTempUploadMutation();
  const createUserMutation = useCreateUserMutation();
  const userMutation = useUpdateUserMutation();

  const formSchema = isEditing ? updateUserFormSchema : signupFormSchema;

  const { data: responseUser } = useGetUserQuery(editingId ?? "");
  // enable :isEditing
  const { data: responseTemp } = useGetTempUpload(isEditing ?? "");

  const initialData: UserProps = responseUser?.data || {};
  const initialTempUpload: TempUploadProps[] = responseTemp?.data || {};
  const imageUrl =
    (isEditing ? initialData?.image?.url : initialTempUpload?.[0]?.url) ||
    DEFAULT_AVATAR_URL;

  const [isLoading, setIsLoading] = useState(false);

  // เริ่มต้นฟอร์ม
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialData.username || "",
      email: initialData.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isEditing && initialData && Object.keys(initialData).length > 0) {
      form.reset({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [initialData, isEditing, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (isEditing) {
        const payload: UpdateUserBody = {
          id: editingId,
          username: values.username,
          email: values.email,
        };
        await userMutation.mutateAsync(payload);
      } else {
        const payload: {
          user: UserSignUpProps & { image: imageBody };
          keyTemps: string[];
        } = {
          user: {
            username: values.username,
            email: values.email,
            password: !isEditing
              ? (values as { password: string }).password
              : "",
            image: {
              key: initialTempUpload[0]?.key || "",
              name: initialTempUpload[0]?.name || "",
              url: imageUrl,
            },
          },
          keyTemps:
            initialTempUpload.length > 0
              ? initialTempUpload.map((item) => item.key)
              : [],
        };

        await createUserMutation.mutateAsync(payload);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งฟอร์ม:", error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUploadComplete = async (files: imageBody[]) => {
    try {
      setIsLoading(true);
      const file = files?.[0];
      if (!file) {
        toast.error("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ ❌");
        setIsLoading(false);
        return;
      }

      if (isEditing) {
        const oldImageKey = initialData?.image?.key;
        await avatarMutation.mutateAsync({
          id: initialData.id,
          imageId: initialData.image.id,
          imageData: file,
        });
        if (oldImageKey) {
          try {
            await deleteFileUploadthing([oldImageKey]);
            console.log("Old image deleted successfully:", oldImageKey);
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
          }
        }
      } else {
        await tempUploadMutation.mutateAsync({
          key: file.key,
          name: file.name,
          url: file.url,
        });
      }
    } catch (error) {
      console.error("Upload handler error:", error);
      console.log("error", error);
      toast.error("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ ❌");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <div className="flex justify-center sm:justify-start">
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "แก้ไขผู้ใช้งาน" : "เพิ่มผู้ใช้งาน"}
          </CardTitle>
        </div>
        <CardDescription>
          {isEditing
            ? "โปรดกรอกข้อมูลของคุณเพื่ออัปเดตข้อมูลผู้ใช้"
            : "โปรดกรอกข้อมูลของคุณเพื่อเพิ่มข้อมูลผู้ใช้งาน"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start"
          >
            <div className="grid gap-4">
              {isEditing && (
                <div className="grid gap-2">
                  <FormLabel htmlFor="id">ID User</FormLabel>
                  <Input
                    id="id"
                    type="text"
                    value={editingId}
                    autoComplete="id"
                    disabled={true}
                  />
                </div>
              )}

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
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isEditing && (
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <FormLabel htmlFor="password">Password </FormLabel>
                        </div>
                        <FormControl>
                          <PasswordInput
                            field={field}
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            autoComplete="new-password"
                            disabled={isLoading}
                            disabledEye={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="overflow-hidden px-5">
              <div className="grid gap-3">
                <div className="border p-1 rounded-md">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="h-40 w-full rounded-md object-cover"
                    />
                  ) : (
                    <Skeleton className="h-40 w-full rounded-md object-cover" />
                  )}
                </div>

                <UploadButton
                  endpoint="avatarByAdmin"
                  disabled={isLoading || avatarMutation.isPending}
                  onClientUploadComplete={(files) =>
                    handleUploadComplete(files)
                  }
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    toast.error(`Upload failed: ${error.message}`);
                    setIsLoading(false);
                  }}
                  onUploadBegin={() => setIsLoading(true)}
                  className="ut-button:bg-zinc-900 dark:ut-button:bg-zinc-50 dark:ut-button:text-zinc-900 ut-label:text-zinc-900 dark:ut-label:text-zinc-50 ut-button:ut-readying:bg-zinc-500/50 ut-button:ut-allowed-content:bg-zinc-500/50"
                />
              </div>
            </div>

            <div className="col-span-full">
              <Button
                type="submit"
                className="w-full rounded-sm"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                SAVE
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
