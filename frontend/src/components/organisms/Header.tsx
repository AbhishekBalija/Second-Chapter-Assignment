import { useAuthStore } from '../../stores/authStore'
import Button from '../atoms/Button'
import { Menu } from 'lucide-react'

interface HeaderProps {
  user: any
  onMenuClick?: () => void
}

const Header = ({ user, onMenuClick }: HeaderProps) => {
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-2"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              모두의 권리
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.name || '사용자'}
              </span>
            </div>
            
            {/* Mobile user info */}
            <div className="sm:hidden">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs lg:text-sm"
            >
              <span className="hidden sm:inline">로그아웃</span>
              <span className="sm:hidden">로그아웃</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 