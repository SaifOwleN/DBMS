"use client";
import NavBar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
