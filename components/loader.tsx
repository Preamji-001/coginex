import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"


const Loader = () => {
  return (
    <Alert className="w-72 bg-orange-500/10 text-center shadow-sm">
      <AlertDescription className="flex items-center justify-evenly text-md">
        <Avatar>
          <AvatarImage src="/icon.png.png" className="w-8 h-8 rounded-full animate-spin"></AvatarImage>
        </Avatar>
        Let me cook up sth
      </AlertDescription>
    </Alert>
  )
}

export default Loader