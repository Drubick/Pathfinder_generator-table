import React from 'react';

export default function Forms({ label, type, name, placeholder, options }) {
    return (
        <div>
            <label htmlFor={name} className="text-primary-light pl-1 dark:text-primary-dark">{label}</label>
            <br />
            {type === 'select' ? (
                <select
                    className="w-35 focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                    name={name}
                    id={name}
                    
                >
                    {options.map((option, index) => (
                        <option className="bg-pre-primary-light dark:bg-pre-primary-dark text-left" key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    className="[&::-webkit-inner-spin-button]:appearance-none w-35 focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                />
            )}
            <br />
        </div>
    );
}