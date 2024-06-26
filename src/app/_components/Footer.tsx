import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://example.com/" className="hover:underline">RainbowKit™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
