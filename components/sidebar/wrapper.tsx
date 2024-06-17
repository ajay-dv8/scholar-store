"use client";

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"; 

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {

  const { collapsed } = useSidebar((state) => state);

  return (
    <aside className={cn(
      "w-[4.375rem] lg:w-60 fixed left-0 flex flex-col h-full bg-background border-r z-50 transition-all duration-600",
      collapsed && "lg:w-[4.375rem] transition-all duration-600"
    )}>
      {children}
    </aside>
  )
}