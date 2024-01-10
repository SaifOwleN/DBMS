import services from "@/services";
import { useRouter } from "next/navigation";
// components/Auth.js
import { ReactNode, useEffect } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	useEffect(() => {
		const user = localStorage.getItem("SignedUser");
		if (!user) {
			router.push("/login");
		}
		(async () => {
			try {
				const { token } = JSON.parse(user as string);
				const xdd = await services.checkAuth(token);
			} catch (err) {
				await localStorage.removeItem("SignedUser");
				router.push("/login");
			}
		})();
	}, [router]);

	return children;
};

export default Auth;
