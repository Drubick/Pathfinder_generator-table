import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./monsters.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the monsters database.');
});

//TODO IMPLEMENT A WAY TO FETCH MONSTER ATTACKS AND STORE IT IN A COHERENT WAY
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS monsters (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each monster
    name TEXT NOT NULL, -- Name of the monster
    charisma INTEGER NOT NULL, -- Charisma attribute
    constitution INTEGER NOT NULL, -- Constitution attribute
    dexterity INTEGER NOT NULL, -- Dexterity attribute
    intelect INTEGER NOT NULL, -- Intellect attribute
    strength INTEGER NOT NULL, -- Strength attribute
    wisdom INTEGER NOT NULL, -- Wisdom attribute
    ac INTEGER NOT NULL, -- Armor Class
    hp INTEGER NOT NULL, -- Hit Points
    inmunities TEXT NOT NULL, -- List of inminuties
    other_speeds TEXT NOT NULL, -- Flying speed
    speed INTEGER NOT NULL, -- Walking speed
    languages TEXT NOT NULL, -- Languages known by the monster
    level INTEGER NOT NULL, -- Level of the monster
    perception INTEGER NOT NULL, -- Perception attribute
    bestiary TEXT NOT NULL, -- Bestiary reference
    sense TEXT NOT NULL, -- Senses of the monster
    fortitude_save INTEGER NOT NULL, -- Fortitude saving throw
    reflex_save INTEGER NOT NULL, -- Reflex saving throw
    will_save INTEGER NOT NULL, -- Will saving throw
    size TEXT NOT NULL, -- Size of the monster
    type TEXT NOT NULL -- Type of the monster
    )`,
    (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Monsters table created.');
  });
});
 