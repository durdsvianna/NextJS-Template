import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - AIDev',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-6 text-4xl font-bold">Welcome to AIDev</h1>
        <p className="mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          A modern platform for AI development and machine learning with Next.js and Tailwind CSS.
        </p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-semibold">Modern Stack</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built with Next.js 14, Tailwind CSS, and TypeScript for optimal developer experience.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-semibold">AI Ready</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Integrated with popular AI libraries for machine learning models and intelligent features.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-semibold">Responsive Design</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fully responsive layouts with dark mode support for the best user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 