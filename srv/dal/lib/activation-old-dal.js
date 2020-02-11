const mysqlBase = require('./mysql-base');

class ComponentDal extends mysqlBase {
	constructor (options) {
		if (!options) options = {};
		options.database = "activation_analysis_round_2"

        super(options);

		this._tableName = "activation_feature_analysis"
        this._keyName = "id-DONT_ENTER"
        this._sortDefault = "`ACTIVATION`, `FOUNDATION_FEATURE`, `FOUNDATION_FEATURE_SUBCOMPONENT`"

		this._fieldList = [
            {name: "id-DONT_ENTER", type: "int",                        code: "id", canEdit: false},
            {name: "TI", type: "text",                                  code: "ti", canEdit: true},
            {name: "ACTIVATION", type: "text",                          code: "act", canEdit: true},
            {name: "ACTIVATION_RELEASE_DATE", type: "text",             code: "actrd", canEdit: true},
            {name: "FOUNDATION_FEATURE", type: "text",                  code: "fnd", canEdit: true},
            {name: "FOUNDATION_FEATURE_SUBCOMPONENT", type: "text",     code: "cmp", canEdit: true},
            {name: "FOUNDATION_FEATURE_NEED_BY_DATE", type: "text",     code: "cmpnbd", canEdit: true},
            {name: "IS_DELIVERY", type: "text",                         code: "dlv", canEdit: true},
            {name: "HAS_DEPENDENCY", type: "text",                      code: "dep", canEdit: true},
            {name: "NEED_BY_DATE", type: "text",                        code: "nbd", canEdit: true},
            {name: "BUCKET", type: "text",                              code: "bkt", canEdit: true},
            {name: "BUCKET_CONTEXT", type: "textarea",                      code: "bktcntx", canEdit: true},
            {name: "BIZ_STRAT_ALIGNMENT_PRIORITY", type: "textarea",        code: "bsapri", canEdit: true},
            {name: "BIZ_STRAT_ALIGNMENT_CONTEXT", type: "textarea",         code: "bsacntx", canEdit: true},
            {name: "TECH_ALIGNMENT_PRIORITY", type: "textarea",             code: "tapri", canEdit: true},
            {name: "TECH_ALIGNMENT_CONTEXT", type: "textarea",              code: "tacntx", canEdit: true},
            {name: "SEQ_ALIGNMENT_PRIORITY", type: "textarea",              code: "sasapri", canEdit: true},
            {name: "SEQ_ALIGNMENT_CONTEXT", type: "textarea",               code: "sacntx", canEdit: true},
            {name: "DELTA", type: "textarea",                           code: "delta", canEdit: true}
        ];


	}
}

module.exports = ComponentDal
