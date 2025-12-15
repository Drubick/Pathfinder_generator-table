import Button from "../../UI/Button";

export default function SearchResultsList({ searchResults, onMonsterClick, onAddMonster, isMonsterSelected }) {
    return (
        <div className="flex-1 flex flex-col h-[40vh] sm:h-[50vh] lg:h-[70vh] border border-accent-light dark:border-accent-dark ml-0 lg:ml-2 mb-2 sm:mb-4 lg:mb-0">
            <h3 className="text-base sm:text-lg font-bold p-2 sm:p-4 pb-2">Search Results</h3>
            <div className="flex-1 overflow-y-auto px-2 sm:px-4 pb-2 sm:pb-4">
                {searchResults.map((monster, index) => (
                <div key={index} className="flex flex-row justify-between items-center border p-1.5 sm:p-2 my-1 sm:my-2 gap-1.5 sm:gap-2">
                    <div 
                        onClick={() => onMonsterClick(monster)}
                        className={`flex-1 min-w-0 hover:cursor-pointer rounded p-1 ${isMonsterSelected(monster)}`}
                    >
                        <h4 className="text-xs sm:text-sm md:text-base truncate">{monster.name} - Level {monster.level}</h4>
                    </div>
                    
                    <Button
                        text="Add" 
                        action={() => onAddMonster(monster)} 
                    />
                </div>
            ))}
            </div>
        </div>
    );
}
