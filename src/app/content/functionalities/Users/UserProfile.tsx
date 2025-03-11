'use client'

import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

const UserProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 w-full overflow-hidden rounded-t-xl">
          <img 
            src='/static/images/user/profile-cover.png' 
            alt="Profile Cover"
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Profile Avatar */}
        <div className="absolute left-8 -bottom-16">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white dark:border-gray-800">
            <img 
              src='/static/images/avatars/1.jpg' 
              alt="Profile Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column - User Info */}
        <div className="md:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">Web3 Developer</p>
            
            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 dark:text-gray-400">
                <FaLinkedin size={20} />
              </a>
            </div>
            
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Contact Information</h3>
              <p className="mb-1 text-sm">
                <span className="font-medium">Email:</span> john.doe@example.com
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Wallet:</span> 0xA6A8...75fbC
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Location:</span> San Francisco, CA
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  React
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  Solidity
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Web3.js
                </span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Activity & Projects */}
        <div className="md:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-bold">About</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Experienced Web3 developer with a passion for building decentralized applications. 
              Specialized in smart contract development and frontend integration with blockchain technologies.
              Currently working on innovative DeFi solutions and NFT marketplaces.
            </p>
            
            <h3 className="mt-8 text-xl font-bold">Recent Projects</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium">NFT Marketplace</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  A decentralized marketplace for trading digital collectibles with low gas fees.
                </p>
                <div className="mt-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">Ethereum • Solidity • React</span>
                </div>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium">DeFi Lending Protocol</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Peer-to-peer lending platform with automated interest rates based on market demand.
                </p>
                <div className="mt-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">Polygon • Solidity • Next.js</span>
                </div>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium">DAO Governance Tool</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  A tool for creating and managing decentralized autonomous organizations with voting mechanisms.
                </p>
                <div className="mt-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">Arbitrum • Solidity • TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile 