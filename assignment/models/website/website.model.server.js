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

    function findAllWebsitesForUser() {

    }

    function findWebsiteById() {

    }

    function updateWebsite() {

    }

    function deleteWebsite() {

    }

}


