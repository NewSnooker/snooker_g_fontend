import { API_BASE_URL } from "../config";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};
export const signIn = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res.json();
};
