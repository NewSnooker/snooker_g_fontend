import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { useAdminSoftDeleteUserMutation } from "@/hooks/react-query/mutation/admin/useAdminSoftDeleteUserMutation";
import { Role } from "@/lib/types/user";

export default function AdminDeleteUsersDialog({
  ids,
  titleText,
  rolesMe,
}: {
  ids: string[];
  titleText?: string;
  rolesMe: Role[];
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const destructiveActionClass =
    "h-8 text-red-500 dark:text-white hover:text-red-600 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 border-dashed border-red-500 dark:border-red-400";
  const AdminSoftDeleteUserMutation = useAdminSoftDeleteUserMutation();

  const handleDeleteSelected = async () => {
    try {
      setIsLoading(true);
      await AdminSoftDeleteUserMutation.mutateAsync({
        ids,
        roles: rolesMe,
      });
    } catch (error) {
      console.error("Error deleting selected items:", error);
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`${destructiveActionClass} text-xs px-2 lg:px-3`}
        >
          <Trash className="h-4 w-4 mr-0.5" />
          <div className="hidden sm:block">ลบ</div>
          <Separator
            orientation="vertical"
            className="mx-2 h-4 bg-red-500 dark:bg-red-400"
          />
          <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal bg-red-400 dark:bg-red-400 text-white"
          >
            {ids.length}
          </Badge>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจแล้วหรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้จะออกจากระบบและลบ{" "}
            <span className="text-red-600 dark:text-red-400">
              {titleText} {ids.length} รายการ
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>ยกเลิก</AlertDialogCancel>
          <Button
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
            onClick={() => handleDeleteSelected()}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white dark:border-white border-t-transparent rounded-full "></div>
            ) : (
              "ยืนยันการลบ"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
