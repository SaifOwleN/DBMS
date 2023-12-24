import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="lofi">
      <body className={`p-4 h-screen flex flex-col ${inter.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;