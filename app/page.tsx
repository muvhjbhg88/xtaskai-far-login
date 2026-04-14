"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // চেক করা হচ্ছে এটা Farcaster এর ভেতর থেকে ওপেন করা হয়েছে কিনা
    if (typeof window !== 'undefined') {
      setStatus("Verifying Farcaster identity...");
      
      // Farcaster SDK লোড করা
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/@farcaster/mini-app-sdk@latest/dist/index.min.js";
      script.onload = () => {
        try {
          const sdk = new (window as any).MiniAppSDK();
          sdk.ready().then((context: any) => {
            const user = context?.user;
            if (user && user.fid) {
              setStatus(`Welcome @${user.username || 'farcaster user'}! Redirecting to XtaskAI...`);
              // সরাসরি আপনার PHP ড্যাশবোর্ডে রিডাইরেক্ট করা
              window.location.href = "https://xtaskai.com/base-mini-app/dashboard.php";
            } else {
              setStatus("Please open this app inside Farcaster.");
            }
          }).catch((err: any) => {
            console.error(err);
            setStatus("Error: Please open this app inside Farcaster.");
          });
        } catch (e) {
          setStatus("Error: Farcaster SDK failed to load.");
        }
      };
      script.onerror = () => setStatus("Error: Could not load Farcaster SDK.");
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold mb-4">XtaskAI.far</h1>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}