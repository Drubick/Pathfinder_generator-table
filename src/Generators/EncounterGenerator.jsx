import { Database, Query, MON } from '../Database/bestiary.db';
import { randomInt } from 'crypto';

export class Generator {
    constructor(path = "bestiary.db") {
        this._path = path;
        this._database = new Database(path);
        this._monster_list = [];
        // temporal
        this._party_size = null;
        this._encounter_threat = null;
        this._enemies_number = null;
        this._threat_xp_difference = 40;
        this._xp_budget = 0;
        this._monster_xp_budget = 0;
        this._cursor = null;
        this._party_level = null;
        this._query = null;
    }

    getXpBudget() {
        let xp_per_character = 0;
        if (this._encounter_threat === "Trivial") {
            xp_per_character = 10;
        } else if (this._encounter_threat === "Low") {
            xp_per_character = 15;
        } else if (this._encounter_threat === "Moderate") {
            xp_per_character = 20;
        } else if (this._encounter_threat === "Severe") {
            xp_per_character = 30;
        } else if (this._encounter_threat === "Extreme") {
            xp_per_character = 40;
        }

        this._xp_budget = xp_per_character * this._party_size;
    }

    determineMonsterMaxLevel(xp) {
        xp = this._xp_budget - xp;
        if (xp < 10) {
            return -4;
        } else if (xp >= 10 && xp < 15) {
            return -3;
        } else if (xp >= 15 && xp < 20) {
            return -2;
        } else if (xp >= 20 && xp < 40) {
            return 0;
        } else if (xp >= 40 && xp < 60) {
            return 1;
        } else if (xp >= 60 && xp < 80) {
            return 2;
        } else if (xp >= 80 && xp < 120) {
            return 3;
        } else if (xp >= 120 && xp <= 160) {
            return 4;
        } else {
            return 4;
        }
    }

    determineMonsterXp(monster_level) {
        const monster_level_diff = monster_level - this._party_level;
        const lvl_to_xp = { '-4': 10, '-3': 15, '-2': 20, '-1': 30, '0': 40, '1': 60, '2': 80, '3': 120, '4': 160 };
        this._monster_xp_budget = lvl_to_xp[monster_level_diff];
    }

    getMonsterLevel(total_xp) {
        let lowest_level = this._party_level - 4;
        let highest_level = this._party_level + this.determineMonsterMaxLevel(total_xp);
        if (lowest_level < -1) {
            lowest_level = -1;
        }
        if (highest_level < -1) {
            highest_level = -1;
        }
        if (this._encounter_threat === "Trivial") {
            return randomInt(lowest_level, highest_level + 1);
        } else if (this._encounter_threat === "Low") {
            if (highest_level > 21) {
                highest_level = 21;
            }
            return randomInt(lowest_level, highest_level + 1);
        } else if (this._encounter_threat === "Moderate") {
            if (highest_level > 21) {
                highest_level = 21;
            }
            return randomInt(lowest_level, highest_level + 1);
        } else if (this._encounter_threat === "Severe") {
            if (highest_level > 21) {
                highest_level = 21;
            }
            return randomInt(lowest_level, highest_level + 1);
        } else if (this._encounter_threat === "Extreme") {
            if (highest_level > 21) {
                highest_level = 21;
            }
            return randomInt(lowest_level, highest_level + 1);
        }
    }

    chooseMonsters(total_xp) {
        const query = new Query("monsters");
        const monster_level = this.getMonsterLevel(total_xp);

        query.addFilter([MON.level, monster_level]);
        query.limit = 1;
        this._monster_list.push(...this._database.search(query.composeQuery()));
        return this._monster_xp_budget;
    }

    populateEncounter() {
        let total_xp = 0;
        while (total_xp < this._xp_budget - 10) {
            total_xp += this.chooseMonsters(total_xp);
        }
    }

    generate(party_size, party_level, encounter_threat) {
        this._party_size = party_size;
        this._party_level = party_level;
        this._encounter_threat = encounter_threat;
        this.getXpBudget();
        this.populateEncounter();
    }
}