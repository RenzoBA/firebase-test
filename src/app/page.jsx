"use client";

import "./globals.css";
import { useRouter } from "next/navigation";
import { logInGithub, logInGoogle } from "../../firebase/authUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { BsGithub, BsGoogle } from "react-icons/bs";
import "../../firebase/messagingUser";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    {
      router.push(`/user/${user.uid}`);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen text-gray-800">
      <p className="font-light uppercase tracking-wider text-sm">
        firebase-test
      </p>
      <h1 className="tracking-widest uppercase font-bold text-5xl mb-10">
        Welc<span className="text-red-500">o</span>me
      </h1>
      <div className="flex flex-col gap-3 text-2xl">
        <button
          onClick={logInGoogle}
          className="login-button inline-flex items-center gap-2"
        >
          <BsGoogle />
          Log In with Google
        </button>
        <button
          onClick={logInGithub}
          className="login-button inline-flex items-center gap-2"
        >
          <BsGithub />
          Log In with GitHub
        </button>
      </div>
    </main>
  );
}

//route to user route w/next/navigation
//protect user route w/login requirement
//useContext to user data and dark mode
