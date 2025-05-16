import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative group",
          "px-8 py-4 rounded-full",
          "bg-none",
          "border border-white/10",
          "transition-all duration-300",
          // Text
          "text-white text-lg font-medium",
          // Hover effects
          "hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]",
          // Active effects
          "active:scale-[0.98]",
          // Glass reflection
          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent",
          // Bottom blur
          "after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:rounded-b-full after:bg-gradient-to-t after:from-white/10 after:to-transparent",
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