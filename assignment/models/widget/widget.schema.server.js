module.exports = function() {
    var mongoose = require("mongoose");
    var autoIncrement = require('mongoose-auto-increment');
    var Schema = mongoose.Schema;

    var WidgetSchema = new Schema({
         _page: { 
            type: Schema.ObjectId,
            ref: 'PageSchema'
        },
        type: { type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'] },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        priority: Number,
        dateCreated: { type: Date, default: Date.now}
    }, {collection: "widget"});
    WidgetSchema.index({_id: 1}, {unique: true});
    return WidgetSchema;
}