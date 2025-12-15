import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import DatabaseQuery from './Database/DatabaseQuery.js';

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
};

app.use(cors(corsOptions));

app.get("/monsters", async (req, res) => {
    const monsterData = req.query;
    const db = new sqlite3.Database('./monsters.db', (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("internal server error");
            return;
        }
    });


    try {
        const monsters = await DatabaseQuery(db, monsterData);
        res.json(monsters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("internal server error");
    } finally {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

app.get("/monster-types", async (req, res) => {
    const db = new sqlite3.Database('./monsters.db', (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("internal server error");
            return;
        }
    });

    try {
        db.all("SELECT DISTINCT type FROM monsters", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("internal server error");
                return;
            }
            
            const typesSet = new Set();
            rows.forEach(row => {
                const types = row.type.split(',').map(t => t.trim());
                types.forEach(type => typesSet.add(type));
            });
            
            const uniqueTypes = Array.from(typesSet).sort();
            res.json(uniqueTypes);
            
            db.close();
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("internal server error");
        db.close();
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});