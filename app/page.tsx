"use client";
import { useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [user, setUser] = useState<{ fid: number }>();
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    (async () => {
      try {
        // Quick Auth ব্যবহার করে অথেনটিকেটেড রিকোয়েস্ট
        const res = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setStatus("Authentication successful! Redirecting...");
          
          // SDK-কে জানিয়ে দিন যে অ্যাপ লোড হয়েছে
          await sdk.actions.ready();
          
          // অথেনটিকেশন সফল হলে আপনার PHP ড্যাশবোর্ডে পাঠিয়ে দিন
          window.location.replace("https://xtaskai.com/base-mini-app/dashboard.php");
        } else {
          setStatus("Authentication failed. Please open inside Farcaster.");
        }
      } catch (error) {
        console.error("Auth Error:", error);
        setStatus("Error: Could not authenticate. Please try again.");
      }
    })();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center p-4">
          <h1 className="text-3xl font-bold mb-4">XtaskAI.far</h1>
          <p className="text-lg">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold mb-4">XtaskAI.far</h1>
        <p className="text-lg">hello, {user.fid}</p>
      </div>
    </div>
  );
}