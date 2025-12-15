import RandomCombatGenerator from "./CombatGenerator/RandomCombatGenerator";
import Canvas from "./Canvas/Canvas";
import EncounterBuilder from "./EncounterBuilder/EncounterBuilder";
import LandingPageImage from "../../assets/LandingPageImage.png";

export default function ContentArea({ content, savedMonsters, setSavedMonsters }) {
    return (
        <div className="w-full min-h-full bg-pre-primary-light dark:bg-pre-primary-dark">
            {!content && (
                <div className="w-full min-h-screen flex items-center justify-center">
                    <img 
                        src={LandingPageImage} 
                        alt="Pathfinder 2E Tabletop Simulator" 
                        className="max-w-[80%] max-h-[80%] object-contain"
                    />
                </div>
            )}
            {content === 'Combat Generator' && 
                <RandomCombatGenerator 
                    savedMonsters={savedMonsters}
                    setSavedMonsters={setSavedMonsters}
                />
            }
            {content === 'Map' && 
                <Canvas 
                    savedMonsters={savedMonsters}
                />
            }
            {content === 'Encounter Builders' && 
                <EncounterBuilder 
                    savedMonsters={savedMonsters}
                    setSavedMonsters={setSavedMonsters}
                />
            }
        </div>
    );
}