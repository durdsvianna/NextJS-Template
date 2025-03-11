'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'
import { toast } from 'sonner'
import { ITask } from '@/models/Task'

const ListTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [tagFilter, setTagFilter] = useState<string>('All')
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      fetchTasks()
    }
  }, [statusFilter, isClient])
  
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      
      const data = await response.json()
      setTasks(data)
      
      const allTags = data.reduce((tags: string[], task: ITask) => {
        if (task.tags && Array.isArray(task.tags)) {
          return [...tags, ...task.tags]
        }
        return tags
      }, [])
      
      const uniqueTags = Array.from(new Set(allTags)) as string[]
      setAvailableTags(uniqueTags)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Failed to load tasks. Please try again later.')
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch (err) {
      return dateString
    }
  }
  
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    
    const matchesTag = 
      tagFilter === 'All' || 
      (task.tags && task.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase()))
    
    return matchesSearch && matchesStatus && matchesTag
  })

  if (!isClient) {
    return <div className="h-40"></div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Link 
            href="/tasks/create"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Task
          </Link>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="status" className="sr-only">
            Filter by status
          </label>
          <select
            id="status"
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="tag" className="sr-only">
            Filter by tag
          </label>
          <select
            id="tag"
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="All">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Reward
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">{task.title}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {task.description.substring(0, 60)}
                          {task.description.length > 60 ? '...' : ''}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {task.tags && task.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {task.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <FaEthereum className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{task.reward}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span 
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          task.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          task.status === 'Completed' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link 
                          href={`/tasks/${task._id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/tasks/${task._id}/edit`}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>
      )}

      {!loading && !error && filteredTasks.length === 0 && (
        <div className="rounded-lg bg-gray-50 px-6 py-10 text-center dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-900 dark:text-white">No tasks found</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}

export default ListTasks 