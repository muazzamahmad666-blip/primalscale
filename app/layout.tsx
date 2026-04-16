import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Prime Scale | AI Automation & Web Development",
  description:
    "We design AI systems and high-converting websites. Specialized in Retell AI, web development, and LLM workflows.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          defer
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-purple-500/30 selection:text-white relative bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
