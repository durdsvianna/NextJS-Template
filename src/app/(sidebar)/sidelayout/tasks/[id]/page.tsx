import { Metadata } from 'next'
import TaskDetail from '@/app/content/functionalities/Tasks/TaskDetail'

export const metadata: Metadata = {
  title: 'Task Details - AIDev',
}

interface TaskDetailsProps {
  params: {
    id: string
  }
}

export default function TaskDetailsPage({ params }: TaskDetailsProps) {
  return <TaskDetail taskId={params.id} mode="view" />
}