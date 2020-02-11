const mysqlBase = require('./mysql-base');

class ComponentShiftDal extends mysqlBase {
	constructor (options) {
		// if (!options) options = {};
		// options.table = "foundational_components"
		// options.key = "id"
		// console.log(options);
		super(options);

		this._tableName = "component_architecture_shifts"
		this._keyName = "Id"
		this._fieldList = [
            {name: "Id",            type: "int",        code: "id", canEdit: false},
            {name: "ComponentId",   type: "int",        code: "id", canEdit: false},
            {name: "FY",            type: "text",       code: "id", canEdit: false},
            {name: "Type",          type: "int",        code: "id", canEdit: false},
            {name: "Pivots",        type: "json",       code: "id", canEdit: false},
            {name: "Principals",    type: "json",       code: "id", canEdit: false},
            {name: "ChangeStory",   type: "textarea",   code: "id", canEdit: false},
        ]	
    }
}

module.exports = ComponentShiftDal

