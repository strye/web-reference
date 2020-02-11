const mysqlBase = require('./mysql-base');

class ComponentDal extends mysqlBase {
	constructor (options) {
		// if (!options) options = {};
		// options.table = "foundational_components"
		// options.key = "id"
		// console.log(options);
		super(options);

		this._tableName = "component_targets"
		this._keyName = "Id"

		this._fieldList = [
			{name: "Id", type: "int", code: "id"},
			{name: "FoundationType", type: "text", code: "typ"},
			{name: "Foundation", type: "text", code: "fnd"},
			{name: "FoundationComponent", type: "text", code: "cmp"},

            {name: "CasId",            type: "int",        code: "cas", canEdit: false},
            {name: "FY",            type: "text",       code: "id", canEdit: false},
            {name: "Type",          type: "int",        code: "id", canEdit: false},

            {name: "OmniChannel", type: "text", code: "oc"},
			{name: "ConsumerEngagement", type: "text", code: "ce"},
			{name: "ResponsiveValueChain", type: "text", code: "rc"},
			{name: "PredictiveCulture", type: "text", code: "pc"},
			{name: "StableFacade", type: "text", code: "sf"},
			{name: "SituationalAwareness", type: "text", code: "sa"},
			{name: "ClosedLoopAnalytics", type: "text", code: "oi"},

            {name: "ChangeStory",   type: "textarea",   code: "id", canEdit: false},

        ];


	}
}

module.exports = ComponentDal
