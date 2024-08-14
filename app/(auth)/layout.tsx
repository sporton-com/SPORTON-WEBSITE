import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "SPORTON | Auth - Login and Sign-up for Sports Enthusiasts",
    template: "%s - SPORTON",
  },
  keywords: [
    "SPORTON",
    "Auth",
    "Login",
    "Sign-up",
    "Sports Enthusiasts",
    "Talent Showcase",
    "Sports Clubs",
    "Sports Networking",
    "Athlete Recognition",
  ],
  description:
    "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
  openGraph: {
    type: "website",
    url: "https://www.sporton.website/",
    title: "SPORTON",
    description:
      "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
    images: [
      {
        url: "https://www.sporton.website/logo.png",
        alt: "SPORTON LOGO",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen flex w-full items-center justify-center
        bg-cover bg-center bg-no-repeat
        bg-[url('/assets/bg.jpg')]  lg:bg-[size:100%_100%]
         sm:bg-[size:auto]
      "
    >
      {children}
    </div>
  );
}
