import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import '../globals.css'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: "SPORTEN CHAT",
    template: "%s - SPORTEN ",
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
  description: 'SPORTEN provides an opportunity for talented individuals who struggle to get into clubs and show their abilities. Highlight your skills and achievements on SPORTEN and attract everyone\'s attention',
  icons:'/logo5.gif',
  openGraph: {
    type: 'website',
    url: 'https://sporton-brown.vercel.app/',
    title: 'SPORTEN',
    description: 'SPORTEN provides an opportunity for talented individuals who struggle to get into clubs and show their abilities. Highlight your skills and achievements on SPORTEN and attract everyone\'s attention',
    images: [
      {
        url: 'https://sporton-brown.vercel.app/logo.png',
        alt: 'SPORTEN LOGO',
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
        <section className="main-container p-0 bg-[url(/assets/bg.jpg)] bg-cover bg-no-repeat">
        <div className=" w-full ">
        {children}
        </div>
        </section>
      </main>
        </body>
    </html>
   </ClerkProvider>
  )
}
