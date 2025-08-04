import { NavLink } from 'react-router-dom'
import { Home, FileText, MessageSquare, User } from 'lucide-react'

interface SidebarProps {
  onNavigate?: () => void
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const navItems = [
    { to: '/', label: '홈', icon: Home },
    { to: '/quotations', label: '받은 견적', icon: FileText },
    { to: '/consultations', label: '상담내역', icon: MessageSquare },
    { to: '/profile', label: '마이페이지', icon: User },
  ]

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <aside className="h-full bg-white">
      <nav className="mt-4 lg:mt-8">
        <div className="px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar 