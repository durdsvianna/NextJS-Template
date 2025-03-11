import { Metadata } from 'next'
import UserProfile from '@/app/content/functionalities/Users/UserProfile'

export const metadata: Metadata = {
  title: 'User Profile - AIDev',
}

export default function ProfilePage() {
  return <UserProfile />
}