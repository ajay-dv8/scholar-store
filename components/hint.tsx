import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  label: string;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right"; 
  align?: "start" | "center" | "end";
}

export const Hint = ({
  children,
  label,
  asChild,
  side, 
  align,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>

        <TooltipContent 
          side={side}
          align={align}
          className="text-black bg-white"
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}