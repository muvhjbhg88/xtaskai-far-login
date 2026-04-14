"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("Verifying identity...");

  useEffect(() => {
    async function init() {
      try {
        const { sdk } = await import("@farcaster/frame-sdk");
        await sdk.actions.ready();
        const context = await sdk.context;

        if (context?.user?.fid) {
          setMsg("Welcome! Redirecting to dashboard...");
          setTimeout(() => {
            window.location.replace(
              `https://xtaskai.com/base-mini-app/dashboard.php?fid=${context.user.fid}&username=${encodeURIComponent(context.user.username ?? "")}`
            );
          }, 2000);
        } else {
          setMsg("Please open inside Farcaster.");
        }
      } catch (e) {
        setMsg("Error: Could not load SDK.");
      }
    }
    init();
  }, []);

  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      height: "100vh", background: "#0a0a0a", color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>XtaskAI.far</h1>
        <p>{msg}</p>
      </div>
    </div>
  );
}
