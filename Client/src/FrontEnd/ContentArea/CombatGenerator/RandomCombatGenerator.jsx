import React, { useEffect } from 'react';
import Forms from "../../UI/Forms"
import Button from "../../UI/Button"
import MonsterSelector from "./MonsterSelector"

export default function RandomCombatGenerator(){
    useEffect(() => {
        console.log("RandomCombatGenerator component rendered");
    }, []);

    return (
        <div className="h-full w-full overflow-y-auto" >
            <div className=" flex flex-col justify-center items-center border-b border-b-accent-light dark:border-b-accent-dark py-4 w-full">
                <Button text="Generate Encounter"/>
            </div>
            <div className='flex flex-row px-4 py-2 flex-wrap'>
                <div className="py-1 px-2 grow-1">
                    <Forms label="Party Size" type="number" name="partySize" min="0" placeholder="Party Size"/>
                    <Forms label="Party Level" type="Party" name="partyLevel" min="0" placeholder="Party Level"/>
                    <Forms label={"Encounter Threat"} type="select" name="encounterThreat" options={["Trivial", "Low", "Moderate", "Severe", "Extreme"]}/>
                    <Forms label="Enemies Number" type="number" name="enemiesNumber" min="0" placeholder="Enemies Nbr."/>
                </div>
                <div className='grow-7 min-w-[80%]'>
                    <MonsterSelector />
                </div>
            </div>
        </div>
    )
}