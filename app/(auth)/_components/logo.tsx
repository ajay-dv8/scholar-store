import { Poppins } from "next/font/google"
import Image from "next/image";
import logo from "@/public/logo.svg"
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets:["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="rounded-full p-10">
        <Image 
          alt=""
          src={logo}
          width={50}
          height={50}
        />
      </div>

      <div className={cn(
        "flex flex-col items-center",
        font.className
        )}>
        <p className="text-xl font-semibold">
          Scholar store
        </p>

        <p className= "text-sm text-muted-foreground">
          Your study vault
        </p>
      </div>
    </div>
  )
};