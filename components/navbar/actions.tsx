import { Button } from "@/components/ui/button"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { DashboardIcon } from "@/public/icons/dashboard-icon" 
import Link from "next/link"


export const Actions = async () => {

  const user = await currentUser()
  // console.log(user);

  return(
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm">
            Login
          </Button>
        </SignInButton>
      )}

      { user && (
        <div className="flex items-center gap-x-4">
          <Button 
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary gap-x-2"
            asChild
          >
            {/* link to creator dashboard page */}
            <Link href={`/u/${user.username}`}>
              <DashboardIcon/>

              <span className="hidden lg:block">
                Dashboard
              </span>
            </Link>
          </Button>

          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      )}
    </div>
  )
}