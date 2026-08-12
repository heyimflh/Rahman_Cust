import * as React from "react";
import { cn } from "@/lib/utils";

interface PartyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "pastel" | "interactive";
}

export const PartyCard = React.forwardRef<HTMLDivElement, PartyCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border-2 overflow-hidden transition-all duration-300",
          {
            "bg-white border-[#F2C9D5] shadow-soft": variant === "default",
            "bg-[#FFE4EC] border-transparent shadow-none": variant === "pastel",
            "bg-white border-[#F2C9D5] shadow-soft hover:shadow-medium hover:-translate-y-1 cursor-pointer": variant === "interactive",
          },
          className
        )}
        {...props}
      />
    );
  }
);

PartyCard.displayName = "PartyCard";
