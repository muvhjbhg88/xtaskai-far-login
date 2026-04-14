"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const loadAndInitSDK = async () => {
      setStatus("Loading Farcaster SDK...");
      try {
        // SDK লোড করা হচ্ছে
        const sdkModule = await import('@farcaster/miniapp-sdk');
        const { sdk } = sdkModule;
        
        // SDK রেডি হওয়ার জন্য অপেক্ষা (এটা খুবই জরুরি!)
        await sdk.actions.ready();[reference:0]
        setStatus("SDK Ready. Fetching user context...");

        // ইউজারের তথ্য নেওয়া
        const user = await sdk.user.getUser();
        
        if (user && user.fid) {
          setStatus(`Welcome @${user.username || 'farcaster user'}! Redirecting...`);
          window.location.href = "https://xtaskai.com/base-mini-app/dashboard.php";
        } else {
          setStatus("Error: Could not fetch user. Please open inside Farcaster.");
        }
      } catch (error) {
        console.error("SDK Initialization Error:", error);
        setStatus("Error: Could not load Farcaster SDK. Please ensure you are inside the Farcaster app.");
      }
    };

    loadAndInitSDK();
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