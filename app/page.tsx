"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@farcaster/mini-app-sdk@latest/dist/index.min.js";
    script.onload = async () => {
      try {
        const sdk = new (window as any).MiniAppSDK();
        await sdk.ready();
        const user = sdk.user;

        if (user && user.fid) {
          setStatus(`Welcome @${user.username || "farcaster user"}! Redirecting...`);
          window.location.href = "https://xtaskai.com/base-mini-app/dashboard.php";
        } else {
          setStatus("Please open this app inside Farcaster.");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error: Could not load Farcaster SDK.");
      }
    };
    script.onerror = () => setStatus("Error: Could not load SDK script.");
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