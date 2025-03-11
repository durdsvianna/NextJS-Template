import { Metadata } from 'next'
import CreateTask from '@/app/content/functionalities/Tasks/CreateTask'

export const metadata: Metadata = {
  title: 'Create Task - AIDev',
}

export default function CreateTaskPage() {
  return <CreateTask />
} 