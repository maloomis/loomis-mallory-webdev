module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var PageSchema = new Schema({
        _website: { 
            type: Schema.ObjectId,
            ref: 'WebsiteSchema'
        },
        name: String,
        title: String,
        description: String,
        widgets: ['WidgetSchema'],
        dateCreated: { type: Date, default: Date.now}
    });
    return PageSchema;
}