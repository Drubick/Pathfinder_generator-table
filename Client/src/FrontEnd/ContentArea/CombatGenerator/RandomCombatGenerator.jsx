import { useEffect, useState } from 'react';
import Forms from "../../UI/Forms";
import Button from "../../UI/Button";
import AddedMonstersList from "../EncounterBuilder/AddedMonstersList";
import randomEncounterGenerator from '../../../../../Server/Generators/RandomEncounterGenerator';

export default function RandomCombatGenerator({ savedMonsters, setSavedMonsters }) {
    const [selectedMonster, setSelectedMonster] = useState(null);

    useEffect(() => {
        console.log("RandomCombatGenerator component rendered");
    }, []);

    const handleGenerateEncounter = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const partySize = formData.get('partySize');
        const partyLevel = formData.get('partyLevel');
        const encounterThreat = formData.get('encounterThreat');
        const enemiesNumber = formData.get('enemiesNumber');

        try {
            const result = await randomEncounterGenerator(partySize, partyLevel, encounterThreat);
            setSavedMonsters(result);
        } catch (error) {
            console.error("Error generating encounter:", error);
        }
    };

    return (
        <form onSubmit={handleGenerateEncounter} className="h-full w-full overflow-y-auto">
            <div className="flex flex-col justify-center items-center border-b border-b-accent-light dark:border-b-accent-dark py-4 w-full">
                <Button text="Generate Encounter" type="submit" />
            </div>
            <div className='flex flex-row px-4 py-2 flex-wrap transition-all duration-300'>
                <div className="flex flex-col py-1 px-2 grow items-center sm:items-start sm:justify-start justify-center">
                    <Forms label="Party Size" type="number" name="partySize" min="0" placeholder="Party Size" />
                    <Forms label="Party Level" type="number" name="partyLevel" min="0" placeholder="Party Level" />
                    <Forms label="Encounter Threat" type="select" name="encounterThreat" options={["Trivial", "Low", "Moderate", "Severe", "Extreme"]} />
                </div>
                <div className='grow-7 min-w-[80%]'>
                    <AddedMonstersList 
                        savedMonsters={savedMonsters}
                        setSavedMonsters={setSavedMonsters}
                        selectedMonster={selectedMonster}
                        onMonsterClick={(monster) => {
                            if (selectedMonster?.name === monster.name) {
                                setSelectedMonster(null);
                            } else {
                                setSelectedMonster(monster);
                            }
                        }}
                        onRemoveMonster={(monster, index) => {
                            setSavedMonsters(prev => prev.filter((_, i) => i !== index));
                            if (selectedMonster?.name === monster.name) {
                                setSelectedMonster(null);
                            }
                        }}
                        onClearAll={() => {
                            setSavedMonsters([]);
                            setSelectedMonster(null);
                        }}
                        isMonsterSelected={(monster) => {
                            if (selectedMonster?.name === monster.name) {
                                return 'bg-pre-primary-light-100 dark:bg-pre-primary-dark-100';
                            }
                            return '';
                        }}
                    />
                </div>
            </div>
        </form>
    );
}