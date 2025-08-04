import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import { Menu, X } from 'lucide-react'

const Layout = () => {
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">모두의 권리</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <main className={`p-4 lg:p-6 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
      }`}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 