console.log("RandomEncounterGenerator module loaded");

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineMonsterMaxLevel (data, totalXp){
 let xp = data.budgetXp- totalXp;
   if (xp < 10) {
        return -4;
    }else if (xp >= 10 && xp < 15)    {
        return -3;    
    }else if (xp >= 15 && xp < 20)    {
        return -2;    
    }else if (xp >= 20 && xp < 40)    {
        return 0;     
    }else if (xp >= 40 && xp < 60)    {
        return 1;     
    }else if (xp >= 60 && xp < 80)    {
        return 2; 
    }else if (xp >= 80 && xp < 120)   {
        return 3;
    }else if (xp >= 120 && xp <= 160) {
        return 4;
    }
    else {
        return 4;
    }
}

function determineMonsterXp(data, monsterLevel){
    const monsterLevelDiff = monsterLevel - data.PartyLevel;
    const lvlToXp = { '-4': 10, '-3': 15, '-2': 20, '-1':
        30, '0': 40, '1': 60, '2': 80, '3': 120, '4': 160 };
    return (lvlToXp[monsterLevelDiff]);
}

function determineMonsterLevel(data, totalXp){
    let lowestLevel = data.minLevel ? data.minLevel : data.PartyLevel - 4;  
    let highestLevel = data.maxLevel ? data.maxLevel : determineMonsterMaxLevel(totalXp);
    lowestLevel < -1 ? lowestLevel = -1 : lowestLevel;
    highestLevel < -1 ? highestLevel = -1 : highestLevel;
    lowestLevel > 24 ? lowestLevel = 24 : lowestLevel;
    highestLevel > 24 ? highestLevel = 24 : highestLevel;

    const monsterLevel = randomInt(lowestLevel, highestLevel);
    return monsterLevel
    }

async function chooseMonster(data, totalXp) {
    const monsterLevel = determineMonsterLevel(data, totalXp);
    try {
        const response = await fetch(`http://localhost:5000/monsters?level=${monsterLevel}`);
        const result = await response.json();
        if (result.length > 0) {
            data.monsterList.push(result[0]);
        } else {
            console.log('No monster found');
            
        }
    } catch (err) {
        console.error(err);
    }
    return determineMonsterXp(data, monsterLevel);
}
    


function getBudgetXp(encounterThreath, partySize){
    let xpPerCharacter
    if (encounterThreath === "Trivial") {
        xpPerCharacter = 10;
    } else if (encounterThreath === "Low") {
        xpPerCharacter = 15;
    } else if (encounterThreath === "Moderate") {
        xpPerCharacter = 20;
    } else if (encounterThreath === "Severe") {
        xpPerCharacter = 30;
    } else if (encounterThreath === "Extreme") {
        xpPerCharacter = 40;
    }
    else{return (-1)}

    return (xpPerCharacter * partySize);

}

async function populateEncounter(data){
    let totalXp = 0;
    while (totalXp < data.budgetXp - 10){
        totalXp += await chooseMonster(data, totalXp);
    }
}

// TODO: IMPLEMENT A WAY TO SELECT THE NUMBER OF MONSTERS TO GENERATE
async function randomEncounterGenerator(partySize, PartyLevel, encounterThreath, minLevel , maxLevel){
    let data = {
        budgetXp: 0,
        PartyLevel: PartyLevel,
        encounterThreath: encounterThreath,
        minLevel: minLevel,
        maxLevel: maxLevel,
        
        monsterList: []
    }
    data.budgetXp = getBudgetXp(encounterThreath, partySize);
    await populateEncounter(data);

    data.monsterList.forEach(monster => {
        console.log(monster.name);
    });
}

randomEncounterGenerator(2, 4, "Low")

export default randomEncounterGenerator;