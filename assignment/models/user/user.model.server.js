module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsite: addWebsite
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(user, userId) {
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

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function addWebsite(userId, website) {
        return UserModel.update(
            {
                _id: userId
            },
            { $push:
                {"websites": {            
                        _user: userId,
                        name: website.name,
                        description: website.description
                    }
                }
            },
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        );
    }
}
