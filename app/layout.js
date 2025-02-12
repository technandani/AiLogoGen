import { PT_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";

import "./globals.css";

const nunito = PT_Sans({
  subsets: ["latin"],
  weight:["400", "700"]
});

export const metadata = {
  title: "AI Logo Generator | Instantly Create Professional Logos",
  description: "Generate stunning, high-quality logos effortlessly with AI. Perfect for businesses, startups, apps, and websites. No design skills required!",
  keywords: "AI Logo Generator, free logo generator, business logo, professional logo design, logo creator, branding, startup logo",
  author: "YourBrandName",
  openGraph: {
    title: "AI Logo Generator | Instantly Create Professional Logos",
    description: "Create unique, AI-powered logos for your business, startup, or website in seconds.",
    url: "https://gene-logo.vercel.app",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dpmengi5q/image/upload/v1739322203/logo1_gdugsw.png",
        width: 1200,
        height: 630,
        alt: "AI-generated logo examples",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@genelogo",
    title: "AI Logo Generator | Instantly Create Professional Logos",
    description: "Design high-quality logos effortlessly with AI for businesses, startups, and websites.",
    image: "https://res.cloudinary.com/dpmengi5q/image/upload/v1739322203/logo1_gdugsw.png",
  },
};



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <div className="h-screen w-screen overflow-x-hidden">
            {/* <Header /> */}
            <div>
              <Provider>
              {children}
              </Provider>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
