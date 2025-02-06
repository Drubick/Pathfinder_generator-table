import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database('./monsters.db');

export default function DatabaseQuery(monsterData) {
    const query = `
    SELECT * FROM monsters
    WHERE name LIKE ?
    AND charisma LIKE ?
    AND constituion LIKE ?
    AND dexterity LIKE ?
    AND intelect LIKE ?
    AND strenght LIKE ?
    AND wisdom LIKE ?
    AND ac LIKE ?
    AND hp LIKE ?
    AND inmunities LIKE ?
    AND other_speeds LIKE ?
    AND speed LIKE ?
    AND languages LIKE ?
    AND level LIKE ?
    AND perception LIKE ?
    AND bestiary LIKE ?
    AND sense LIKE ?
    AND fortitude_save LIKE ?
    AND reflex_save LIKE ?
    AND will_save LIKE ?
    AND size LIKE ?
    AND type LIKE ?
    `

    db.all(query, Object.values(monsterData), (err, rows) =>{
        if (err){
            console.error(err.nessage);
            return;
        }
        //replace with a call to another function
        console.log(rows);
    });
};