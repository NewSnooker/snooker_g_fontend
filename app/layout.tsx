/* eslint-disable @next/next/no-css-tags */
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { nunitoFont, promptFont } from "@/font/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${promptFont.variable} ${nunitoFont.variable} ${promptFont.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster
          richColors
          toastOptions={{ duration: 5000 }}
          position="top-center"
        />
      </body>
    </html>
  );
}
