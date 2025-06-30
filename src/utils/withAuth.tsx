// utils/withAuth.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent = () => {
    const router = useRouter();

    useEffect(() => {
      const username = sessionStorage.getItem("username");
      if (!username) {
        router.push("/sign");
      }
    }, []);

    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;
