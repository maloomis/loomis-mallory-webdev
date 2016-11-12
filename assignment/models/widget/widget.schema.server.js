var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    _page: { 
        type: Schema.ObjectId,
        ref: 'PageSchema'
    },
    type: {
        type: String, 
        enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
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
    dateCreated: { type: Date, default: Date.now}
});

module.exports = {
    WidgetSchema: WidgetSchema
}