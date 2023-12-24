"use client";

import { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SignedUser") as string);
    setUser(user);
  }, []);

  const ifLogged = () => {
    if (user) {
      return (
        <>
          <button className="btn btn-neutral">{user.name}</button>
        </>
      );
    } else {
      return <button className="btn btn-primary">Sign In</button>;
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
