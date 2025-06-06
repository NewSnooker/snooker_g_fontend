import { DEFAULT_AVATAR_URL } from "@/lib/config/constant";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageColumn(data: any) {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="shrink-0 cursor-pointer">
          <Image
            alt={data.image?.name ?? "image"}
            className="aspect-square rounded-full object-cover"
            height="40"
            src={data.image?.url ?? DEFAULT_AVATAR_URL}
            width="50"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="w-full">
          <Image
            alt={data.image?.name ?? "image"}
            className="aspect-square rounded-md object-cover"
            height="500"
            src={data.image?.url ?? DEFAULT_AVATAR_URL}
            width="500"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">
            ชื่อ: {data.username}
          </DialogTitle>
          <DialogDescription>ID: {data.id}</DialogDescription>
          <DialogDescription>อีเมล: {data.email}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
