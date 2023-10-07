import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"

interface HeadingProps {
  header: string;
  desc: string;
  icon: any;
  iconColor: string;
  bgColor: string;
}

const font = Montserrat({ weight: "500", subsets: [] })

const Header = (props: HeadingProps) => {
  return (
    <div className={cn("flex text-2xl md:text-3xl items-center rounded-sm font-bold", font.className)}>
      <props.icon className={cn("p-1 w-8 h-8 rounded-sm", props.iconColor, props.bgColor)}></props.icon>
      <div className="flex flex-col items-center">
        <h1 className="ml-2">{props.header}</h1>
        <p className="text-gray-500 text-sm">{props.desc}</p>
      </div>
    </div >
  )
}

export default Header