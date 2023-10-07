import Navbar from "@/components/navbar"

const DashBoardLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full mt-10 md:mt-20">
      <Navbar />
      {children}
    </div>
  )
}

export default DashBoardLayout