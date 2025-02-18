import { useState } from "react";

export default function MonsterSelector({ monsters }) {
    // Paso 1: Crear un estado para almacenar el índice del div seleccionado
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
        }
    };

    const sortedMonsters = monsters.sort();

    return (
        <div>
            {sortedMonsters.map((monster, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`m-1 w-[40%] hover:cursor-pointer ${
                        selectedIndex === index ? 'bg-pre-primary-light-100' : ''
                    }`}
                >
                    {monster.name}
                </div>
            ))}
        </div>
    );
}