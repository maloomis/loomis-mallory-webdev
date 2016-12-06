module.exports = function() {
    var mongoose = require("mongoose");
    var ClientSchema = require("./client.schema.server.js")();
    var ClientModel = mongoose.model('ClientModel', ClientSchema);

    var api = {
        createClient: createClient,
        findClientByUsername: findClientByUsername,
        findClientById: findClientById,
        updateClient: updateClient,
        deleteClient: deleteClient,
        uploadImage: uploadImage,
        favoriteRecipe: favoriteRecipe,
        unfavoriteRecipe: unfavoriteRecipe,
        followTrainer: followTrainer,
        unfollowTrainer: unfollowTrainer,
        messageClient: messageClient,
        deleteMessage: deleteMessage
    };
    return api;

    function createClient(client) {
        return ClientModel.create(client);
    }

    function findClientByUsername(username) {
        return ClientModel.findOne({
            username: username
        });
    }

    function findClientById(clientId) {
        var populateQuery = [{path:'favoriteRecipes'}, 
                            {path:'trainers', select: 'username'}, 
                            {path:'messages.trainer'}];
        return ClientModel.findById(clientId).populate(populateQuery).exec();
    }

    function updateClient(client, clientId) {
        return ClientModel.update(
            {
                _id: clientId
            }, 
            {
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                weight: client.weight,
                heightFeet: client.heightFeet, 
                heightInches: client.heightInches,
                fitnessGoal: client.fitnessGoal,  
            }
        );
    }

    function deleteClient(clientId) {
        return ClientModel.remove({_id: clientId});
    }

    function uploadImage(clientId, fileName) {
        return ClientModel.update (
            {
                _id: clientId
            }, 
            {
                img: "upload/" + fileName
            }
        );
    }

    function favoriteRecipe(clientId, recipeId) {
        return ClientModel.update(
            {
                _id: clientId
            }, 
            {
                "$push": {"favoriteRecipes" : recipeId }
            }
        );
    }

    function unfavoriteRecipe(clientId, recipeId) {
        return ClientModel.update(
            {
                _id: clientId
            },
            {
                $pull: { 'favoriteRecipes':  recipeId } 
            }
        );
    }

    function followTrainer(clientId, trainerId) {
        return ClientModel.update(
            {
                _id: clientId
            },
            {
                "$push": {"trainers": trainerId}
            }
        )
    }

    function unfollowTrainer(clientId, trainerId) {
        return ClientModel.update(
            {
                _id: clientId
            },
            {
                $pull: {"trainers": trainerId}
            }
        )
    }

    function messageClient(message, trainerId, clientId) {
        var message = {
            message: message.text,
            trainer: trainerId
        }
        return ClientModel.update (
            {
                _id: clientId
            },
            {
                "$push" : {"messages" : message}
            }
        )
    }

    function deleteMessage(messageId, clientId) {
        return ClientModel.update(
            {
                _id: clientId
            },
            {
                $pull: { 'messages':  {_id: messageId} }
            }
        )
    }
}
