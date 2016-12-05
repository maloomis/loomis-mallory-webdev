module.exports = function() {
    var mongoose = require("mongoose");
    var TrainerSchema = require("./trainer.schema.server.js")();
    var TrainerModel = mongoose.model('TrainerModel', TrainerSchema);

    var api = {
        createTrainer: createTrainer,
        findTrainerByCredentials: findTrainerByCredentials,
        findTrainerById: findTrainerById,
        findTrainers: findTrainers,
        findTrainersByName: findTrainersByName,
        updateTrainer: updateTrainer,
        deleteTrainer: deleteTrainer,
        uploadImage: uploadImage,
        messageTrainer: messageTrainer
    };
    return api;

    function createTrainer(trainer) {
        return TrainerModel.create(trainer);
    }

    function findTrainerByCredentials(username, password) {
        return TrainerModel.find({
            username: username,
            password: password
        });
    }

    function findTrainerById(trainerId) {
        return TrainerModel.findById(trainerId);
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
            message: message,
            client: clientId
        }
        return TrainerModel.update (
            {
                _id: trainerId
            },
            {
                "$push" : {"messages" : message}
            }
        )
    }
}
