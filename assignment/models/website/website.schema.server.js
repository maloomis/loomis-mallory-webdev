module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var WebsiteSchema = new Schema({
        _user: { 
            type: Schema.ObjectId,
            ref: 'UserModel'
        },
        name: String,
        description: String,
        pages: [{
            type: Schema.Types.ObjectId, 
            ref: 'PageModel'
        }],
        dateCreated: { type: Date, default: Date.now}
    }, {collection: "website"});
    return WebsiteSchema;
}