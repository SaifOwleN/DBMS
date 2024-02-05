import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GasWeiss Management System",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="lofi">
      <body
        className={`flex flex-row text-blue-950 ${inter.className} h-screen`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
