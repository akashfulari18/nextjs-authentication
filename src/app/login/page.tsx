"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const resp = await axios.post(`/api/users/login`, user);
      console.log("login success", resp.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1>Login</h1>
      <hr />
      <label className="text-left" htmlFor="email">
        email
      </label>
      <input
        type="text"
        id="email"
        className="p-2 text-black rounded-lg ring-amber-500 ring w-[80vw] sm:w-[45vw] lg:w-[35vw]"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label className="text-left" htmlFor="password">
        password
      </label>
      <input
        type="password"
        id="password"
        className="p-2 text-black rounded-lg ring-amber-500 ring w-[80vw] sm:w-[45vw] lg:w-[35vw]"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        className="w-[10vw] bg-amber-300 text-black font-bold mt-2 p-[1rem] rounded-xl"
        onClick={onLogin}
      >
        {" "}
        {buttonDisabled ? "Login" : "not now"}
      </button>
      <Link className="text-black" href={"/signup"}>
        Visit Signup here
      </Link>
    </div>
  );
};

export default LoginPage;
