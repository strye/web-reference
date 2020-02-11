const mysqlBase = require('./mysql-base');

class ComponentDal extends mysqlBase {
	constructor (options) {
		if (!options) options = {};
		options.database = "activation_analysis_round_2"

        super(options);

		this._tableName = "tech_components"
		this._keyName = "id_comp-DONT_ENTER"

		this._fieldList = [
			{name: "id_comp-DONT_ENTER", type: "int", code: "id"},
			{name: "THREAD_AREA", type: "text", code: "typ"},
			{name: "FOUNDATION_FEATURE", type: "text", code: "fnd"},
			{name: "FOUNDATION_FEATURE_SUBCOMPONENT", type: "text", code: "cmp"},
			{name: "FY20_PRIORITY", type: "text", code: "pri"},
			{name: "PIVOT_OMNI_CHANNEL", type: "text", code: "oc"},
			{name: "PIVOT_CONSUMER_ENGAGEMENT", type: "text", code: "ce"},
			{name: "PIVOT_RESPONSIVE_CHAIN", type: "text", code: "rc"},
			{name: "PIVOT_CULTURE", type: "text", code: "pc"},
			{name: "PRINCIPLE_FACADE", type: "text", code: "sf"},
			{name: "PRINCIPLE_SITUATIONAL_AWARENESS", type: "text", code: "sa"},
			{name: "PRINCIPLE_OPERATION_INSIGHT", type: "text", code: "oi"},
			{name: "NOTES", type: "textarea", code: "nte"}
		];


	}
}

module.exports = ComponentDal
