"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@farcaster/mini-app-sdk@0.1.0/dist/index.min.js";
    script.onload = () => {
      try {
        const sdk = new (window as any).MiniAppSDK();
        sdk.ready().then((context: any) => {
          const user = context.user;
          if (user?.fid) {
            window.location.replace("https://xtaskai.com/base-mini-app/dashboard.php");
          } else {
            document.body.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Please open inside Farcaster.</div>';
          }
        }).catch(() => {
          document.body.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Error: Not in Farcaster.</div>';
        });
      } catch (e) {
        document.body.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">SDK Load Error.</div>';
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: '#0a0a0a', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>XtaskAI.far</h1>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}