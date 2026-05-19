import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-black  w-3xs h-12 text-white rounded-full px-4 text-base text-background flex justify-center items-center",
        secondary:
          "bg-blackTransparent  w-3xs h-12 text-black rounded-full px-4 text-base ",
        ghost: "hover:underline underline-offset-[80%]",
        icon: "rounded-full border-1 border-black h-10 w-10 shadow-md shadow-primary/20 hover:scale-105 transition-transform"
      },
    },

  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
