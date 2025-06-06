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
import { Trash } from "lucide-react";
import { useAdminSoftDeleteUserMutation } from "@/hooks/react-query/mutation/admin/useAdminSoftDeleteUserMutation";
import { toast } from "sonner";
import { ModelType } from "@/lib/types/common";

export function DeleteActionDialog({
  title,
  model,
  id,
}: {
  title: string;
  model: ModelType;
  id: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const adminSoftDeleteUserMutation = useAdminSoftDeleteUserMutation();

  const handleDeleteAction = async () => {
    if (!id) {
      toast.error("ไม่พบ ID สำหรับการลบ");
      setOpen(false);
      return;
    }

    try {
      setIsLoading(true);
      if (model === "users") {
        await adminSoftDeleteUserMutation.mutateAsync({ ids: [id] });
      } else {
        throw new Error(`Unsupported model: ${model}`);
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || `เกิดข้อผิดพลาดในการลบ ${title}`);
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
          className="text-red-600 hover:text-red-700 cursor-pointer rounded-sm w-full flex items-center justify-start"
          disabled={!title}
        >
          <Trash className="w-4 h-4 mr-0.5 flex-shrink-0" />
          <span>ลบ</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจแล้วหรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้จะออกจากระบบและลบ{" "}
            <span className="text-red-600 dark:text-red-400">{title}นี้</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
            onClick={handleDeleteAction}
            disabled={isLoading}
          >
            ยืนยันการลบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
