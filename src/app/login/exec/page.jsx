"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import auth from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from "@/firebase/firestore/user";
function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Authenticate the user using Firebase Auth
      const user = await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the admin panel after successful login
      console.log(user);
      const userdata = await getUser(user.user.uid);
      console.log(userdata);
      if (userdata.data.executive == true) {
        router.push("/exec");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="p-6">
      <h1 className="font-koulen text-4xl mb-14 text-grey">Executive Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-xl p-3 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-xl p-3 w-full"
        />
        <button
          type="submit"
          className="block p-3 bg-kaavi text-white rounded-xl mx-auto mt-11 w-full"
        >
          Login
        </button>
      </form>
      <div className="mt-10">
        <p className="mb-4">Don't have an Executive Account? </p>
        <a href="/signup/exec" className="bg-kaavi text-white px-4 py-2 rounded-md">Sign up Now</a>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AdminLogin;
