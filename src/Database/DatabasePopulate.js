import sqlite3 from 'sqlite3';
import fs, { stat } from 'fs';
import path from 'path';

sqlite3.verbose();

const getJSONPaths = (mainDir, subDirs)  => {
    let jsonFiles = [];
    subDirs.forEach((subDirs) =>{
        const dirPath = path.join(mainDir, subDirs);
        const files = fs.readdirSync(dirPath);

        files.forEach((file) =>{
            const filePath = path.join(dirPath, file);
            if (path.extname(file) === '.json'){
                jsonFiles.push(filePath)
            }
        })
    });
    
    return jsonFiles;
};

const readJSONFiles = (filePath) => {
    return new Promise ((resolve, reject) =>{
        fs.readFile(filePath,  'utf8', (err, data) =>{
            if (err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        })
    })
}

const db = new sqlite3.Database('./monsters.db', (err) =>{
    if (err){
        console.error(err.mesage);
    }
    console.log('connected to the monsters database.');
});

const insertMonster = db.prepare(`INSERT INTO monsters (
  name, charisma, constitution, dexterity, intelect, strength, wisdom, ac, hp, inmunities,
  other_speeds, speed, languages, level, perception, bestiary, sense, fortitude_save,
  reflex_save, will_save, size, type
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)


const populateDatabase = async() =>{
    try {
        const mainDir = '../packs';
        const subDir = ['pathfinder-bestiary', 'pathfinder-bestiary-2', 'pathfinder-bestiary-3', 'pfs-introductions-bestiary'
            ,
        ]
        const jsonFiles = getJSONPaths(mainDir, subDir);

        for (const file of jsonFiles){
            const monsterData = await readJSONFiles(file);

            const name = monsterData.name ?? path.basename(file, '.json');
            const charisma = monsterData.system?.abilities?.cha?.mod ?? 0;
            const constitution = monsterData.system?.abilities?.con?.mod ?? 0;
            const dexterity = monsterData.system?.abilities?.dex?.mod ?? 0;
            const intellect = monsterData.system?.abilities?.int?.mod ?? 0;
            const strength = monsterData.system?.abilities?.str?.mod ?? 0;
            const wisdom = monsterData.system?.abilities?.wis?.mod ?? 0;
            const ac = monsterData.system?.attributes?.ac?.value ?? 0;
            const hp = monsterData.system?.attributes?.hp?.value ?? 0;
            const inmunities = monsterData.system?.attributes?.immunities
            ?.map(immunity => immunity.type)
            .join(', ') ?? 'No inmunities';
            const other_speeds = monsterData.system?.attributes?.speed?.otherSpeeds
            ?.map(speed => `${speed.type}: ${speed.value}`)
            .join(', ') ?? 'No other speeds';
            const speed = monsterData.system?.attributes?.speed?.value ?? 0;
            const languages = monsterData.system?.details?.languages?.value.length > 0 
            ? monsterData.system?.details?.languages?.value.join(', ') : 'No speech';
            const level = monsterData.system?.details?.level?.value ?? -404;
            const perception = monsterData.system?.perception?.mod ?? 0;
            const bestiary = monsterData.system?.details?.publication?.title ?? 'Unknown';
            const sense = monsterData.system?.perception?.senses?.length > 0 
            ? monsterData.system?.perception?.senses?.map(sense => sense.type).join(', ') 
            : 'No unusual sense';
            const fortitude_save = monsterData.system?.saves?.fortitude?.value ?? 0;
            const reflex_save = monsterData.system?.saves?.reflex?.value ?? 0;
            const will_save = monsterData.system?.saves?.will?.value ?? 0;
            const size = monsterData.system?.traits?.size?.value ?? 'Unknown';
            const type = monsterData.system?.traits?.value.join(', ') ?? 'Unknown';

            insertMonster.run(
                name, charisma, constitution, dexterity, intellect, strength, wisdom, ac, hp, inmunities,
                other_speeds, speed, languages, level, perception, bestiary, sense, fortitude_save,
                reflex_save, will_save, size, type
            );
        }
        insertMonster.finalize();
        await console.log("insertion finalized")
        db.close()
    }
    catch (err){
        console.error(err.message);
    }


}

populateDatabase();