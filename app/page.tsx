"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@farcaster/miniapp-sdk@0.2.0/dist/index.min.js";
    script.onload = async () => {
      try {
        const sdk = (window as any).miniapp.sdk;
        setStatus("Connecting to Farcaster...");
        
        // SDK-কে জানিয়ে দিন অ্যাপ লোড হয়েছে
        await sdk.actions.ready();
        
        const user = await sdk.user.getUser();
        if (user && user.fid) {
          setStatus(`Welcome @${user.username || "user"}! Redirecting...`);
          window.location.replace("https://xtaskai.com/base-mini-app/dashboard.php");
        } else {
          setStatus("Please open this app inside Farcaster.");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error: Could not initialize. Please ensure you're in Farcaster app.");
      }
    };
    script.onerror = () => setStatus("Error: Failed to load SDK.");
    document.head.appendChild(script);
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