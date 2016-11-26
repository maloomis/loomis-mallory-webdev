module.exports = function() {
    var mongoose = require("mongoose");
    var autoIncrement = require("mongoose-auto-increment")
    var WidgetSchema = mongoose.Schema({
         _page: { 
            type: mongoose.Schema.ObjectId,
            ref: 'PageModel'
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
        dateCreated: { type: Date, default: Date.now}
    }, {collection: "widget"});
    WidgetSchema.plugin(autoIncrement.plugin, {
        model: 'WidgetModel',
        field: 'priority',
        startAt: 0
    });
    return WidgetSchema;
}