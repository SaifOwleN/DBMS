"use client";

import { User, getUserFromLocalStorage } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LuHome,
  LuLayoutDashboard,
  LuLayoutTemplate,
  LuPanelLeftOpen,
  LuPanelRightClose,
} from "react-icons/lu";
import { MdDashboard, MdHome } from "react-icons/md";
const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(
    function path() {
      if (pathName.includes("Home")) {
        setActive("Home");
      } else if (pathName.includes("Dashboard")) {
        setActive("Dashboard");
      } else if (pathName.includes("xdd")) {
        setActive("xdd");
      }
    },
    [pathName, isOpened],
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
          {isOpened ? (
            <div className="flex flex-col items-center pl-2.5 pt-1">
              <label className="text-gray-500 text-xs font-normal">
                Welcome Back
              </label>
              <h2 className="text-lg">{user.name}</h2>
            </div>
          ) : null}
        </div>
      );
    }
    return (
      <Link href={"/login"} className="btn btn-primary">
        Sign In
      </Link>
    );
  };

  return isOpened ? (
    <div className="flex-shrink-0 flex-grow-0 navbar w-[218px] flex flex-col gap-12 h-full items-start p-5 bg-gray-100">
      <div className="flex gap-4">{ifLogged()}</div>
      <div className="flex flex-col gap-4 text-black w-[180px]">
        <Link
          href={"/Dashboard"}
          id="Dashboard"
          className={`navBtn ${active === "Dashboard" ? "bg-white" : null}`}
        >
          <LuLayoutDashboard />
          <span className="navSpan">Dashboard</span>
        </Link>
        <Link
          id="Home"
          className={`navBtn ${active === "Home" ? "bg-white" : null}`}
          href={"/Home"}
        >
          <LuHome />
          <span className="navSpan">Home</span>
        </Link>

        <button className="navBtn">
          <LuLayoutTemplate /> <span className="navSpan">Schema</span>
        </button>
        <button className="navBtn" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <LuPanelLeftOpen /> : <LuPanelRightClose />}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex-shrink-0 flex-grow-0 navbar w-[80px] flex flex-col h-full items-start p-5 bg-gray-100">
      <div className="flex gap-4 mb-12">{ifLogged()}</div>
      <div className="flex flex-col items-center w-11 gap-4 text-gray-400 h-[240px] ">
        <Link
          href="/Dashboard"
          id="Dashboard"
          className={`navBtnClosed ${active === "Dashboard" ? "text-black" : null}`}
        >
          <LuLayoutDashboard />
        </Link>
        <Link
          id="Home"
          className={`navBtnClosed ${active === "Home" ? "text-black" : null}`}
          href={"/Home"}
        >
          <LuHome />
        </Link>

        <button className="navBtnClosed">
          <LuLayoutTemplate />
        </button>
        <button className="navBtnClosed" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <LuPanelLeftOpen /> : <LuPanelRightClose />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
