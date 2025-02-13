import Forms from "../../UI/Forms"
import Button from "../../UI/Button"
import MonsterSelector from "./MonsterSelector"

export default function RandomCombatGenerator(){
    return (
        <div className="h-full w-full overflow-y-auto flex-col" >
            <div className="border-b border-b-accent-light dark:border-b-accent-dark py-4 w-full flex-basis:100">
                <Button text="Generate Encounter"/>
            </div>
            <div className="py-1 px-2">
                <Forms label="Party Size" type="number" name="partySize" min="0" placeholder="Party Size"/>
                <Forms label="Party Level" type="Party" name="partyLevel" min="0" placeholder="Party Level"/>
                <Forms label={"Encounter Threat"} type="select" name="encounterThreat" options={["Trivial", "Low", "Moderate", "Severe", "Extreme"]}/>
                <Forms label="Enemies Number" type="number" name="enemiesNumber" min="0" placeholder="Enemies Nbr."/>
            </div>
            <div>
                DERECHA
            </div>
         
        </div>
    )
}