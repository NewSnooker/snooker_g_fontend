import { API_BASE_URL } from "../config";

export const getMe = async () => {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
