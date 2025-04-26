"use server";
import { UTApi } from "uploadthing/server";
export const deleteFileUploadthing = async (key: string) => {
  const utapi = new UTApi();
  if (key === undefined || key === "") return;
  await utapi.deleteFiles(key);
};
