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
import { LogOut } from "lucide-react";
import { useAdminForceLogoutUserMutation } from "@/hooks/react-query/mutation/admin/useAdminForceLogoutUserMutation";
import { Table } from "@tanstack/react-table";

export default function AdminForceLogoutUsersDialog({
  ids,
  titleText,
  table,
}: {
  ids: string[];
  titleText?: string;
  table: Table<any>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const AdminForceLogoutUserMutation = useAdminForceLogoutUserMutation();

  const handleDeleteSelected = async () => {
    try {
      setIsLoading(true);
      const response = await AdminForceLogoutUserMutation.mutateAsync({
        ids,
      });
      if (response.status === 200) {
        table.resetRowSelection();
      }
    } catch (error) {
      console.error("Error Logout selected items:", error);
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
          className="h-8 border-dashed text-xs px-2 lg:px-3"
        >
          <LogOut className="h-4 w-4 mr-0.5" />
          <div className="hidden sm:block">ออกจากระบบ</div>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            {ids.length}
          </Badge>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจแล้วหรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้จะออกจากระบบ{" "}
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
              "ยืนยันการออกจากระบบ"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
