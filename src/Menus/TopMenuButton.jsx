import { useState } from 'react';

const navItems = [
    {
        title: "Random Generators", options: ["Encounter Generator asdasdyagfsudgauysdfausydfaiusydtfas", "Map Generator"], colapsed: true, 
    },
    {
        title: "Builders", options: ["Encounter Builders", "Map Builder"], colapsed: true
    },
    {
        title: "AI Assistance", options: ["General chatbot", "Combat generator"], colapsed: true
    }
];

export default function TopMenuButton() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="flex space-x-2">
            {navItems.map((item, index) => {
                let buttonClasses = "py-1 px-2 font-semibold text-center align-middle transition-all duration-300 " +
                    "ease-in-out border-2 border-solid rounded cursor-pointer select-none hover:text-black " +
                    "dark:hover:text-white hover:border-accent-light dark:hover:border-accent-dark shadow-2xl text-xs";

                if (activeIndex === index) {
                    buttonClasses += " bg-accent-light dark:bg-accent-dark dark:text-white border-accent-light dark:border-accent-dark";
                }

                return (
                    <button 
                        key={index}
                        onClick={() => handleClick(index)}
                        className={buttonClasses}
                    >
                        {item.title}
                    </button>
                );
            })}
        </div>
    );
}