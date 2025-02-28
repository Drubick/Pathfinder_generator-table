import { useState } from 'react';

export default function Forms({ label, type, name, placeholder, options, handleCheckboxChange, handleRadioChange }) {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const onCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        handleCheckboxChange(event);
    };

    const onRadioChange = (event) => {
        setSelectedOption(event.target.value);
        handleRadioChange(event);
    };

    return (
        <div>
            <label htmlFor={name} className="text-primary-light pl-1 dark:text-primary-dark">{label}</label>
            <br />
            {(() => {
                if (type === 'select') {
                    return (
                        <select
                            className="w-50 focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                            name={name}
                            id={name}
                        >
                            {options.map((option, index) => (
                                <option className="bg-pre-primary-light dark:bg-pre-primary-dark text-left" key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                } else if (type === 'checkbox') {
                    return (
                        <div className="flex place-items-center">
                            <label htmlFor={name} className="ml-1 text-primary-light dark:text-primary-dark mr-3">{label} </label>
                            <input
                                className="focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                                type="checkbox"
                                name={name}
                                id={name}
                                checked={isChecked}
                                onChange={onCheckboxChange}
                            />
                        </div>
                    );
                } else if (type === 'radio') {
                    return (
                        <div className="flex place-items-center">
                            {options.map((option, index) => (
                                <label key={index} className="ml-1 text-primary-light dark:text-primary-dark mr-3">
                                    <input
                                        className="focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                                        type="radio"
                                        name={name}
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={onRadioChange}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    );
                } else {
                    return (
                        <input
                            className="[&::-webkit-inner-spin-button]:appearance-none w-50 focus:outline-none focus:shadow-outline border rounded leading-tight px-3 py-1 text-primary-light dark:text-primary-dark "
                            type={type}
                            name={name}
                            id={name}
                            placeholder={placeholder}
                        />
                    );
                }
            })()}
            <br />
        </div>
    );
}