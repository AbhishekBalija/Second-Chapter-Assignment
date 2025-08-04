import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-8 px-3 text-xs'
        case 'md':
          return 'h-10 px-4 text-sm'
        case 'lg':
          return 'h-12 px-6 text-base'
        default:
          return 'h-10 px-4 text-sm'
      }
    }

    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'btn-primary'
        case 'secondary':
          return 'btn-secondary'
        case 'outline':
          return 'btn-outline'
        default:
          return 'btn-primary'
      }
    }

    return (
      <button
        className={cn(
          'btn',
          getVariantClasses(),
          getSizeClasses(),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button 