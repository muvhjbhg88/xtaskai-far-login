"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk@0.0.1/dist/index.min.js";
    script.onload = async () => {
      try {
        const sdk = (window as any).frame.sdk;
        setStatus("Connecting to Farcaster...");
        await sdk.actions.ready();
        
        const user = await sdk.user.getUser();
        if (user?.fid) {
          setStatus(`Welcome @${user.username || "user"}! Redirecting...`);
          window.location.replace("https://xtaskai.com/base-mini-app/dashboard.php");
        } else {
          setStatus("Please open inside Farcaster.");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error initializing. Please reopen in Farcaster.");
      }
    };
    script.onerror = () => setStatus("Error loading SDK.");
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