"use client";
import Auth from "@/components/Auth";
import services from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Employees from "./employee";

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
		}
		router.push("/login");
	};

	return <div>{checkUser()}</div>;
};

export default HomePage;
