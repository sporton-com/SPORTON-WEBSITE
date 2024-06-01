import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: "SPORTON | Auth - Login and Sign-up for Sports Enthusiasts ",
    template: "%s - SPORTON ",
  },
  keywords:[
    "SPORTON", "Auth", "Login"," Sign-up"," Sports Enthusiasts"," Talent Showcase", "Sports Clubs"," Sports Networking", "Athlete Recognition"
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
    <html lang="en" >
      <body className={inter.className +''} >
        <div className=" min-h-screen flex w-full items-center justify-center" style={{background:'url(/assets/bg.jpg) fixed'}}>
        {children}
        </div>
      {/* <GoogleTagManager gtmId="GTM-WB4S5V8V" /> */}
        </body>
    </html>
      </ClerkProvider>
  )
}
