import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - AIDev',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-4xl font-bold">Welcome to AIDev</h1>
      <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
        Your platform for AI development, learning, and collaboration
      </p>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Modern Stack</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Built with Next.js, Tailwind CSS, and cutting-edge AI technologies
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">AI Ready</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Develop, train, and deploy AI models with our collaborative platform
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Responsive Design</h2>
          <p className="text-gray-600 dark:text-gray-400">
            A beautiful, responsive interface that works on any device
          </p>
        </div>
      </div>
    </div>
  )
} 