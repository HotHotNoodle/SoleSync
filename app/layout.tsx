import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SoleSync - The AI-Powered Sneaker Ecosystem",
  description: "Manage, authenticate, and trade your sneakers with cutting-edge AI technology. Track wear patterns, predict maintenance needs, and connect with sneakerheads worldwide.",
  keywords: ["sneakers", "AI authentication", "sneaker trading", "wear tracking", "sneaker marketplace"],
  openGraph: {
    title: "SoleSync - The AI-Powered Sneaker Ecosystem",
    description: "Revolutionize your sneaker collection with AI-powered tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

