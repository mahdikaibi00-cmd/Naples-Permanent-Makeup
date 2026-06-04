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
  title: "Skin & Soul Beauty | Advanced Esthetics & Cosmetic Tattooing in Albuquerque",
  description: "Skin and Soul Beauty is an Albuquerque based spa specializing in advanced esthetic treatments and cosmetic tattooing. Experience customized facials, permanent makeup, and luxury skincare designed to make you glow from the inside out.",
  keywords: [
    "Skin & Soul Beauty",
    "Rachael Esthetician",
    "Permanent Makeup Albuquerque", 
    "Cosmetic Tattooing NM", 
    "Advanced Esthetics Albuquerque", 
    "Microblading Albuquerque", 
    "Lip Blush Tattoo",
    "Luxury Spa NM"
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