import React from "react";
import { Metadata } from "next";
import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";

import { getQueryClient } from "@/lib/utils";
import { getUser } from "@/lib/api/user.api";
import UserForm from "@/components/forms/ีUserForm";

export const metadata: Metadata = {
  title: "Update User",
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  return (
    <div className="relative flex w-full min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <CanvasBlurSpotsLarge />
      <div className="relative z-10 w-full max-w-[600px] px-2 py-4 sm:px-4 sm:py-0">
        <UserForm editingId={id} />
      </div>
    </div>
  );
}
