module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        findPagesForWebsite: findPagesForWebsite,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deleteWebsitesForUser: deleteWebsitesForUser,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsite(uid, website) {
        return WebsiteModel
                    .create(website)
                    .then(function(websiteObj) {
                        model.userModel
                            .findUserById(uid)
                            .then(function(userObj) {
                                userObj.websites.push(websiteObj);
                                websiteObj._user = userObj._id;
                                websiteObj.save();
                                return userObj.save();
                            })
                    });
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel
                .findById(websiteId);
    }

    function findPagesForWebsite(websiteId) {
        return WebsiteModel.findById(websiteId).populate("pages", "name").exec();
    }

    function updateWebsite(website, websiteId) {
        return WebsiteModel.update(
            {
                _id: websiteId
            }, 
            {
                name: website.name,
                description: website.description
            }
        );

    }

    function deleteWebsite(userId, websiteId) {
        return WebsiteModel
                    .remove({_id: websiteId})
                    .then(function() {
                            model.userModel
                                .findUserById(userId)
                                .then(function(user) {
                                    var index = user.websites.indexOf(websiteId);
                                    user.websites.splice(index, 1);
                                    user.save();
                                })
                    })
                    .then(function() {
                        model.pageModel
                            .deletePagesForWebsite(websiteId);
                    });
    }

    function deleteWebsitesForUser(userId) {
        return WebsiteModel
            .find({
                _user: userId
            })
            .remove()
            .exec();
    }
}


