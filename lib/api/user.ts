import { API_BASE_URL } from "../config";
import { GetMeResponse } from "./user.type";

export const getMe = async (): Promise<GetMeResponse> => {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
