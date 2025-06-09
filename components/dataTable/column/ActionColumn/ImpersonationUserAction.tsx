"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { hasSuperAdminRole } from "@/lib/utils/permission";
import { ImpersonationUser } from "@/lib/api/super.adminApi";
import { useRouter } from "next/navigation";
import { UserProps } from "@/lib/types/user";

export function ImpersonationUserAction({
  id,
  title,
  isUserModel,
  username,
  dataMe,
}: {
  id: string;
  title: string;
  username: string;
  isUserModel: boolean;
  dataMe: UserProps;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const isSuperAdmin = hasSuperAdminRole(dataMe?.roles);
  const isSuperAdminAndModelUser = isSuperAdmin && isUserModel;
  const router = useRouter();

  if (dataMe.id === id) return null;

  // เช็คว่าเป็น super admin หรือไม่
  if (!isSuperAdminAndModelUser) return null;

  const handleImpersonation = async () => {
    if (!id) {
      toast.error("ไม่พบ ID");
      setOpen(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await ImpersonationUser(id);
      if (response.status === 200) {
        router.push("/home");
        toast.success(`เข้าสู่ระบบ${title} ${username}  สําเร็จ ✅`);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Impersonation error:", error);
      toast.error(
        error.message || `เกิดข้อผิดพลาดในการเข้าสู่ระบบ${title} ${username} `
      );
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer rounded-sm w-full flex items-center justify-start"
          disabled={!title}
        >
          <KeyRound className="w-4 h-4 mr-0.5 flex-shrink-0" />
          <span>เข้าสู่ระบบ</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจแล้วหรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้จะทำการเข้าสู่ระบบ{" "}
            <span className="text-zinc-600 dark:text-zinc-400">
              {title}นี้ {username}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            className="bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-500 dark:hover:bg-zinc-600 text-white"
            onClick={handleImpersonation}
            disabled={isLoading}
          >
            ยืนยันการเข้าสู่ระบบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
