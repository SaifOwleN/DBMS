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
    setUser(null);
    router.push("/login");
  };

  const ifLogged = () => {
    if (user) {
      return (
        <div className="dropdown dropdown-end">
          <button type="button" className="btn btn-neutral">
            {user.name}
          </button>
          <ul className="dropdown-content menu w-36 shadow bg-base-100 ">
            <li>
              <button type="button" onClick={HandleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
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
    <div className="navbar bg-base-100 shadow shadow-black flex justify-between">
      <h1 className="text-2xl ml-6">
        <a href="/Home">Dashboard</a>
      </h1>
      <div className="flex gap-4">{ifLogged()}</div>
    </div>
  );
};

export default NavBar;
