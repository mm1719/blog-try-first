import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import NavBar from "@/src/app/components/NavBar";
import MyProfilePic from "@/src/app/components/MyProfilePic";
import SessionWrapper from '@/src/app/components/SessionWrapper'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel's Blog",
  description: "Created by Daniel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className="bg-dcardDark">
          <NavBar />
          <MyProfilePic />
          {children}
      </body>
    </html>
    </SessionWrapper>
  );
}
