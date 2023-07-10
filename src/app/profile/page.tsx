"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const router = useRouter()
  const [data,setData ] =useState("nothing")
  const logout = async () => {
    try {
      const resp = await axios.get("/api/users/logout");
      console.log(resp.data);
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async()=>{
    const res = await axios.get(`/api/users/me`)
    console.log(res.data)
    setData(res.data.data._id)
  }
 
  useEffect(()=>{
    getUserDetails()
  },[data])

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 text-white bg-slate-900 text-center">
      <h1>ProfilePage</h1>

      <hr />

      <h2  className="p-1 rounded bg-orange-500 " >{data === "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        {" "}
        log out
      </button>
    </div>
  );
}

export default ProfilePage;
