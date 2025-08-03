import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({ subsets: ["latin"] });

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
      <body className={lora.className}>{children}</body>
    </html>
  );
}
