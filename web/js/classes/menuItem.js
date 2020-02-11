
const charType = {
	PLAYER: 0,
	NPC: 1,
	MONSTER: 2,
	SPIRIT: 3,
	UNDEAD: 4,
	DRAGON: 5
}


class MenuItem {
	constructor (options) {

        //	{title:'Sample 1', url:'/sample1.html', desc:'This is rows sample 1'},
        let self = this;
        this._fields = [];
        if (options && options.row) {
            for (const fld in options.row) {
                let field = {
                    name: fld,
                    value: options.row[fld],
                    originalValue: options.row[fld],
                    dirty: false
                };
                this._fields.push(field);
                self[`_${field}`] = options.row[fld];
            }
        }
        

        
		this.keyField= options.id;
		this.name= options.name;
		this.type= options.type || "NPC";
		this.level=options.level || 1;
		this.location= { map:map, r:r, c:c };

		this._healthMax= options.healthMax || 1;
		this._health= options.health || 1;

		this._castingMax= options.castingMax || 0;
		this._casting= options.casting || 0;

		this.STR= options.STR || 12;
		this.DEX= options.DEX || 12;
		this.CON= options.CON || 12;
		this.INT= options.INT || 12;
		this.WIS= options.WIS || 12;
		this.CHR= options.CHR || 12;

		this.gold=options.gold || 0;
		this.bank=options.bank || 0;

		this.inventory= options.inventory || [];
		this.spells= options.spells || [];
		this.affects=options.affects || [];
	}

	get healthMax() { return this._healthMax; }
	get health() { return this._health; }
	set health(val) {
		if (val <= this.healthMax && val >= 0) this._health = val;
		if (val > this.healthMax) this._health = this.healthMax;
		//this.emit("onChange", { property: 'health', submited: val, value: this._health});
	}

	get castingMax() { return this._castingMax; }
	get casting() { return this._casting; }
	set casting(val) {
		if (val <= this.castingMax) this._casting = val;
		//this.emit("onChange", { property: 'casting', submited: val, value: this._casting});
	}

	get defense() {
		let res = 0;
		this.inventory.forEach(itm => {
			if(itm.type==="armor" && itm.equiped) res+= itm.ArmorClass
		})
		return res;
	}
	get offense() {
		let res = 0;
		this.inventory.forEach(itm => {
			if(itm.type==="armor" && itm.equiped) res+= itm.ArmorClass
		})
		return res;
	}


	get spiritPRO() {
		return false;
	}
	get undeadPRO() {
		return false;
	}
	get dragonPRO() {
		return false;
	}



	move(direction) {
		let newSpace= { r: this.location.space.r, c: this.location.space.c }

		switch (direction) {
			case 8: newSpace.r--; break;
			case 9: newSpace.r--; newSpace.c++; break;
			case 6: newSpace.c++; break;
			case 3: newSpace.r++; newSpace.c++; break;
			case 2: newSpace.r++; break;
			case 1: newSpace.r++; newSpace.c--; break;
			case 4: newSpace.c--; break;
			case 7: newSpace.r--; newSpace.c--; break;
		}

		//validate
		let ml = gameData.getLevelMap();
		if (ml.spaceIsOpen(newSpace)) {
			this.location.space = newSpace
			return newSpace;
		} else {
			console.log("You can't move there.");
			return this.location.space;
		}

	}
	
	getData() {
		return {
			id: this.id,
			name: this.name,
			location: this.location,
			level: this.level,

			healthMax: this._healthMax,
			health: this._health,

			castingMax: this._castingMax,
			casting: this._casting,

			STR: this.STR,
			DEX: this.DEX,
			CON: this.CON,
			INT: this.INT,
			WIS: this.WIS,
			CHR: this.CHR,

			gold: this.gold,
			bank: this.bank,
			inventory: this.inventory,
			spells: this.spells
		}
	}
  
}




module.exports = Character;

