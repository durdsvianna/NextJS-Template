'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

// Import the Task interface from the model instead of redefining it
import { ITask } from '@/models/Task'

interface TaskDetailProps {
  taskId: string
  mode: 'view' | 'edit'
}

const TaskDetail = ({ taskId, mode }: TaskDetailProps) => {
  const router = useRouter()
  const [task, setTask] = useState<ITask | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<ITask>>({})
  // Add this to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // This ensures we only render client-specific content after hydration
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/tasks/${taskId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch task')
        }
        
        const data = await response.json()
        setTask(data)
        setFormData(data)
      } catch (err) {
        setError('Error loading task. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (taskId && isClient) {
      fetchTask()
    }
  }, [taskId, isClient])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value
    const tagsArray = tagString.split(',').map(tag => tag.trim()).filter(Boolean)
    
    setFormData(prev => ({
      ...prev,
      tags: tagsArray
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update task')
      }
      
      // Fetch the updated task
      const updatedTask = await response.json()
      setTask(updatedTask)
      
      // Switch to view mode after successful save
      router.push(`/tasks/${taskId}`)
    } catch (err) {
      setError('Error updating task. Please try again.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  // Return a simple loading state on the server
  if (!isClient) {
    return <div className="h-40"></div>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
        <p>{error}</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-yellow-700">
        <p>Task not found</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch (err) {
      return dateString
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {mode === 'view' ? 'Task Details' : 'Edit Task'}
        </h2>
        <div className="space-x-2">
          {mode === 'view' ? (
            <button
              onClick={() => router.push(`/tasks/${taskId}/edit`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => router.push(`/tasks/${taskId}`)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => router.push('/tasks')}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="p-6">
        {mode === 'view' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line">{task.description}</p>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {task.tags && task.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {(!task.tags || task.tags.length === 0) && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No tags</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h4>
                <p className="mt-1 text-gray-900 dark:text-white">{task.company}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reward</h4>
                <p className="mt-1 text-gray-900 dark:text-white">{task.reward} ETH</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    task.status === 'Completed' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {task.status}
                  </span>
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</h4>
                <p className="mt-1 text-gray-900 dark:text-white">{formatDate(task.dueDate)}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags ? formData.tags.join(', ') : ''}
                    onChange={handleTagChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="reward" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reward (ETH)</label>
                  <input
                    type="number"
                    id="reward"
                    name="reward"
                    step="0.01"
                    value={formData.reward || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push(`/tasks/${taskId}`)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default TaskDetail 