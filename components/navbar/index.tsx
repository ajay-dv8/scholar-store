import { Actions } from "./actions"
import { Logo } from "../logo" 

export const Navbar = () => {
  return(
    <nav className="w-full h-20 z-[49] fixed top-0 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo /> 
      <Actions />
    </nav>
  )
} 