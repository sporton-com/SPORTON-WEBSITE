import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import '../globals.css'
import Topbar from '@/components/shared/Topbar';
import BottomSidebar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import { GoogleTagManager } from '@next/third-parties/google';
// import { ThemeProvider } from '@/components/providers/theme-provider';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "SPORTON | Home - Player Posts, Achievements, and Contact Players ",
    template: "%s - SPORTON ",
  },
  keywords:[

      "SPORTON",
      "Home",
      "Player Posts",
      "Achievements",
      "Contact Players",

      "Showcase Talent",
      "Connect with Clubs",
      "Gain Recognition",
      "Sports Platform",
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

      
      <Topbar/>
      <main className=' flex flex-row w-full'>

        <LeftSidebar/>
        <section className="main-container">
        <div className=" w-full max-w-4xl">
        {children}
        </div>
        </section>
        {/* @ts-ignore */}
        <RightSidebar/>
      </main>
      <BottomSidebar/>
      <GoogleTagManager gtmId="GTM-WB4S5V8V" />
        </body>
    </html>

          
   </ClerkProvider>
  )
}
