import Image from "next/image";
import Layout from "./layout";
import NavBar from "@/components/navbar";
import services from "@/services";
import HomePage from "@/components/homepage";

export default function Home() {
  return (
    <div className="p-4 h-screen flex flex-col">
      <NavBar />
      <HomePage />
    </div>
  );
}
