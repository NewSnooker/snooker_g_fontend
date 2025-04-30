import { imageBody } from "../types/common";
import { backend } from "./apiClient";

export const getMe = async () => {
  const { data } = await backend.api.user.me.get({
    fetch: { credentials: "include" },
  });
  return data;
};
export const updateAvatar = async (id: string, image: imageBody) => {
  const { data } = await backend.api.user.me.avatar({ id }).put(
    {
      avatar: image,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};

export const updateUsername = async (id: string, username: string) => {
  const { data } = await backend.api.user.me.username({ id }).put(
    {
      username: username,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};
