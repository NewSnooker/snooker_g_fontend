import { API_BASE_URL } from "../config/constant";
import { UserSignInProps, UserSignUpProps } from "../types/user";

// ฟังก์ชันสมัครสมาชิก
export const signUp = async (user: UserSignUpProps) => {
  const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันล็อกอิน
export const signIn = async (user: UserSignInProps) => {
  const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันล็อกอินด้วย Google
export const signInWithGoogle = async (idToken: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/sign-in/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

// ฟังก์ชันล็อกเอาท์
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
