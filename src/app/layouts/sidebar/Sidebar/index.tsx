'use client'

import { useSidebar } from '@/app/contexts/SidebarContext'
import SidebarMenu from './SidebarMenu'
import Link from 'next/link'
import { LuX } from 'react-icons/lu'

export default function Sidebar() {
  const { sidebarToggle, closeSidebar } = useSidebar()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-20 hidden h-full w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white pt-16 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 lg:flex">
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu />
          </div>
          
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <Link
              href="https://aidev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              AIDev
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarToggle && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden" onClick={closeSidebar} />
      )}
      
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white pt-16 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 lg:hidden ${
          sidebarToggle ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute right-3 top-3">
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            onClick={closeSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <LuX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu />
          </div>
          
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <Link
              href="https://aidev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              AIDev
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
} 