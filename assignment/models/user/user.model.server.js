module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js");

    var UserModel = mongoose.model('Users', UserSchema);
}
