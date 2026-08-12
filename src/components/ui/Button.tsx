import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Minimal variant setup without large cva dependency for size
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-[#FF6688] text-white hover:bg-[#C91F5A] shadow-soft": variant === "primary",
            "bg-[#FFE4EC] text-[#C91F5A] hover:bg-[#F2C9D5]": variant === "secondary",
            "border-2 border-[#F2C9D5] bg-transparent hover:bg-[#FFE4EC] text-[#4A3038]": variant === "outline",
            "hover:bg-[#FFE4EC] text-[#4A3038]": variant === "ghost",
            "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
            "h-12 px-6 py-3 text-base": size === "default", // Minimum 48px target height for mobile
            "h-10 px-4 text-sm": size === "sm",
            "h-14 px-8 text-lg": size === "lg",
            "h-12 w-12": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
