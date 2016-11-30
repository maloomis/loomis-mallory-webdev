module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var RecipeSchema = new Schema({
        id: String,   
        comments: [{
                    comment: String,
                    client: {
                        type: mongoose.Schema.ObjectId,
                        ref: 'ClientModel'
                }
        }],
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "recipe"});
        return RecipeSchema;
}