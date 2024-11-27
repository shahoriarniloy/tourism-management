"use client";

import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "./metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/services/AuthProvider";



export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='light'>
      <body
        
      >
        <AuthProvider>
        <Navbar/>

<div 
className="min-h-[calc(100vh-273px)]"
>
{children}
</div>
<Footer/>
        </AuthProvider>
      
      </body>
    </html>
  );
}
