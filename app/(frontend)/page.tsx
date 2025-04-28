import WelcomeScreen from "@/components/WelcomeScreen";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;
  return <WelcomeScreen authToken={authToken} />;
}
