import SidebarLayout from '@/app/layouts/sidebar'

export default function SidebarRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarLayout>{children}</SidebarLayout>
} 