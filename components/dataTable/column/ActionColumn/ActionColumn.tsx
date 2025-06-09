"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Pencil, MoreHorizontal } from "lucide-react";
import { DeleteActionDialog } from "./DeleteActionDialog";
import { ForceLogoutActionDialog } from "./ForceLogoutActionDialog";
import { UserProps } from "@/lib/types/user";
import { canManageUser, hasSuperAdminRole } from "@/lib/utils/permission";
import { ImpersonationUserAction } from "./ImpersonationUserAction";
import EditItemAction from "./EditItemAction";
import { useMeQuery } from "@/hooks/react-query/queries/user/useMeQuery";

type ModelType = "users" | "projects" | string;

type ActionColumnProps = {
  row: any;
  model: ModelType;
  editEndpoint: string;
  data: UserProps;
  title: string;
};

export default function ActionColumn({
  row,
  model,
  editEndpoint,
  data,
  title,
}: ActionColumnProps) {
  const isSuperAdmin = hasSuperAdminRole(data?.roles);
  if (isSuperAdmin) return null;
  const { data: response } = useMeQuery();
  const dataMe = response?.data;
  const isUserModel = model === "users";
  const rolesTarget = data.roles;

  if (isUserModel) {
    if (!canManageUser(dataMe?.roles, rolesTarget)) return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">เปิดเมนูจัดการ</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>จัดการ{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Model Global */}
        <EditItemAction editEndpoint={editEndpoint} />

        {/* Model User For Super Admin */}
        <ImpersonationUserAction
          title={title}
          id={data.id}
          username={data.username}
          isUserModel={isUserModel}
          dataMe={dataMe}
        />

        {/* Model User */}
        <ForceLogoutActionDialog title={title} model={model} id={data.id} />

        {/* Model Global */}
        <DeleteActionDialog
          title={title}
          model={model}
          id={data.id}
          roles={data.roles}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
