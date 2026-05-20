import type { Metadata } from "next";
import { JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
import "@/styles/cyber.css";

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  title: "Sarhisob",
  description: "JavaScript o‘rganish platformasi — kiber-terminal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${shareTech.variable} ${jetbrains.variable}`}>
      <body className="cb-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
