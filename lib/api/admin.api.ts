import { API_BASE_URL } from "../config/constant";
import { CreateUserProps, UpdateUserBody } from "../types/user";

export const adminSoftDeleteUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/admin/soft-delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันบังคับให้ผู้ใช้ logout (Admin)
export const adminForceLogoutUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/admin/force-logout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }), // ส่ง ids ผ่าน body
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันกู้คืนผู้ใช้ (Admin)
export const adminRestoreUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/admin/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }), // ส่ง ids ผ่าน body
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

export const adminCreateUser = async (user: CreateUserProps) => {
  const response = await fetch(`${API_BASE_URL}/admin/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const adminUpdateUser = async (user: UpdateUserBody) => {
  const response = await fetch(`${API_BASE_URL}/admin/user/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
