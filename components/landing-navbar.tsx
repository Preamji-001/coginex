"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between z-[100]">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/icon.png.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          CogniNex
        </h1>
      </Link>
      <div className="flex items-center gap-x-2 z-[1000]">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="rounded-full cursor-pointer">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}