import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import SearchResultsList from "./SearchResultsList";
import AddedMonstersList from "./AddedMonstersList";
import XPBar from "./XPBar";
import { calculateTotalXP } from "./xpCalculator.jsx";

export default function EncounterBuilder({ savedMonsters, setSavedMonsters }) {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [partyLevel, setPartyLevel] = useState(1);
    const [partySize, setPartySize] = useState(4);
    const [monsterTypes, setMonsterTypes] = useState([]);

    const totalXP = calculateTotalXP(savedMonsters, partyLevel);

    // Load monster types on component mount
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch('http://localhost:5000/monster-types');
                const types = await response.json();
                setMonsterTypes(types);
            } catch (error) {
                console.error("Error fetching monster types:", error);
            }
        };
        fetchTypes();
    }, []);

    const handlePartyChange = (event) => {
        const { name, value } = event.target;
        const numValue = parseInt(value);
        
        if (name === 'PartySize' && !isNaN(numValue)) {
            setPartySize(numValue);
        } else if (name === 'PartyLevel' && !isNaN(numValue)) {
            setPartyLevel(numValue);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const params = new URLSearchParams();
        const name = formData.get('Name');
        const minLevel = formData.get('minLevel');
        const maxLevel = formData.get('maxLevel');
        const size = formData.get('Size');
        const type = formData.get('Type');
        
        if (name) {
            params.append('name', name);
        }
        if (minLevel) {
            params.append('minLevel', minLevel);
        }
        if (maxLevel) {
            params.append('maxLevel', maxLevel);
        }
        if (size) {
            params.append('size', size);
        }
        if (type) {
            params.append('type', type);
        }

        const response = await fetch(`http://localhost:5000/monsters?${params.toString()}`);
        const data = await response.json();
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

        setSearchResults(sortedData);
    };

    const handleMonsterClick = (monster) => {
        if (selectedMonster?.name === monster.name) {
            setSelectedMonster(null);
        } else {
            setSelectedMonster(monster);
        }
    };

    const handleAddMonster = (monster) => {
        setSavedMonsters(prev => [...prev, monster]);
    };

    const handleRemoveMonster = (monster, index) => {
        setSavedMonsters(prev => prev.filter((_, i) => i !== index));
        
        if (selectedMonster?.name === monster.name) {
            setSelectedMonster(null);
        }
    };

    const handleClearAll = () => {
        setSavedMonsters([]);
        setSelectedMonster(null);
    };

    const isMonsterSelected = (monster) => {
        if (selectedMonster?.name === monster.name) {
            return 'bg-pre-primary-light-100 dark:bg-pre-primary-dark-100';
        }
        return '';
    };

    return (
        <div className="px-2 sm:px-4 min-h-screen bg-pre-primary-light dark:bg-pre-primary-dark">
            <form onSubmit={handleSearch}>
                <SearchFilters 
                    partySize={partySize}
                    partyLevel={partyLevel}
                    onPartyChange={handlePartyChange}
                    monsterTypes={monsterTypes}
                />
            </form>
            
            <div className="p-2 sm:p-4 rounded-lg mb-2 sm:mb-4 border-b border-accent-light dark:border-accent-dark">
                <XPBar totalXP={totalXP} partyLevel={partyLevel} partySize={partySize} />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-4">
                <SearchResultsList 
                    searchResults={searchResults}
                    onMonsterClick={handleMonsterClick}
                    onAddMonster={handleAddMonster}
                    isMonsterSelected={isMonsterSelected}
                />

                <AddedMonstersList
                    savedMonsters={savedMonsters}
                    selectedMonster={selectedMonster}
                    onMonsterClick={handleMonsterClick}
                    onRemoveMonster={handleRemoveMonster}
                    onClearAll={handleClearAll}
                    isMonsterSelected={isMonsterSelected}
                />
            </div>
        </div>
    );
}
