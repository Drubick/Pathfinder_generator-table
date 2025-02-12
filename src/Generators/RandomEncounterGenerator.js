
function determineMonsterMaxLevel (data, totalXp){
    Xp = data.budgetXp - totalXp;
   if (Xp < 10) {
        return -4;
    }else if (Xp >= 10 && Xp < 15)    {
        return -3;    
    }else if (Xp >= 15 && Xp < 20)    {
        return -2;    
    }else if (Xp >= 20 && Xp < 40)    {
        return 0;     
    }else if (Xp >= 40 && Xp < 60)    {
        return 1;     
    }else if (Xp >= 60 && Xp < 80)    {
        return 2; 
    }else if (Xp >= 80 && Xp < 120)   {
        return 3;
    }else if (Xp >= 120 && Xp <= 160) {
        return 4;
    }
    else {
        return 4;
    }
}

function determineMonsterLevel(data, totalXp){
    let lowestLevel = data.PartyLevel - 4;
    let highestLevel = data.PartyLevel + determineMonsterMaxLevel(totalXp);
    lowestLevel < 1 ? lowestLevel = -1 : lowestLevel;
    highestLevel < 1 ? highestLevel = -1 : highestLevel;
    lowestLevel > 21 ? lowestLevel = 21 : lowestLevel;
    highestLevel > 21 ? highestLevel = 21 : highestLevel;

    return randomInt(lowestLevel, highestLevel + 1);
    }

function chooseMonster(data, totalXp){
    // INSERT DATABASE QUERY HERE
    const monsterLevel = determineMonsterLevel(data, totalXp);
    data.monsterList.push("Monster from a database");
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

populateEncounter(data){
    let totalXp = 0;
    while (totalXp < data.budgetXp - 10){
        totalXp += chooseMonster(data, totalXp);
    }
}


function Generator(partySize, PartyLevel, encounterThreath){
    let data = {
        budgetXp: 0,
        PartyLevel: PartyLevel,
        encounterThreath: encounterThreath,
        
        monsterList: []
    }
    data.budgetXp = getBudgetXp(encounterThreath, partySize);
    populateEncounter(data);
}


Generator(2,2,"Trivial")