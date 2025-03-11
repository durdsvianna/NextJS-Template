import { Metadata } from 'next'
import TaskDetail from '@/app/content/functionalities/Tasks/TaskDetail'

export const metadata: Metadata = {
  title: 'Edit Task - AIDev',
}

interface EditTaskProps {
  params: {
    id: string
  }
}

export default function EditTaskPage({ params }: EditTaskProps) {
  return <TaskDetail taskId={params.id} mode="edit" />
} 