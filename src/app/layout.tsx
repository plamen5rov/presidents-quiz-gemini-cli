import type { Metadata } from "next";
import { Lora, Pirata_One } from "next/font/google";
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

export const metadata: Metadata = {
  title: "U.S. Presidents Quiz",
  description: "A quiz game to test your knowledge of U.S. Presidents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${pirata.variable} font-sans`}>{children}</body>
    </html>
  );
}
