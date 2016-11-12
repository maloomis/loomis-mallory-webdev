var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server.js");

var UserModel = mongoose.model('UserModel', UserSchema);

