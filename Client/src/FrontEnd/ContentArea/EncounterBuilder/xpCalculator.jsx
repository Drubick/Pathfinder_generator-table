export function calculateMonsterXP(monsterLevel, partyLevel) {
    const levelDifference = monsterLevel - partyLevel;
    
    const xpTable = {
        '-4': 10,
        '-3': 15,
        '-2': 20,
        '-1': 30,
        '0': 40,
        '1': 60,
        '2': 80,
        '3': 120,
        '4': 160
    };
    
    if (levelDifference < -4) return 10;
    if (levelDifference > 4) return 160;
    
    return xpTable[levelDifference.toString()] || 0;
}

export function calculateTotalXP(monsters, partyLevel) {
    if (!monsters || monsters.length === 0) return 0;
    
    return monsters.reduce((total, monster) => {
        const monsterLevel = parseInt(monster.level) || 0;
        const xp = calculateMonsterXP(monsterLevel, partyLevel);
        return total + xp;
    }, 0);
}
