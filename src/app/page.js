"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onSignup = () => {
    return router.push("/signup");
  };
  const onSignin = () => {
    return router.push("/signin");
  };
  return (
    <div className="flex flex-wrap min-h-screen flex-row items-center justify-center p-24">
      <button
        className="m-2  border border-solid bg-orange-200"
        onClick={onSignup}
      >
        Sign up
      </button>
      <button
        className=" border border-solid bg-emerald-200 m-2"
        onClick={onSignin}
      >
        Sign in
      </button>
    </div>
  );
}
