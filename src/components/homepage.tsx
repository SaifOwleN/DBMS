"use client";
import services from "@/services";
import { useEffect, useState } from "react";
import Employees from "./employee";
import SignInPage from "./signin";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignInPage />
    </div>
  );
};

export default HomePage;
