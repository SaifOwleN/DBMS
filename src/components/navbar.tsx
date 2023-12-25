"use client";

import { User, getUserFromLocalStorage } from "@/utils";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const xdd = async () => {
      const user = await getUserFromLocalStorage();
      setUser(user);
    };
    xdd();
  }, []);

  const HandleSignOut = () => {
    localStorage.removeItem("SignedUser");
    router.push("/login");
  };

  const ifLogged = () => {
    if (user) {
      return (
        <div className="dropdown dropdown-end">
          <button role="button" className="btn btn-neutral">
            {user.name}
          </button>
          <ul className="dropdown-content menu w-36 shadow bg-base-100 ">
            <li>
              <button onClick={HandleSignOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <Link href={"/login"} className="btn btn-primary">
          Sign In
        </Link>
      );
    }
  };

  return (
    <div className="navbar bg-base-100 shadow shadow-black flex justify-between">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="flex gap-4">{ifLogged()}</div>
    </div>
  );
};

export default NavBar;
