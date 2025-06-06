"use server";
import { UTApi } from "uploadthing/server";
export const deleteFileUploadthing = async (keys: string[]) => {
  const utapi = new UTApi();
  if (keys === undefined || keys === null || keys.length === 0) return;
  await utapi.deleteFiles(keys);
};
