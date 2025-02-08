import { useState } from 'react';
import TopMenuButton from './TopMenuButton';

export default function TopMenu() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <div className="bg-secondary-light dark:bg-secondary-dark h-18">
            <div className="flex items-end h-full w-full px-2 py-1" >
                <TopMenuButton  />
                <button 
                    onClick={toggleDarkMode} 
                    className="bg-tertiary-light dark:bg-tertiary-dark font-bold py-1.5 px-1.5 rounded-full ml-auto hover:cursor-pointer "
                >
                    <div className="relative w-6 h-6 bg-accent-light dark:bg-accent-dark rounded-full">
                    <div className="absolute top-0 left-0 w-4 h-4 bg-tertiary-light dark:bg-tertiary-dark rounded-full"></div>
                        </div>
                </button>
            </div>
        </div>
    );
}