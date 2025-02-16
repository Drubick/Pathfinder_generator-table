const express = require('express');
const sqlite3 = require("sqlite3").verbose;
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

const db = new sqlite3.Database("./monster.db", (err) =>{
    if (err){
        console.error(err.message);
    }
    console.log("Connected to the monsters database")
})

app.use(cors(corsOptions));

app.get("/", (req, res) =>{
    res.json({fruits: ["orange", "apple", "banana"]})
});

app.listen(5000, ()=>{
    console.log("Server started on port 5000")
})



