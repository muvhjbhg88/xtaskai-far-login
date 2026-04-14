"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const init = async () => {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk");
        
        setStatus("Connecting to Farcaster...");
        await sdk.actions.ready();
        
        setStatus("Fetching user data...");
        // @ts-ignore - TypeScript error bypass for working method
        const user = await sdk.user.getUser();
        
        if (user && user.fid) {
          setStatus(`Welcome @${user.username || "user"}! Redirecting...`);
          window.location.replace("https://xtaskai.com/base-mini-app/dashboard.php");
        } else {
          setStatus("Please open this app inside Farcaster.");
        }
      } catch (error) {
        console.error("Init Error:", error);
        setStatus("Error: Could not initialize Farcaster SDK. Please ensure you're in the Farcaster app.");
      }
    };
    
    init();
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