"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"; 

// The container component separates the nav and sidebar from te main section of the page  
// its like a wrapper for the pages content 

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {

  const matches = useMediaQuery("(max-width: 1024px)"); 
  const {
    collapsed,
    onCollapse,
    onExpand,
  } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand])

  return(
    <div className={cn(
      "flex-1",
      collapsed ? "ml-[4.375rem]" : "ml-[4.375rem] lg:ml-60 transition-all duration-500"
      )}>
      {children}
    </div>
  )
}