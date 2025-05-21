import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "white" | "black";
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant, ...props }, ref) => {
    let variantClasses = "";
    if (variant === "white") {
      variantClasses = cn(
        "bg-white text-black border border-black",
        "hover:bg-black hover:text-white hover:border-white",
        "active:bg-neutral-200"
      );
    } else if (variant === "black") {
      variantClasses = cn(
        "bg-black text-white",
        "hover:bg-white hover:text-black hover:border-black",
        "active:bg-neutral-900"
      );
    } else {
      variantClasses = cn(
        "bg-none border border-white/10 text-white",
        "hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]",
        "active:scale-[0.98]"
      );
    }
    return (
      <button
        className={cn(
          "relative group px-8 py-4 rounded-full transition-all duration-300 text-lg font-medium",
          variantClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton }; 