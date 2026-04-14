import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XtaskAI.far",
  description: "Complete social tasks and earn rewards on XtaskAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}