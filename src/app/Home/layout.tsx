"use client";
import services from "@/services";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	// useEffect(() => {
	// 	(async () => {
	// 		const { token } = await JSON.parse(
	// 			localStorage.getItem("SignedUser") as string,
	// 		);
	// 		console.log("token", token);
	// 	})();
	// }, []);
	return <div className="h-full">{children}</div>;
};

export default Layout;
