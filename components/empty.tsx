import Image from "next/image"

interface emptyInterface {
  desc: string
}

const Empty = (props: emptyInterface) => (
  <div className="flex flex-col justify-center items-center">
    <div className="md:h-64 md:w-64 h-32 w-32 mt-3 relative">
      <Image src="/empty.png" alt="empty" fill />
    </div>
    <div className="text-muted-foreground text-sm">
      {props.desc}
    </div>
  </div>
)

export default Empty