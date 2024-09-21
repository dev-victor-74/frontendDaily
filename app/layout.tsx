import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/components/providers/modal-provider";
import UserProvider from "@/components/providers/UserProvider";
import TanstackQueryClientProvider from "@/components/providers/query-client-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FrontendDaily",
  description:
    "Learn frontend development, learn to build projects and upgrade your skill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <TanstackQueryClientProvider>
          {children}
          <Toaster />
          <UserProvider />
          <ModalProvider />
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
}
