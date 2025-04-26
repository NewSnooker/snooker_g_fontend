import { backend } from "./apiClient";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const { data } = await backend.api.auth["sign-up"].post(
    {
      username,
      email,
      password,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data } = await backend.api.auth["sign-in"].post(
    {
      email,
      password,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};
export const signInWithGoogle = async (idToken: string) => {
  const { data } = await backend.api.auth["sign-in"].google.post(
    {
      idToken,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};

export const signOut = async () => {
  const { data } = await backend.api.auth["sign-out"].post(
    {},
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};
