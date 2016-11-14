module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var WebsiteSchema = new Schema({
        _user: { 
            type: Schema.ObjectId,
            ref: 'UserSchema'
        },
        name: String,
        description: String,
        pages: ['PageSchema'],
        dateCreated: { type: Date, default: Date.now}
    }, {collection: "website"});
    return WebsiteSchema;
}