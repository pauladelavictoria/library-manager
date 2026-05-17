import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-black  w-3xs h-12 text-white rounded-full px-4 text-base text-background",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm",
        // outline:
        //   "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "bg-transparent hover:underline underline-offset-[80%]",
        link: "text-black h-[20px] hover:underline",
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
