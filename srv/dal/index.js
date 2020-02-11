const components = require("./lib/component-dal"),
compOld = require("./lib/component-olds-dal"),
actOld = require("./lib/activation-old-dal");


module.exports.Version = "0.0.1"

module.exports.ComponentsOld = compOld;
module.exports.Components = components;

module.exports.ActivationsOld = actOld;
