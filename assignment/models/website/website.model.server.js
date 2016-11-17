module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(uid, website) {
        return WebsiteModel.create({
            _user: uid,
            name: website.name,
            description: website.description
        });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({
            _user: userId
        });
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel
                .findById(websiteId)
                .populate('pages');
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

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

}


