import { cn } from '../../utils/cn'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error'
  children: React.ReactNode
  className?: string
}

const Badge = ({ variant = 'default', children, className }: BadgeProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-gray-100 text-gray-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        getVariantStyles(),
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge 