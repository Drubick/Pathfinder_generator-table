import Forms from "../../UI/Forms";
import Button from "../../UI/Button";

// Map type codes to readable names
const getTypeLabel = (type) => {
    const typeLabels = {
        'aberration': 'Aberration',
        'acid': 'Acid',
        'aeon': 'Aeon',
        'air': 'Air',
        'alchemical': 'Alchemical',
        'amphibious': 'Amphibious',
        'angel': 'Angel',
        'animal': 'Animal',
        'aquatic': 'Aquatic',
        'beast': 'Beast',
        'boggard': 'Boggard',
        'caligni': 'Caligni',
        'catfolk': 'Catfolk',
        'celestial': 'Celestial',
        'changeling': 'Changeling',
        'chaotic': 'Chaotic',
        'cold': 'Cold',
        'construct': 'Construct',
        'daemon': 'Daemon',
        'demon': 'Demon',
        'devil': 'Devil',
        'dinosaur': 'Dinosaur',
        'dragon': 'Dragon',
        'earth': 'Earth',
        'electricity': 'Electricity',
        'elemental': 'Elemental',
        'elf': 'Elf',
        'evil': 'Evil',
        'fiend': 'Fiend',
        'fire': 'Fire',
        'giant': 'Giant',
        'gnome': 'Gnome',
        'goblin': 'Goblin',
        'golem': 'Golem',
        'good': 'Good',
        'hag': 'Hag',
        'holy': 'Holy',
        'human': 'Human',
        'humanoid': 'Humanoid',
        'incorporeal': 'Incorporeal',
        'inevitable': 'Inevitable',
        'kobold': 'Kobold',
        'lawful': 'Lawful',
        'mindless': 'Mindless',
        'monitor': 'Monitor',
        'nephilim': 'Nephilim',
        'ooze': 'Ooze',
        'plant': 'Plant',
        'spirit': 'Spirit',
        'swarm': 'Swarm',
        'undead': 'Undead',
        'unholy': 'Unholy',
        'water': 'Water'
    };
    
    return typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

export default function SearchFilters({ partySize, partyLevel, onPartyChange, monsterTypes = [] }) {
    const typeOptions = [
        { value: "", label: "" },
        ...monsterTypes.map(type => ({
            value: type,
            label: getTypeLabel(type)
        }))
    ];

    return (
        <div className="border-b border-b-accent-light dark:border-b-accent-dark py-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Forms label="Name" type="text" name="Name" placeholder="Name"/>
                <Forms label="Min Level" type="number" name="minLevel" placeholder="Min level"/>
                <Forms label="Max Level" type="number" name="maxLevel" placeholder="Max level"/>
                <Forms label="Size" type="select" name="Size" options={[
                    {value: "", label: ""},
                    {value: "grg", label: "Gargantuan"},
                    {value: "huge", label: "Huge"},
                    {value: "lg", label: "Large"},
                    {value: "med", label: "Medium"},
                    {value: "sm", label: "Small"},
                    {value: "tiny", label: "Tiny"}
                ]} />
                <Forms label="Type" type="select" name="Type" options={typeOptions} />
                <Forms 
                    label="Party Size" 
                    type="number" 
                    name="PartySize" 
                    placeholder="Party Size"
                    value={partySize}
                    onChange={onPartyChange}
                />
                <Forms 
                    label="Party Level" 
                    type="number" 
                    name="PartyLevel" 
                    placeholder="Party Level"
                    value={partyLevel}
                    onChange={onPartyChange}
                />
            </div>
            <div className="flex justify-center sm:justify-start">
                <Button text="Search" type="submit" />
            </div>
        </div>
    );
}
