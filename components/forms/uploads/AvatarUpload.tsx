"use client";
import { UploadButton } from "@/lib/utils/uploadthing";
import { useMeQuery } from "@/hooks/react-query/queries/useMeQuery";
import Image from "next/image";
import { toast } from "sonner";
import { useAvatarMutation } from "@/hooks/react-query/mutation/useAvatarMutation";
import { imageBody } from "@/lib/types/common";
import { deleteFileUploadthing } from "@/app/api/uploadthing/action";
import { Skeleton } from "@/components/ui/skeleton";

type AvatarUploadProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AvatarUpload({
  isLoading,
  setIsLoading,
}: AvatarUploadProps) {
  const { data: response } = useMeQuery();
  const userData = response?.data;
  const avatarMutation = useAvatarMutation();

  const handleUploadComplete = async (files: imageBody[]) => {
    try {
      setIsLoading(true);
      const file = files?.[0];

      if (!file || !userData?.image?.id) {
        toast.error("เกิดข้อผิดพลาดในการแก้ไขภาพโปรไฟล์ ❌");
        setIsLoading(false);
        return;
      }
      const oldImageKey = userData?.image?.key;
      await avatarMutation.mutateAsync({
        imageId: userData.image.id,
        imageData: file,
      });
      if (oldImageKey) {
        try {
          await deleteFileUploadthing(oldImageKey);
          console.log("Old image deleted successfully:", oldImageKey);
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError);
        }
      }
    } catch (error) {
      console.error("Upload handler error:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขภาพโปรไฟล์ ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden px-5">
      <div className="grid gap-3">
        <div className="border p-1 rounded-md">
          {userData?.image?.url ? (
            <Image
              src={userData.image.url}
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
          endpoint="avatar"
          disabled={isLoading || avatarMutation.isPending}
          onClientUploadComplete={(files) => handleUploadComplete(files)}
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
  );
}
