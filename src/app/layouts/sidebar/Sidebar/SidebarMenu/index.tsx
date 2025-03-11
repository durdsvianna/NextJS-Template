'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSidebar } from '@/app/contexts/SidebarContext'
import { usePathname } from 'next/navigation'
import { 
  LuLayoutDashboard, 
  LuUsers, 
  LuClipboardList, 
  LuSettings, 
  LuChevronDown
} from 'react-icons/lu'
import { HiHome } from 'react-icons/hi'

// Define prop types
interface MenuItemProps {
  href: string
  icon: React.ReactNode
  title: string
  active?: boolean
  onClick?: () => void
}

// Define MenuItem as a function component
function MenuItem({ href, icon, title, active, onClick }: MenuItemProps) {
  return (
    <Link 
      href={href} 
      className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
        active 
          ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400'
      }`}
      onClick={onClick}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      <span className="flex-1">{title}</span>
    </Link>
  )
}

// Define SubMenuItem prop types
interface SubMenuItemProps extends MenuItemProps {
  children?: React.ReactNode
}

// Define SubMenuItem as a function component
function SubMenuItem({ href, icon, title, active, children }: SubMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleSubmenu = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <div className="mb-1">
      <button
        type="button"
        className={`group flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium ${
          active 
            ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400'
        }`}
        onClick={toggleSubmenu}
      >
        <div className="flex items-center">
          <span className="mr-3 h-5 w-5">{icon}</span>
          <span>{title}</span>
        </div>
        <LuChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="mt-1 space-y-1 pl-9">
          {children}
        </div>
      )}
    </div>
  )
}

// Main SidebarMenu component
function SidebarMenu() {
  const { closeSidebar } = useSidebar()
  const pathname = usePathname()
  
  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar()
    }
  }
  
  return (
    <div className="py-4">
      <div className="px-4 pb-2 pt-0">
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Dashboard</h3>
      </div>
      
      <nav className="mt-2 space-y-1 px-2">
        <MenuItem
          href="/sidelayout/dashboard"
          icon={<LuLayoutDashboard />}
          title="Overview"
          active={pathname === '/sidelayout/dashboard'}
          onClick={handleItemClick}
        />
        
        <MenuItem
          href="/sidelayout/home"
          icon={<HiHome />}
          title="Home"
          active={pathname === '/sidelayout/home'}
          onClick={handleItemClick}
        />
        
        <SubMenuItem
          href="#"
          icon={<LuUsers />}
          title="User Management"
          active={pathname.includes('/sidelayout/admin') || pathname.includes('/sidelayout/users')}
        >
          <Link
            href="/sidelayout/users/list"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === '/sidelayout/users/list'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
            onClick={handleItemClick}
          >
            User List
          </Link>
          <Link
            href="/sidelayout/admin/profile"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === '/sidelayout/admin/profile'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
            onClick={handleItemClick}
          >
            User Profile
          </Link>
        </SubMenuItem>
        
        <SubMenuItem
          href="#"
          icon={<LuClipboardList />}
          title="Task Management"
          active={pathname.includes('/sidelayout/tasks')}
        >
          <Link
            href="/sidelayout/tasks"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === '/sidelayout/tasks'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
            onClick={handleItemClick}
          >
            All Tasks
          </Link>
          <Link
            href="/sidelayout/tasks/create"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === '/sidelayout/tasks/create'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
            onClick={handleItemClick}
          >
            Create Task
          </Link>
        </SubMenuItem>
      </nav>
      
      <div className="mt-8 px-4 pb-2 pt-0">
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Settings</h3>
      </div>
      
      <nav className="mt-2 space-y-1 px-2">
        <MenuItem
          href="/sidelayout/settings"
          icon={<LuSettings />}
          title="General Settings"
          active={pathname === '/sidelayout/settings'}
          onClick={handleItemClick}
        />
      </nav>
    </div>
  )
}

export default SidebarMenu 