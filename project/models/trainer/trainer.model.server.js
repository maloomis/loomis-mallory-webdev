module.exports = function() {
    var mongoose = require("mongoose");
    var TrainerSchema = require("./trainer.schema.server.js")();
    var TrainerModel = mongoose.model('TrainerModel', TrainerSchema);

    var api = {
        createTrainer: createTrainer,
        findTrainerByCredentials: findTrainerByCredentials,
        findTrainerById: findTrainerById,
        updateTrainer: updateTrainer,
        deleteTrainer: deleteTrainer
    };
    return api;

    function createTrainer(trainer) {
        return TrainerModel.create(trainer);
    }

    function findTrainerByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findTrainerById(trainerId) {
        return TrainerModel.findById(trainerId);
    }

    function updateTrainer(user, userId) {
        return UserModel.update(
            {
                _id: userId
            }, 
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        );
    }

    function deleteTrainer(userId) {
        return UserModel.remove({_id: userId});
    }
}
