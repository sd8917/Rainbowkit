const Mint = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative inline-block text-left">
        <button id="dropdownButton" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Select Language
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.5l3.71-4.27a.75.75 0 011.08 1.04l-4.25 4.88a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <div id="dropdownMenu" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">English</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">हिन्दी</a>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Mint;