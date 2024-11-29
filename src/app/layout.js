"use client";

import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "./metadata";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/services/AuthProvider";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/Navbar/DashboardSidebar";
import DashboardNavbar from "@/components/Navbar/DashboardNavbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.includes("dashboard");

  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          {isDashboard ? (
            <div>
               <div className="flex h-screen lg:max-w-[1500px]">
              <DashboardSidebar/>

              <div className="flex-1 flex flex-col">
                <DashboardNavbar/>

                <main className="flex-1  bg-white">
                  {children}
                </main>
              </div>
              
            </div>
            {/* <Footer /> */}

            </div>
           
          ) : (
            <>
              <Navbar />
              <div className="min-h-[calc(100vh-273px)]">{children}</div>
              <Footer />
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
