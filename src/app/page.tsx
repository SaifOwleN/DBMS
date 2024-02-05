"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const app = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/Home");
  }, []);

  return <div></div>;
};

export default app;
