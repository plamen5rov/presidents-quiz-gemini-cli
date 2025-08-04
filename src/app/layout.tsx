import type { Metadata } from "next";
import { Lora, Pirata_One, Orbitron } from "next/font/google";
import "./globals.css";

const lora = Lora({ 
  subsets: ["latin"],
  variable: '--font-lora',
});

const pirata = Pirata_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pirata',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: "U.S. Presidents Quiz",
  description: "A quiz game to test your knowledge of U.S. Presidents.",
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="4a407f6f-1710-4d11-b488-74288e53fc4e"></script>
    </head>
      <body className={`${lora.variable} ${pirata.variable} ${orbitron.variable} font-sans`}>{children}</body>
    </html>
  );
}