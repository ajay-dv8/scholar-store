import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getSelfByUsername } from "@/services/auth-service";
import { redirect } from "next/navigation";


interface CreatorLayoutProps {
  children: React.ReactNode;
  params :{ username: string }
}

const CreatorLayout = async ({
  params,
  children,
} :CreatorLayoutProps) => {

  // get the username of the current user
  // "when user clicks on dashboard"   
  const self = await getSelfByUsername(params.username);

  // if the user is not logged in or doesn't exist or is unauthorized redirect to home page
  // this is to make only the authorized users (account owner) access the dashboard  
  if (!self) {
    redirect ("/");
  }

  return (
    <>
      <Navbar/>
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container> 
          { children }
        </Container>
      </div>
    </>
  )
}

export default CreatorLayout