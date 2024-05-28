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
  keywords:[
    "player CV",
    "sports opportunities",
    "sports clubs",
    "player profiles",
    "showcase achievements",
    "connect with clubs",
    "sports talent",
    "sports recognition",
    "athlete portfolio",
    "sports scouting",
    "sports networking",
    "talent showcase",
    "sports recruitment",
    "athlete profiles",
    "sports career",
    "sports management",
    "talent discovery",
    "sports networking platform",
    "athletic achievements",
    "talent identification",
    "sports resume",
    "athlete connections",
    "sports community",
    "talent promotion",
    "sports talent search",
    "athlete recruitment",
    "sports showcase",
    "talent evaluation",
    "sports talent pool",
    "athlete opportunities",
    "sports networking site"
  ],
  description: 'SPORTON offers a platform for showcasing your talent and achievements, connecting with clubs, and gaining recognition. Join now and stand out in the sports',
  openGraph: {
    type: 'website',
    url: 'https://sporton-brown.vercel.app/',
    title: 'SPORTON',
    description: 'SPORTON offers a platform for showcasing your talent and achievements, connecting with clubs, and gaining recognition. Join now and stand out in the sports',
    images: [
      {
        url: 'https://sporton-brown.vercel.app/logo.png',
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
