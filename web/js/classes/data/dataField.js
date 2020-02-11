import { isNullOrUndefined } from "util";

class DataField {
    constructor(options) {
        if (!options) options = {}

        this._name= options.name; //: "id-DONT_ENTER", 
        this._dataType= options.dataType || "string"; // "int",

        this._fldCode= options.fldCode; // "id", 
        this._canEdit= options.canEdit || true; // false, 
        this._css= options.css || "fld-text"; // "fld-id", 
        this._group= options.grp; // 1,
        this._label= options.label; //"Id"

        this._originalValue = options.value;
        this._value = options.value;
        this._dirty = false;   
    }
    get name() { return this._name; }
    get dataType() { return this._dataType; }
    get fldCode() { return this._fldCode; }

    get canEdit() { return this._canEdit; }
    set canEdit(val) { this._canEdit = val; }

    get css() { return this._css; }
    set css(val) { this._css = val; }

    get group() { return this._group; }
    set group(val) { this._group = val; }

    get label() { return this._label; }
    set label(val) { this._label = val; }

    get value() { return this._value; }
    set value(val) { 
        this._value = val; 
        this._dirty = true;
    }
    get originalValue() { return this._originalValue; }

    get dirty() { return this._dirty; }

    resetValue() {
        this._value = this._originalValue; 
        this._dirty = false;
    }
    updateValue(val) {
        if (isNullOrUndefined(val)) val = this._originalValue;
        this._value = val;
        this._originalValue = val; 
        this._dirty = false;
    }
}

export default DataField;