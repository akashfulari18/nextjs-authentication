"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)

  const onSignup = async () => {
   try {
    
     setLoading(true)
     const res = await axios.post(`/api/users/signup`,user)
     console.log(res.data)
     router.push('/login')

   } catch (error:any) {
    console.log("sign up failed",error.message)
    toast.error(error.message)
   }finally{
   setLoading(false)
   }
   
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else {
      // console.log(true)
      setButtonDisabled(true)
      
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
      <h1>{loading?"processing":"Signup"}</h1>
      <hr />
      <label className="text-left" htmlFor="username">
        user name
      </label>
      <input
        type="text"
        id="username"
        className="p-2 text-black rounded-lg ring-amber-500 ring w-[80vw] sm:w-[45vw] lg:w-[35vw]"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

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
        onClick={onSignup}
      >
        {!buttonDisabled ? "Signup":"No Signup"}
        
      </button>
      <Link href={"/login"}>Visit Login here</Link>
    </div>
  );
};

export default SignupPage;
