import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Naples Permanent Makeup | Master-Level Esthetics & Cosmetic Tattooing in Naples, FL",
  description: "Naples Permanent Makeup is a luxury beauty studio in Naples, FL specializing in advanced esthetic treatments, permanent makeup, and lip blush. Wake up every day looking effortlessly glamorous with master artist Laura.",
  keywords: [
    "Naples Permanent Makeup",
    "Laura Permanent Makeup Artist",
    "Permanent Makeup Naples FL", 
    "Cosmetic Tattooing Florida", 
    "Advanced Esthetics Naples", 
    "Microblading Naples", 
    "Lip Blush Tattoo",
    "Luxury Spa Naples FL"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sans.variable} ${serif.variable} font-sans antialiased bg-[#FAFAFA] text-[#2A2A2A]`}
      >
        {children}
      </body>
    </html>
  );
}