export default function XPBar({ totalXP, partyLevel = 1, partySize = 4 }) {
    // Base XP budgets for 4-character party (Pathfinder 2e Table 10-1)
    const baseBudgets = {
        trivial: 40,
        low: 60,
        moderate: 80,
        severe: 120,
        extreme: 160
    };

    // XP adjustments per character above/below 4
    const characterAdjustments = {
        trivial: 10,
        low: 20,
        moderate: 20,
        severe: 30,
        extreme: 40
    };

    // Calculate budgets adjusted for actual party size
    const partyAdjustment = partySize - 4;
    const budgets = {
        trivial: baseBudgets.trivial + (characterAdjustments.trivial * partyAdjustment),
        low: baseBudgets.low + (characterAdjustments.low * partyAdjustment),
        moderate: baseBudgets.moderate + (characterAdjustments.moderate * partyAdjustment),
        severe: baseBudgets.severe + (characterAdjustments.severe * partyAdjustment),
        extreme: baseBudgets.extreme + (characterAdjustments.extreme * partyAdjustment)
    };

    const getDifficulty = () => {
        if (totalXP === 0) return 'None';
        if (totalXP <= budgets.trivial) return 'Trivial';
        if (totalXP <= budgets.low) return 'Low';
        if (totalXP <= budgets.moderate) return 'Moderate';
        if (totalXP <= budgets.severe) return 'Severe';
        if (totalXP <= budgets.extreme) return 'Extreme';
        return 'Beyond Extreme';
    };

    const maxXP = budgets.extreme;
    const percentage = Math.min((totalXP / maxXP) * 100, 100);

    const getBarColor = () => {
        const difficulty = getDifficulty();
        switch (difficulty) {
            case 'None':
            case 'Trivial':
                return 'bg-tertiary-light dark:bg-tertiary-dark';
            case 'Low':
                return 'bg-accent-light dark:bg-accent-dark';
            case 'Moderate':
                return 'bg-accent-light-2 dark:bg-accent-dark-2';
            case 'Severe':
                return 'bg-accent-light dark:bg-accent-dark';
            case 'Extreme':
            case 'Beyond Extreme':
                return 'bg-accent-light dark:bg-accent-dark';
            default:
                return 'bg-tertiary-light dark:bg-tertiary-dark';
        }
    };

    const difficulty = getDifficulty();
    const barColor = getBarColor();

    return (
        <div className="w-full mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">
                    Encounter Difficulty: <span className="text-lg">{difficulty}</span>
                </span>
                <span className="text-sm font-semibold">
                    Total XP: {totalXP} / {maxXP}
                </span>
            </div>

            {/* XP Bar Container */}
            <div className="relative w-full h-8 bg-pre-primary-light-100 dark:bg-pre-primary-dark-100 rounded-lg overflow-hidden border border-tertiary-light dark:border-tertiary-dark">
                {/* Filled portion */}
                <div 
                    className={`h-full ${barColor} transition-all duration-300 ease-out`}
                    style={{ width: `${percentage}%` }}
                />

                {/* Budget markers */}
                <div className="absolute inset-0 flex">
                    <div 
                        className="border-r-2 border-secondary-light dark:border-secondary-dark" 
                        style={{ width: `${(budgets.trivial / maxXP) * 100}%` }}
                        title={`Trivial: ${budgets.trivial}`}
                    />
                    <div 
                        className="border-r-2 border-secondary-light dark:border-secondary-dark" 
                        style={{ width: `${((budgets.low - budgets.trivial) / maxXP) * 100}%` }}
                        title={`Low: ${budgets.low}`}
                    />
                    <div 
                        className="border-r-2 border-secondary-light dark:border-secondary-dark" 
                        style={{ width: `${((budgets.moderate - budgets.low) / maxXP) * 100}%` }}
                        title={`Moderate: ${budgets.moderate}`}
                    />
                    <div 
                        className="border-r-2 border-secondary-light dark:border-secondary-dark" 
                        style={{ width: `${((budgets.severe - budgets.moderate) / maxXP) * 100}%` }}
                        title={`Severe: ${budgets.severe}`}
                    />
                </div>

                {/* Difficulty labels overlay */}
                <div className="absolute inset-0 flex items-center justify-around text-xs font-semibold text-primary-light dark:text-primary-dark drop-shadow-md pointer-events-none">
                    <span style={{ width: `${(budgets.trivial / maxXP) * 100}%` }} className="text-center">Trivial</span>
                    <span style={{ width: `${((budgets.low - budgets.trivial) / maxXP) * 100}%` }} className="text-center">Low</span>
                    <span style={{ width: `${((budgets.moderate - budgets.low) / maxXP) * 100}%` }} className="text-center">Moderate</span>
                    <span style={{ width: `${((budgets.severe - budgets.moderate) / maxXP) * 100}%` }} className="text-center">Severe</span>
                    <span style={{ width: `${((budgets.extreme - budgets.severe) / maxXP) * 100}%` }} className="text-center">Extreme</span>
                </div>
            </div>

            {/* Budget legend */}
            <div className="flex justify-between mt-1 text-xs text-tertiary-light dark:text-tertiary-dark">
                <span>{budgets.trivial}</span>
                <span>{budgets.low}</span>
                <span>{budgets.moderate}</span>
                <span>{budgets.severe}</span>
                <span>{budgets.extreme}</span>
            </div>
        </div>
    );
}

