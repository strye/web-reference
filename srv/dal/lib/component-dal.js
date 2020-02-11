const mysqlBase = require('./mysql-base');

class ComponentDal extends mysqlBase {
	constructor (options) {
		// if (!options) options = {};
		// options.table = "foundational_components"
		// options.key = "id"
		// console.log(options);
		super(options);

		this._tableName = "foundational_components"
		this._keyName = "id"

	}
}

module.exports = ComponentDal
