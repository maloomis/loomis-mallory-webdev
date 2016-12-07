module.exports = function() {
    var mongoose = require("mongoose");
    var TrainerSchema = require("./trainer.schema.server.js")();
    var TrainerModel = mongoose.model('TrainerModel', TrainerSchema);

    var api = {
        createTrainer: createTrainer,
        findTrainerByUsername: findTrainerByUsername,
        findTrainerById: findTrainerById,
        findTrainers: findTrainers,
        findTrainersByName: findTrainersByName,
        updateTrainer: updateTrainer,
        deleteTrainer: deleteTrainer,
        uploadImage: uploadImage,
        messageTrainer: messageTrainer,
        deleteMessage: deleteMessage,
        addClient: addClient,
        removeClient: removeClient
    };
    return api;

    function createTrainer(trainer) {
        trainer.type = 'trainer';
        return TrainerModel.create(trainer);
    }

    function findTrainerByUsername(username) {
        return TrainerModel.findOne({
            username: username
        });
    }

    function findTrainerById(trainerId) {
        var populateQuery = [{path:'messages.client'}, 
                    {path:'clients'}];
        return TrainerModel.findById(trainerId).populate(populateQuery).exec();
    }

    function findTrainers() {
        return TrainerModel.find();
    }

    function findTrainersByName(trainerFirstName, trainerLastName) {
        return TrainerModel.find({
            firstName: trainerFirstName,
            lastName: trainerLastName
        })
    }

    function updateTrainer(trainer) {
        return TrainerModel.update(
            {
                _id: trainer._id
            }, 
            {
                firstName: trainer.firstName,
                lastName: trainer.lastName,
                email: trainer.email
            }
        );
    }

    function deleteTrainer(trainerId) {
        return TrainerModel.remove({_id: trainerId});
    }

    function uploadImage(trainerId, fileName) {
        return TrainerModel.update (
            {
                _id: trainerId
            }, 
            {
                img: "upload/" + fileName
            }
        );
    }

    function messageTrainer(message, trainerId, clientId) {
        var message = {
            message: message.text,
            client: clientId
        };
        return TrainerModel.update (
            {
                _id: trainerId
            },
            {
                "$push" : {"messages" : message}
            }
        );
    }

    function deleteMessage(trainerId, messageId) {
        return TrainerModel.update(
            {
                _id: trainerId
            },
            {
                $pull: { 'messages':  {_id: messageId} }
            }
        );
    }

    function addClient(clientId, trainerId) {
        return TrainerModel.update(
            {
                _id: trainerId
            },
            {
                $push: { 'clients':  clientId }
            }
        );
    }

    function removeClient(clientId, trainerId) {
        return TrainerModel.update(
            {
                _id: trainerId
            },
            {
                $pull: { 'clients': clientId }
            }
        )
    }
}
