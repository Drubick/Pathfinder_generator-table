import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database('./monsters.db');

function getRandomMonster(callback) {
    db.get('SELECT * FROM monsters ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(row);
    });
}

function printMonster(monster) {
    if (!monster) {
        console.log('No monster found.');
        return;
    }
    for (const [key, value] of Object.entries(monster)) {
        console.log(`${key}: ${value}`);
    }
}

getRandomMonster(printMonster);