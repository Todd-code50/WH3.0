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

  return (
    <html lang="en">
      <body className={`${oswald.variable} antialiased`}>
        {!isConfigurator && <Navbar />}
        <main>{children}</main>
        {!isConfigurator && <Footer />}
      </body>
    </html>
  );
}
