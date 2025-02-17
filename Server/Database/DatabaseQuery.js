import sqlite3 from 'sqlite3';

sqlite3.verbose();

export default function DatabaseQuery(db, monsterData, limit = 2) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM monsters WHERE 1=1';
        const params = [];

        if (monsterData.name) {
            query += ' AND name LIKE ?';
            params.push(`%${monsterData.name}%`);
        }
        if (monsterData.charisma) {
            query += ' AND charisma LIKE ?';
            params.push(`%${monsterData.charisma}%`);
        }
        if (monsterData.constitution) {
            query += ' AND constituion LIKE ?';
            params.push(`%${monsterData.constitution}%`);
        }
        if (monsterData.dexterity) {
            query += ' AND dexterity LIKE ?';
            params.push(`%${monsterData.dexterity}%`);
        }
        if (monsterData.intelect) {
            query += ' AND intelect LIKE ?';
            params.push(`%${monsterData.intelect}%`);
        }
        if (monsterData.strenght) {
            query += ' AND strenght LIKE ?';
            params.push(`%${monsterData.strenght}%`);
        }
        if (monsterData.wisdom) {
            query += ' AND wisdom LIKE ?';
            params.push(`%${monsterData.wisdom}%`);
        }
        if (monsterData.ac) {
            query += ' AND ac LIKE ?';
            params.push(`%${monsterData.ac}%`);
        }
        if (monsterData.hp) {
            query += ' AND hp LIKE ?';
            params.push(`%${monsterData.hp}%`);
        }
        if (monsterData.inmunities) {
            query += ' AND inmunities LIKE ?';
            params.push(`%${monsterData.inmunities}%`);
        }
        if (monsterData.other_speeds) {
            query += ' AND other_speeds LIKE ?';
            params.push(`%${monsterData.other_speeds}%`);
        }
        if (monsterData.speed) {
            query += ' AND speed LIKE ?';
            params.push(`%${monsterData.speed}%`);
        }
        if (monsterData.languages) {
            query += ' AND languages LIKE ?';
            params.push(`%${monsterData.languages}%`);
        }
        if (monsterData.level) {
            query += ' AND level = ?';
            params.push(monsterData.level);
        }

        query += ' ORDER BY RANDOM()';

        if (limit && limit > 0) {
            query += ' LIMIT ?';
            params.push(limit);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}