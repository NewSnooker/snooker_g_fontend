// src/lib/api/user.ts
import { API_BASE_URL } from "../config";
import {
  GetMeResponse,
  UpdateUserProps,
  UpdateProfileResponse,
} from "./user.type";

// ดึงข้อมูลผู้ใช้ปัจจุบัน
export async function getMe(): Promise<GetMeResponse> {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

// อัพเดตข้อมูลผู้ใช้
export async function updateUserProfile(
  userData: UpdateUserProps
): Promise<UpdateProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  return res.json();
}
