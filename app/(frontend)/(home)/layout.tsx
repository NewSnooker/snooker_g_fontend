import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/lib/api/userApi";
import { userSidebarLinks } from "@/lib/config/sidebarLink";
import { getQueryClient } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) {
    return <main className="flex-1 overflow-y-auto ">{children}</main>;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <div className="flex h-screen w-full ">
          <AppSidebar sidebarLinks={userSidebarLinks} />
          <div className="flex flex-col flex-1  ">
            <Navbar />
            <main className="flex-1 overflow-y-auto ">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
