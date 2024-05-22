import React, { useState } from 'react';

const Toggle = () => {
    // Define the state variable and its setter function
    const [isToggled, setIsToggled] = useState(false);

    // Function to handle the toggle
    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                id="theme-toggle"
                type="button"
                onClick={handleToggle}
                className={`inline-flex items-center justify-center p-2 w-32 h-10 text-sm font-medium rounded-lg 
                            ${isToggled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} 
                            hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600`}
            >
                {isToggled ? 'On' : 'Off'}
            </button>
            <p className="mt-2 text-lg">{isToggled ? 'The toggle is ON' : 'The toggle is OFF'}</p>
        </div>
    );
};

export default Toggle;