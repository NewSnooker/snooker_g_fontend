import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WEBSITE_NAME } from "@/lib/config";
import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: WEBSITE_NAME,
//   description: `${WEBSITE_NAME} `,
//   metadataBase: new URL("https://it-udvc-pms.vercel.app/"),
//   twitter: {
//     card: "summary_large_image",
//     site: "it-udvc-pms.vercel.app",
//     title: WEBSITE_NAME,
//     description: `${WEBSITE_NAME} `,
//     images: ["https://it-udvc-pms.vercel.app/picture1.jpg"],
//   },
//   openGraph: {
//     title: WEBSITE_NAME,
//     description: `${WEBSITE_NAME} `,
//     images: ["https://it-udvc-pms.vercel.app/picture1.jpg"],
//   },
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <div className="flex flex-col flex-1 ">
          {/* <Navbar /> */}
          <main className="flex-1 ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
