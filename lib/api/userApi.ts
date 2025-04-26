// src/lib/api/user.ts
import { imageUrlBody } from "../types/common";
import { Treaty } from "./apiClient";

export const getMe = async () => {
  const { data } = await Treaty.api.user.me.get(
    {},
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};
export const updateAvatar = async (id: string, imageUrl: imageUrlBody) => {
  const { data } = await Treaty.api.user.avatar.put(
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
  const { data } = await Treaty.api.user.username.put(
    {
      username: username,
    },
    {
      query: { id },
      fetch: { credentials: "include" },
    }
  );
  return data;
};
