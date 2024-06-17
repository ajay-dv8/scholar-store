"use client";
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import {
  Fullscreen,
  MessageSquare,
  KeyRound,
  Users
} from "lucide-react"
import { NavItem, NavItemSkeleton } from "./nav-tem";

// Navigation component contains a list of navigation routes in the sidebar

export const Navigation = () => {
  const pathname = usePathname();
  // extract user from clerk useUser
  const { user } = useUser();

  const routes = [
    {
      label: "Dashboard",
      href: `/u/${user?.username}`, 
      icon: Fullscreen,
    },
    {
      label: "Projects",
      href: `/u/${user?.username}/keys`, 
      icon: KeyRound,
    },
    {
      label: "Account",
      href: `/u/${user?.username}/chat`, 
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`, 
      icon: Users,
    },
  ];

  if (!user?.username) { 
    return (
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    )
  }




  return(
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </ul>
  )
}