import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "bg-white text-bupplo-black hover:bg-gray-200",
        destructive: "bg-bupplo-red text-white hover:bg-red-600 glow-red",
        outline: "border-2 border-white/20 bg-transparent hover:bg-white/10 text-white",
        secondary: "bg-bupplo-card text-white hover:bg-white/10",
        ghost: "hover:bg-white/10 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
        purple: "bg-bupplo-purple text-white hover:bg-purple-600 glow-purple",
        blue: "bg-bupplo-blue text-white hover:bg-blue-600 glow-blue",
        red: "bg-bupplo-red text-white hover:bg-red-600 glow-red",
        green: "bg-bupplo-green text-white hover:bg-emerald-600 glow-green",
        yellow: "bg-bupplo-yellow text-black hover:bg-yellow-500 glow-yellow",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
