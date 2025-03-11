'use client'

import { useSidebar } from '@/app/contexts/SidebarContext'
import { LuMenu } from 'react-icons/lu'

export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex w-full items-center px-4">
        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <LuMenu className="h-6 w-6" />
        </button>
        
        <div className="ml-4 flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Task Manager</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Add user menu, notifications, etc. here */}
          </div>
        </div>
      </div>
    </header>
  )
} 