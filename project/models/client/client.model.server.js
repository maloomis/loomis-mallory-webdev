module.exports = function() {
    var mongoose = require("mongoose");
    var ClientSchema = require("./client.schema.server.js")();
    var ClientModel = mongoose.model('ClientModel', ClientSchema);

    var api = {
        createClient: createClient,
        findClientByCredentials: findClientByCredentials,
        findClientById: findClientById,
        updateClient: updateClient,
        deleteClient: deleteClient
    };
    return api;

    function createClient(client) {
        return ClientModel.create(client);
    }

    function findClientByCredentials(username, password) {
        console.log(username);
        console.log(password);
        return ClientModel.find({
            username: username,
            password: password
        });
    }

    function findClientById(userId) {
        return UserModel.findById(userId);
    }

    function updateClient(user, userId) {
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

    function deleteClient(userId) {
        return UserModel.remove({_id: userId});
    }
}
