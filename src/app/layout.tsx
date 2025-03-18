"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page";
import UserProfile from "./profile/[id]/page";
import { remult } from "remult";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    remult.apiClient.url = "/api";
  }, []);

  return (
    <html lang="en">
      <body className={`${geistMono} ${geistSans}`}>
        <Router>
          <div suppressHydrationWarning>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<UserProfile />} />
            </Routes>
          </div>
          {/* {children} */}
        </Router>
      </body>
    </html>
  );
}
