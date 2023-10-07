import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react"
import { Montserrat } from "next/font/google"
import Link from "next/link"

const font = Montserrat({ weight: "500", subsets: [] })

const cards = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    label: "Image Generator",
    icon: Image,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10"
  },
  {
    label: "Video Generator",
    icon: Video,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    label: "Music",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
]

const DashBoardPage = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className={cn("w-full text-center", font.className)}>
        <h1 className="text-2xl md:text-4xl">Welcome to, <span className="text-orange-600">CogniNex</span></h1>
        <p className="mt-2 text-gray-500">Your AI platform for everything!</p>
      </div>
      <div className="mt-5 h-full md:w-1/2 w-3/4 flex-col items-center">
        {cards.map((card) => (
          <Link href={card.href} key={card.label}>
            <Card className={cn("p-4 mt-3 flex items-center hover:shadow transition-all justify-between", card.bgColor)}>
              <div className="flex">
                <card.icon className={card.color} />
                <div className="ml-5">{card.label}</div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashBoardPage