'use client'

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaDiscord, FaTwitch, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between pb-8">
        <div className="mb-6 md:mb-0">
          <div className="relative w-24 h-20">
            {/* AI Logo for footer */}
            <div className="absolute w-16 h-16 bg-blue-600 rounded-lg top-0 left-4"></div>
            
            {/* Robot elements */}
            <div className="absolute w-3 h-5 bg-purple-600 top-[-3px] left-8"></div>
            <div className="absolute w-3 h-5 bg-purple-600 top-[-3px] left-13"></div>
            
            {/* AI Eyes */}
            <div className="absolute w-3 h-3 bg-white rounded-full top-4 left-9"></div>
            <div className="absolute w-3 h-3 bg-white rounded-full top-4 left-15"></div>
            
            {/* Code elements */}
            <div className="absolute w-12 h-4 bg-green-600 top-11 left-6 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AIDEV</span>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-0">
          <ul className="space-y-2 text-center md:text-left">
            <li>
              <a href="/sobre-nos" className="hover:text-blue-600 transition-colors">
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="/comunidade" className="hover:text-blue-600 transition-colors">
                Comunidade
              </a>
            </li>
            <li>
              <a href="/postagens" className="hover:text-blue-600 transition-colors">
                Postagens
              </a>
            </li>
            <li>
              <a href="/perguntas-frequentes" className="hover:text-blue-600 transition-colors">
                Perguntas Frequentes
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Junte-se a nós</h3>
          <div className="flex items-center justify-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-600 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-blue-600 transition-colors">
              <FaGithub size={24} />
            </a>
            <a href="#" aria-label="Discord" className="hover:text-blue-600 transition-colors">
              <FaDiscord size={24} />
            </a>
            <a href="#" aria-label="Twitch" className="hover:text-blue-600 transition-colors">
              <FaTwitch size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-blue-600 transition-colors">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center border-t pt-4">
        <p>&copy; {new Date().getFullYear()} AIDev - AI Development Platform</p>
      </div>
    </footer>
  )
}
