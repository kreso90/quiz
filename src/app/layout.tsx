import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Loader } from "./components/ui/loader";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Test your knowledge",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Suspense fallback={<Loader />}>
          <div className="pb-8">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
