import { SignIn } from "@clerk/nextjs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPORTEN | Login",
};
export default function Page() {
  return <SignIn />;
}