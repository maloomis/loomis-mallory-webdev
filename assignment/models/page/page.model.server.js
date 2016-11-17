module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        return PageModel.create({
            _website: websiteId,
            name: page.name,
            title: page.title,
            description: page.description
        });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({
            _website: websiteId
        });
    }

    function findPageById(pageId) {
        return PageModel
                .findById(pageId);
    }

    function updatePage(page, pageId) {
        return PageModel.update(
            {
                _id: pageId
            }, 
            {
                name: page.name,
                title: page.title,
                description: page.description
            }
        );

    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }

}


