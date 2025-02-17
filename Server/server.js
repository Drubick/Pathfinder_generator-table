import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import DatabaseQuery from './Database/DatabaseQuery.js';

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

const db = new sqlite3.Database('./monsters.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the monsters database');
});

app.use(cors(corsOptions));

app.get("/monsters", async (req, res) => {
    const monsterData = req.query;
    try {
        const monsters = await DatabaseQuery(db, monsterData);
        res.json(monsters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("internal server error");
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});