// src/lib/api/user.ts
import { imageUrlBody } from "../types/common";
import { backend } from "./apiClient";

export const getMe = async () => {
  const { data } = await backend.api.user.me.get({
    fetch: { credentials: "include" },
  });
  return data;
};
export const updateAvatar = async (id: string, imageUrl: imageUrlBody) => {
  const { data } = await backend.api.user.avatar({ id }).put(
    {
      avatar: imageUrl,
    },
    {
      query: { id },
      fetch: { credentials: "include" },
    }
  );
  return data;
};
export const updateUsername = async (id: string, username: string) => {
  const { data } = await backend.api.user.username({ id }).put(
    {
      username: username,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};
