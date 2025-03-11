'use client'

import { SidebarProvider } from '@/app/contexts/SidebarContext'
import Sidebar from './Sidebar'
import Header from './Header'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Sidebar />
        
        <main className="min-h-screen pt-16 lg:pl-64">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 