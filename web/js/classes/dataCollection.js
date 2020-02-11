import DataItem from "/js/classes/dataItem.js";

class DataCollection {
    constructor(options) {
        this._myCollection = {};        
        this._counter = 0;
        
        if (options && options.data) {
            options.data.forEach(row => {
                this.put(row);
            },this);
        }
    }

    size() {
		return Object.keys(this._myCollection).length;
	};

    hasKey(key) {
        //return this._myCollection.hasOwnProperty(key)
        return ("undefined" !== typeof(this._myCollection[key]))
    }

    get(key) { 
		return this._myCollection[key]; 
	};
	getValue(key) { 
		return this._myCollection[key].values;
	};


    put(key, value) {
        let row = new DataItem({
            key: key,
            order: this._counter++,
            values: value
        });
        this._myCollection[key] = row;
	};
	upsert(key, value) {
        this._myCollection[key].upsert(value);
	};


	remove(key) { 
		delete this._myCollection[key]; 
	};
	clear() { 
		this._myCollection = {} 
	};



    iterator(callback, filter, sortFields) {
		let res = this.filteredArray(filter, sortFields);
		res.forEach((item, idx) => {
			callback(item, idx);
		});
    }

	toArray(sortFields) {
		let collection = this._myCollection,
		    res = [];
		for(let prop in collection){
			res.push(collection[prop].values);
		}
		if (sortFields) {
            res = this._sortArray(res, sortField)
        }
        return res;
	};

	filteredArray(filter, sortFields) {
        let collection = this._myCollection,
            res = [];
		for(let prop in collection){
			if (collection[prop].passFilter(filter)) {
				res.push(collection[prop].values);
			}
		}
		if (sortFields) {
            res = this._sortArray(res, sortFields)
            console.log(res)
        }
        return res;
    };
    
    _sortArray(records, sortCriteria) {
        // let crit = {
        //     field2: 1,
        //     field1: -1
        // }
        console.log(records.length)
        let res = records.sort(function(a,b) {
            let sortFields = Object.keys(sortCriteria);
            
            let retVal = null;
            sortFields.forEach((fld, idx) => {
                let dir = sortCriteria[fld];
                if (retVal === null) {
                    if (a[fld] < b[fld]) { retVal=(-1 * dir); }
                    if (a[fld] > b[fld]) { retVal=(1 * dir); }    
                }
                if (retVal) return retVal;
                if ((idx+1) >= sortFields.length) retVal= 0;
                return retVal;
            })
            return retVal
        });
        return res

    }




}

export default DataCollection;