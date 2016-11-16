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
        return ClientModel.find({
            username: username,
            password: password
        });
    }

    function findClientById(clientId) {
        return ClientModel.findById(clientId);
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
}
