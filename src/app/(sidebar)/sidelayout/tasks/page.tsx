import { Metadata } from 'next'
import ListTasks from '@/app/content/functionalities/Tasks/ListTasks'

export const metadata: Metadata = {
  title: 'Tasks - AIDev',
}

export default function TasksPage() {
  return <ListTasks />
} 