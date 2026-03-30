"use client";

import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isConfigurator = pathname?.startsWith("/configure");
  const isAdmin = pathname?.startsWith("/admin");
  const hideChrome = isConfigurator || isAdmin;

  return (
    <html lang="en">
      <body className={`${oswald.variable} antialiased`}>
        {!hideChrome && <Navbar />}
        <main>{children}</main>
        {!hideChrome && <Footer />}
      </body>
    </html>
  );
}
