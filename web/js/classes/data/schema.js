export default { 
    atech: { 
        keyField: "id-DONT_ENTER",
        fields: [
            {name: "id-DONT_ENTER", type: "int", required: false,                       code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "TI", type: "text", required: true,                                  code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "ACTIVATION", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "ACTIVATION_RELEASE_DATE", type: "text", required: false,            code: "actrd", canEdit: true, class: "fld-dt", grp: "act",      label:"Release Date"},

            {name: "FOUNDATION_FEATURE", type: "text", required: true,                  code: "fnd", canEdit: true, class: "fld-text", grp: "fnd",      label:"Foundation"},
            {name: "FOUNDATION_FEATURE_SUBCOMPONENT", type: "text", required: true,     code: "cmp", canEdit: true, class: "fld-text", grp: "fnd",      label:"Component"},
            {name: "FOUNDATION_FEATURE_NEED_BY_DATE", type: "text", required: false,     code: "cmpnbd", canEdit: true, class: "fld-dt", grp:"fnd",      label:"Component Needed By"},
            {name: "IS_DELIVERY", type: "text", required: false,                        code: "dlvr", canEdit: true, class: "fld-bool", grp: "fnd",      label:"Will Deliver"},
            {name: "HAS_DEPENDENCY", type: "text", required: false,                     code: "dpnd", canEdit: true, class: "fld-bool", grp: "fnd",      label:"Dependant On"},
            {name: "NEED_BY_DATE", type: "text", required: false,                       code: "nbd", canEdit: true, class: "fld-dt", grp: "fnd",        label:"Need By Date"},

            {name: "BUCKET", type: "text", required: false,                             code: "bkt", canEdit: true, class: "fld-num", grp: "bkt",             label:"Bucket"},
            {name: "BUCKET_CONTEXT", type: "textarea", required: false,                 code: "bktcntx", canEdit: true, class: "fld-ta", grp: "bkt",      label:"Bucket Context"},

            {name: "BIZ_STRAT_ALIGNMENT_PRIORITY", type: "textarea", required: false,   code: "bsapri", canEdit: true, class: "fld-num", grp: "bsa",      label:"Priority"},
            {name: "BIZ_STRAT_ALIGNMENT_CONTEXT", type: "textarea", required: false,    code: "bsacntx", canEdit: true, class: "fld-ta", grp: "bsa",      label:"Alignment Context"},

            {name: "TECH_ALIGNMENT_PRIORITY", type: "textarea", required: false,        code: "tapri", canEdit: true, class: "fld-num", grp: "tsa",      label:"Priority"},
            {name: "TECH_ALIGNMENT_CONTEXT", type: "textarea", required: false,         code: "tacntx", canEdit: true, class: "fld-ta", grp: "tsa",      label:"Alignment Context"},

            {name: "SEQ_ALIGNMENT_PRIORITY", type: "textarea", required: false,         code: "sapri", canEdit: true, class: "fld-num", grp: "ssa",      label:"Priority"},
            {name: "SEQ_ALIGNMENT_CONTEXT", type: "textarea", required: false,          code: "sacntx", canEdit: true, class: "fld-ta", grp: "ssa",      label:"Alignment Context"},

            {name: "DELTA", type: "textarea", required: false,                          code: "delta", canEdit: true, class: "fld-num", grp: "dlt",      label:"Delta"}
        ]
    },
    components: { 
        keyField: "id_comp-DONT_ENTER",
        fields: [
            {name: "id_comp-DONT_ENTER", type: "int",                   code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "THREAD_AREA", type: "text",                         code: "typ", canEdit: true, class: "fld-text", grp: "fnd",        label:"Id"},
            {name: "FOUNDATION_FEATURE", type: "text",                  code: "fnd", canEdit: true, class: "fld-text", grp: "fnd",        label:"Id"},
            {name: "FOUNDATION_FEATURE_SUBCOMPONENT", type: "text",     code: "cmp", canEdit: true, class: "fld-text", grp: "fnd",        label:"Id"},
            
            {name: "FY20_PRIORITY", type: "text",                       code: "pri", canEdit: true, class: "fld-num", grp: "trg",        label:"Id"},
            
            {name: "PIVOT_OMNI_CHANNEL", type: "text",                  code: "oc", canEdit: true, class: "fld-num", grp: "pvt",        label:"Id"},
            {name: "PIVOT_CONSUMER_ENGAGEMENT", type: "text",           code: "ce", canEdit: true, class: "fld-num", grp: "pvt",        label:"Id"},
            {name: "PIVOT_RESPONSIVE_CHAIN", type: "text",              code: "rc", canEdit: true, class: "fld-num", grp: "pvt",        label:"Id"},
            {name: "PIVOT_CULTURE", type: "text",                       code: "pc", canEdit: true, class: "fld-num", grp: "pvt",        label:"Id"},
            
            {name: "PRINCIPLE_FACADE", type: "text",                    code: "sf", canEdit: true, class: "fld-num", grp: "prn",        label:"Id"},
            {name: "PRINCIPLE_SITUATIONAL_AWARENESS", type: "text",     code: "sa", canEdit: true, class: "fld-num", grp: "prn",        label:"Id"},
            {name: "PRINCIPLE_OPERATION_INSIGHT", type: "text",         code: "oi", canEdit: true, class: "fld-num", grp: "prn",        label:"Id"},
            
            {name: "NOTES", type: "textarea",                           code: "nte", canEdit: true, class: "fld-ta", grp: "nte",        label:"Id"}
        ]
    }
}