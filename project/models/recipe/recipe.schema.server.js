module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var RecipeSchema = new Schema({
        title: String,   
        comment: [String],
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "recipe"});
        return RecipeSchema;
}