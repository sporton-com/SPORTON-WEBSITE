import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import React from "react";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfintyProvider from "@/components/providers/InfintyProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Head from "next/head";
// export const metadata: Metadata = {
//   title: {
//     default:
//       "SPORTON | Home - Player Posts, Achievements, and Contact Players ",
//     template: "%s - SPORTON ",
//   },
//   keywords: [
//     "SPORTON",
//     "Home",
//     "Player Posts",
//     "Achievements",
//     "Contact Players",
//     "Showcase Talent",
//     "Connect with Clubs",
//     "Gain Recognition",
//     "Sports Platform",
//   ],
//   description:
//     "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
//   openGraph: {
//     type: "website",
//     url: "https://www.sporton.website/",
//     title: "SPORTON",
//     description:
//       "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
//     images: [
//       {
//         url: "https://www.sporton.website/logo.png",
//         alt: "SPORTON LOGO",
//       },
//     ],
//   },
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider >
      <InfintyProvider>
        <ReduxProvider>
          <html lang="en">
          <Head>
        {/* Title and Meta Description */}
        <title>SPORTON - منصة رياضية للرياضيين والأندية في مصر</title>
        <meta name="description" content="انضم إلى SPORTON، مجتمع رياضي مميز في مصر يربط بين الرياضيين، الوكلاء، والأندية. اعرض موهبتك واحصل على التقدير." />
        <meta name="keywords" content="SPORTON, رياضة, منصة رياضية, لاعبين, وكلاء رياضيين, أندية رياضية, مصر, مجتمع رياضي" />
        
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sporton.website/" />
        <meta property="og:title" content="SPORTON - منصة رياضية للرياضيين والأندية في مصر" />
        <meta property="og:description" content="انضم إلى SPORTON، مجتمع رياضي يربط بين الرياضيين، الوكلاء، والأندية في مصر. اعرض موهبتك واحصل على التقدير." />
        <meta property="og:image" content="https://www.sporton.website/logo.png" />
        <meta property="og:image:alt" content="شعار SPORTON" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SPORTON - منصة رياضية في مصر" />
        <meta name="twitter:description" content="منصة للرياضيين المصريين للوصول إلى وكلاء الأندية والمؤسسات." />
        <meta name="twitter:image" content="https://www.sporton.website/logo.png" />

        {/* Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://www.sporton.website/",
              "logo": "https://www.sporton.website/logo.png",
              "name": "SPORTON",
              "description": "منصة رياضية تربط بين الرياضيين، والوكلاء، والأندية في مصر.",
              "sameAs": [
                "https://www.facebook.com/sporton",
                "https://twitter.com/sporton"
              ]
            }
          `}
        </script>
      </Head>
            <body>
              <div className=" w-full">
                {children}
                <ToastContainer />
              </div>
              <Analytics />
            </body>
          </html>
        </ReduxProvider>
      </InfintyProvider>
    </ClerkProvider>
  );
}
