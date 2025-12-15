import { useState, useEffect } from "react";
import Button from "../../UI/Button";
import Forms from "../../UI/Forms";
import MonsterStats from "../CombatGenerator/MonsterStats";

export default function AddedMonstersList({ 
    savedMonsters, 
    selectedMonster, 
    onMonsterClick, 
    onRemoveMonster, 
    onClearAll, 
    isMonsterSelected,
    inCanvas = false
}) {
    const [monsterHealth, setMonsterHealth] = useState({});

    useEffect(() => {
        const newHealth = {};
        savedMonsters.forEach((monster, index) => {
            const key = `${index}-${monster.name}`;
            if (!monsterHealth[key]) {
                newHealth[key] = {
                    current: parseInt(monster.hp) || 0,
                    max: parseInt(monster.hp) || 0
                };
            } else {
                newHealth[key] = monsterHealth[key];
            }
        });
        setMonsterHealth(newHealth);
    }, [savedMonsters]);

    const handleHealthChange = (index, monsterName, newHealth) => {
        const key = `${index}-${monsterName}`;
        const maxHP = monsterHealth[key]?.max || parseInt(savedMonsters[index].hp) || 0;
        const validHealth = Math.max(0, Math.min(parseInt(newHealth) || 0, maxHP));
        
        setMonsterHealth(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                current: validHealth
            }
        }));
    };

    return (
        <div className={`flex-1 ${inCanvas ? 'h-full' : 'h-[40vh] sm:h-[50vh] lg:h-[70vh]'} border border-accent-light dark:border-accent-dark p-2 sm:p-4 ${inCanvas ? 'mr-0' : 'mr-0 lg:mr-2'} flex flex-col overflow-hidden`}>
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <h3 className="text-base sm:text-lg font-bold">Added Monsters</h3>
                {savedMonsters.length > 0 && (
                    <Button text="Clear All" action={onClearAll} />
                )}
            </div>
            
            {savedMonsters.length === 0 && (
                <p className="text-gray-500 italic">No monsters added yet</p>
            )}
            
            {savedMonsters.length > 0 && (
                <>
                    <div className={`${inCanvas ? 'flex-1' : 'flex-[0_0_70%]'} overflow-auto pb-2`}>
                        {savedMonsters.map((monster, index) => {
                            const key = `${index}-${monster.name}`;
                            const health = monsterHealth[key] || { current: parseInt(monster.hp) || 0, max: parseInt(monster.hp) || 0 };
                            const healthPercentage = (health.current / health.max) * 100;

                            return (
                                <div key={index} className="flex flex-col border p-1.5 sm:p-2 my-1 w-full">
                                    <div className="flex flex-row justify-between items-center gap-1 sm:gap-2 w-full">
                                        <div 
                                            onClick={() => onMonsterClick(monster)}
                                            className={`flex-1 min-w-0 hover:cursor-pointer rounded p-0.5 sm:p-1 ${isMonsterSelected(monster)}`}
                                        >
                                            <span className="text-xs sm:text-sm truncate block">{monster.name} - Lvl {monster.level}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => onRemoveMonster(monster, index)}
                                            className="px-2 py-1 text-xs sm:text-sm bg-tertiary-light dark:bg-tertiary-dark hover:bg-tertiary-light-2 hover:dark:bg-tertiary-dark-2 border border-tertiary-light-2 dark:border-tertiary-dark-2 rounded flex-shrink-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                                    {/* AC and Health Bar */}
                                    <div className="mt-1.5 sm:mt-2 px-0.5 sm:px-1 flex items-center gap-1.5 sm:gap-2 w-full">
                                        {/* AC Display */}
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-tertiary-light dark:border-tertiary-dark rounded-full bg-pre-primary-light-100 dark:bg-pre-primary-dark-100 flex-shrink-0">
                                            <div className="text-center">
                                                <div className="text-[8px] sm:text-[10px] leading-none">AC</div>
                                                <div className="text-xs sm:text-sm font-bold leading-none">{monster.ac}</div>
                                            </div>
                                        </div>
                                        
                                        {/* Health Bar */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                                                <span className="text-xs sm:text-sm flex-shrink-0">HP:</span>
                                                <input
                                                    type="number"
                                                    value={health.current}
                                                    onChange={(e) => handleHealthChange(index, monster.name, e.target.value)}
                                                    className="w-10 sm:w-14 text-xs sm:text-sm px-0.5 sm:px-1 py-0.5 border rounded text-center bg-pre-primary-light dark:bg-pre-primary-dark border-tertiary-light dark:border-tertiary-dark"
                                                    min="0"
                                                    max={health.max}
                                                />
                                                <span className="text-xs sm:text-sm flex-shrink-0">/ {health.max}</span>
                                            </div>
                                            <div className="w-full h-3 sm:h-4 bg-pre-primary-light-100 dark:bg-pre-primary-dark-100 rounded border border-tertiary-light dark:border-tertiary-dark overflow-hidden">
                                                <div 
                                                    className="h-full bg-accent-light dark:bg-accent-dark transition-all duration-300"
                                                    style={{ width: `${healthPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${inCanvas ? 'flex-shrink-0 max-h-[40%]' : 'flex-[0_0_30%]'} overflow-auto border-t border-accent-light dark:border-accent-dark pt-2`}>
                        <MonsterStats monster={selectedMonster} />
                    </div>
                </>
            )}
        </div>
    );
}