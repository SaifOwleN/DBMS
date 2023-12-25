"use client";
import services from "@/services";
import { useEffect, useState } from "react";
import Employees from "./employee";
import Dashboard from "./Dashboard";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";

const HomePage = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    const storedData = localStorage.getItem("SignedUser");
    const user = JSON.parse(storedData as string);
    if (storedData) {
      setUser(user);
    }
  }, []);
  const checkUser = () => {
    if (user) {
      console.log("user", user);
      return <Dashboard />;
    } else {
      router.push("/signin");
    }
  };

  return (
    <Auth>
      <div>{checkUser()}</div>
    </Auth>
  );
};

export default HomePage;
