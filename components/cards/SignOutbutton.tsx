'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from "next/image";
import { SignOutButton, SignedIn } from '@clerk/nextjs';
export const SignOutbutton = () => {
    let router = useRouter();
  return (
    <div>
        <SignedIn>
            <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
              <div className="flex gap-4 cursor-pointer">
                <Image src='/assets/logout.svg' alt='logout' width={24} height={24}/>
                <span className=' text-white  max-lg:hidden'>logout</span>
              </div>
            </SignOutButton>
          </SignedIn>
    </div>
  )
}
