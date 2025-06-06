import { imageBody, TableParams } from "../types/common";
import { API_BASE_URL } from "../config/constant";

// ฟังก์ชันดึงข้อมูลผู้ใช้ปัจจุบัน
export const getMe = async () => {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
export const getUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

// ฟังก์ชันอัปเดต Avatar
export const updateAvatar = async (id: string, image: imageBody) => {
  const response = await fetch(`${API_BASE_URL}/user/avatar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: image }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันอัปเดต Username
export const updateUsername = async (id: string, username: string) => {
  const response = await fetch(`${API_BASE_URL}/user/me/username/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
