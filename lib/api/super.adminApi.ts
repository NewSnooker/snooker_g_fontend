import { API_BASE_URL } from "../config/constant";

// ฟังก์ชันบังคับให้ผู้ใช้ logout (Admin)
export const superAdminForceLogoutUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/super-admin/force-logout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันบังคับให้ทุกคน logout (Super Admin เท่านั้น)
export const superAdminForceLogoutAll = async () => {
  const response = await fetch(`${API_BASE_URL}/super-admin/force-logout-all`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันลบผู้ใช้แบบ Soft Delete (Admin)
export const superAdminSoftDeleteUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/super-admin/soft-delete`, {
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

// ฟังก์ชันลบผู้ใช้แบบ Hard Delete (Super Admin)
export const superAdminHardDeleteUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/super-admin/hard-delete`, {
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

// ฟังก์ชันกู้คืนผู้ใช้ (Admin)
export const adminRestoreUser = async (ids: string[]) => {
  const response = await fetch(`${API_BASE_URL}/super-admin/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
