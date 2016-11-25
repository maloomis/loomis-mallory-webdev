module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(username, password) {
        return UserModel
                    .find({
                        username: username,
                        password: password
                    })
                    .populate('websites');
    }

    function findUserById(userId) {
        return UserModel
                    .findById(userId)
                    .populate('websites')
                    .exec(function(err, user){
                        if (err) return handleError(err);
                        console.log("The user is " + user);
                    });
    }

    function updateUser(user, userId) {
        return UserModel
                    .update(
                        {
                            _id: userId
                        }, 
                        {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone
                        }
                    )
                    .populate('websites');
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
}
