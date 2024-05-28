import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import '../globals.css'
import { GoogleTagManager } from '@next/third-parties/google';
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: "SPORTON | Connect with Athletes, Clubs, and Scouts - Start Networking Today!",
    template: "%s - SPORTON ",
  },
  keywords: [
    'SPORTON',
    'Connect with Athletes',
    'Clubs',
    'Scouts',
    'Networking',
    'Talent Showcase',
    'Achievements',
    'Recognition',
    'Sports Platform',
    'Sports Networking',
    'Athlete Connections',
    'Sports Clubs',
    'Athletic Talent',
    'Talent Networking',
    'Sports Recognition',
    'Athlete Networking'
],
  description: 'SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.',
  openGraph: {
    type: 'website',
    url: 'https://www.sporton.website/',
    title: 'SPORTON',
    description: 'SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.',
    images: [
      {
        url: 'https://www.sporton.website/logo.png',
        alt: 'SPORTON LOGO',
      },
    ],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en"  >
      <body className={inter.className}>
      <main className=' flex flex-row w-full '>
        <section className="main-container p-0" >
        <div className=" w-full ">
        {children}
        </div>
        </section>
      </main>
      <GoogleTagManager gtmId="GTM-WB4S5V8V" />
        </body>
    </html>
   </ClerkProvider>
  )
}
