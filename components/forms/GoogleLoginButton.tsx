"use client";
import { signInWithGoogle } from "@/lib/api/authApi";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/config/constant";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function GoogleLoginButton({
  text = "continue_with",
}: {
  text?: "continue_with" | "signin" | "signin_with" | "signup_with";
}) {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) return console.error("No ID token returned");

    try {
      const response = await signInWithGoogle(idToken);
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        router.push("/home");
        router.refresh();
      } else {
        toast.error(response?.message || DEFAULT_ERROR_MESSAGE);
      }
    } catch (err) {
      console.error(err);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    toast.error(DEFAULT_ERROR_MESSAGE);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap={false}
      auto_select
      size="large"
      shape="rectangular"
      locale="en"
      theme="outline"
      text={text}
      width="100%"
    />
  );
}
