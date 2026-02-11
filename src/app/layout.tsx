import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Strava Dashboard",
  description: "Interaktywny dashboard treningowy — kolarstwo szosowe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <body className={`${inter.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
        {children}
      </body>
    </html>
  );
}
