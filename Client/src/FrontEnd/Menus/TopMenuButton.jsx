import { useState, useEffect, useRef } from 'react';

const navItems = [
    {
        title: "Random Generators", options: ["Combat Generator", "Map Generator"], colapsed: true, 
    },
    {
        title: "Builders", options: ["Encounter Builders", "Map Builder"], colapsed: true
    },
    {
        title: "AI Assistance", options: ["AI General chatbot", "AI Combat generator"], colapsed: true
        
    },
    {
        title: "Random Generators", options: ["Combat Generator", "Map Generator"], colapsed: true, 
    }
];

export default function TopMenuButton({setContent}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const buttonRefs = useRef([]);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (buttonRefs.current.every(ref => ref && !ref.contains(event.target))) {
                setActiveIndex(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    
    return (
        <div className="flex space-x-2 overflow-clip">
            {navItems.map((item, index) => {
                let buttonClasses = "py-1 drop-shadow-md px-2 font-semibold text-center align-middle transition-all duration-300 " +
                    "ease-in-out border-2 border-solid rounded cursor-pointer select-none hover:text-black " +
                    "dark:hover:text-white hover:border-accent-light dark:hover:border-accent-dark shadow-2xl text-[15px]";

                if (activeIndex === index) {
                    buttonClasses += " bg-accent-light dark:bg-accent-dark dark:text-white border-accent-light dark:border-accent-dark";
                }

                return (
                    <div key={index} ref={el => buttonRefs.current[index] = el}>
                        <button 
                            onClick={() => handleClick(index)}
                            className={buttonClasses}
                        >
                            {item.title} <span className='ml-2'>{activeIndex === index ? '▲' : '▼'}</span>
                        </button>
                        
                        {activeIndex === index && (
                            <div className="absolute bg-pre-primary-light dark:bg-pre-primary-dark 
                            border-0 border-solid rounded drop-shadow-md hover:cursor-pointer">
                                {item.options.map((option, index) => {
                                    return (
                                        <div key={index} className="px-2 py-1 hover:bg-accent-light-2  dark:hover:bg-accent-dark-2"
                                             onClick={() => {setContent(option)}}>
                                            {option}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}