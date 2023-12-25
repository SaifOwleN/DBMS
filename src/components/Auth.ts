// components/Auth.js
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is not signed in
    const isUserSignedIn = localStorage.getItem("SignedUser");

    // Redirect to login page if not signed in
    if (!isUserSignedIn) {
      router.push("/login"); // Replace with your login page route
    }
  }, []);

  return children;
};

export default Auth;
