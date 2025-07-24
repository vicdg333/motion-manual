import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 font-sans w-full",
  {
    variants: {
      variant: {
        default: "border border-black bg-white text-black hover:bg-transparent hover:text-black hover:border-black disabled:border-gray-200 disabled:text-gray-400",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-200 bg-white text-black hover:bg-transparent hover:text-black hover:border-black disabled:border-gray-200 disabled:text-gray-400",
        secondary: "bg-gray-100 text-black hover:bg-transparent hover:text-black hover:border-black",
        ghost: "hover:bg-gray-100 text-black",
        link: "text-black underline-offset-4 hover:underline",
        pill: "bg-gray-100 text-black rounded-full border border-gray-200 hover:bg-transparent hover:text-black hover:border-black",
        selected: "bg-black text-white rounded-full border border-black",
        card: "bg-white border border-gray-200 hover:border-black text-left justify-start p-6 h-auto",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-12 w-12 w-auto p-0",
        pill: "h-12 px-4 rounded-full",
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
    // Remove w-full for icon buttons
    const computedClass = size === 'icon' ? cn(buttonVariants({ variant, size, className }), 'w-auto') : buttonVariants({ variant, size, className })
    return (
      <Comp
        className={computedClass}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
