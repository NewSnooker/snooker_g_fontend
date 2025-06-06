import { API_BASE_URL } from "../config/constant";

export const createTempUpload = async (
  key: string,
  name: string,
  url: string
) => {
  const response = await fetch(`${API_BASE_URL}/temp-upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, name, url }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
export const getTempUpload = async () => {
  const response = await fetch(`${API_BASE_URL}/temp-upload`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

export const deleteTempUpload = async () => {
  const response = await fetch(`${API_BASE_URL}/temp-upload`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
