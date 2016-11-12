var mongoose = require("mongoose");
var UserSchema = require("./widget.schema.server.js");

var UserModel = mongoose.model('WidgetModel', WidgetSchema);