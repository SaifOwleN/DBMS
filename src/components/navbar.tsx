"use client";

import { User, getUserFromLocalStorage } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLayoutTemplate } from "react-icons/lu";
import { MdDashboard, MdHome } from "react-icons/md";
const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(
    function path() {
      if (pathName.includes("Home")) {
        document.getElementById("Home")?.classList.add("bg-white");
      } else if (pathName.includes("Dashboard")) {
        document.getElementById("Dashboard")?.classList.add("bg-white");
      }
    },
    [pathName],
  );

  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }, [pathName]);

  const HandleSignOut = () => {
    localStorage.removeItem("SignedUser");
    setUser(null);
    router.push("/login");
  };

  const ifLogged = () => {
    if (user) {
      return (
        <div className="flex items-center">
          <div className="avatar">
            <div className="rounded-full w-12">
              <img src="https://shorturl.at/qzEQ2" />
            </div>
          </div>
          <div className="flex flex-col items-center pl-2.5 pt-1">
            <label className="text-gray-500 text-xs font-normal">
              Welcome Back
            </label>
            <h2 className="text-lg">{user.name}</h2>
          </div>
        </div>
      );
    }
    return (
      <Link href={"/login"} className="btn btn-primary">
        Sign In
      </Link>
    );
  };

  return (
    <div className="flex-shrink-0 flex-grow-0 navbar w-56 flex flex-col h-full items-start p-5 bg-gray-100">
      <div className="flex gap-4 mb-12">{ifLogged()}</div>
      <div className="flex flex-col gap-4 text-gray-500 font-raleway">
        <Link
          id="Home"
          className="Home text-2xl rounded-lg p-2 flex items-center gap-2 navBtn"
          href={"/Home"}
        >
          <MdHome /> <span className="navSpan">Home</span>
        </Link>
        <button
          id="Dashboard"
          className="text-2xl rounded-lg p-2 flex items-center gap-2 navBtn"
        >
          <MdDashboard /> <span className="navSpan">Data</span>
        </button>
        <button className="text-2xl rounded-lg p-2 flex items-center gap-2 navBtn">
          <LuLayoutTemplate /> <span className="navSpan">Schema</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
