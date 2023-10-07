"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MobileNavbar from "./mobilenavbar";
import { usePathname } from "next/navigation";

const font = Montserrat({ weight: "400", subsets: [] })

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: "text-emerald-500",
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    href: '/code',
  }
];

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className={cn("hidden md:fixed md:bg-gray-900 md:h-14 md:top-0 md:w-full md:flex md:items-center md:justify-between md:z-[90]", font.className)}>
        <div className="text-[#E08557] text-bold ml-4 flex h-full items-center cursor-pointer">
          <Image src="/icon.png.png" alt="logo" width="30" height="10"></Image>
          <h1 className="ml-3">CogniNex</h1>
        </div>
        <div className="flex w-96 h-full items-center justify-evenly">
          {routes.map((route) => (
            <Link href={route.href} title={route.label} key={route.label}>
              <div className={cn("p-2 hover:bg-white/10 rounded-lg", route.color,
                pathname === route.href ? "bg-white/10" : "bg-none")}>
                <route.icon />
              </div>
            </Link>
          ))}
        </div>
        <div className="mr-10">
          <Button variant="destructive">
            <SignOutButton />
          </Button>
        </div>
      </div >
    </div>
  )
}

export default Navbar