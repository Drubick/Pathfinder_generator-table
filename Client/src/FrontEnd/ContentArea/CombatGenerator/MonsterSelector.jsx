import {useState } from "react";
import MonsterStats from "./MonsterStats";
export default function MonsterSelector({ monsters }) {
    const [selectedMonster, setSelectedMonster] = useState(null);

    const handleClick = (monster) => {
        if (selectedMonster && selectedMonster.name === monster.name) {
            setSelectedMonster(null);
        } else {
            setSelectedMonster(monster);
        }
    };
    const removeDuplicates = (monsters) =>{
        const monsterMap= new Map();
        monsters.forEach( monster =>{
            if (monsterMap.has(monster.name)){
                monsterMap.get(monster.name).count +=1;
            }
            else{
                monsterMap.set (monster.name, {...monster, count : 1});
            }
        });
        return Array.from(monsterMap.values());
    };

    const uniqueMonsters = removeDuplicates(monsters)
    const sortedMonsters = uniqueMonsters.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <div >
            <div className="h-80 overflow-auto pb-2">
                {sortedMonsters.map((monster, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(monster)}
                        className={`m-1 w-[40%] hover:cursor-pointer rounded p-1 ${
                            selectedMonster && selectedMonster.name === monster.name ? 'bg-pre-primary-light-100 dark:bg-pre-primary-dark-100' : ''
                        }`}
                    >
                        x{monster.count} {monster.name} 
                    </div>
                ))}
            </div>
            <MonsterStats monster={selectedMonster}/>
        </div>
    );
}