module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        findWidgetsForPage: findWidgetsForPage,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return PageModel
                    .create(page)
                    .then(function(pageObj) {
                        model.websiteModel
                            .findWebsiteById(websiteId)
                            .then(function(websiteObj) {
                                websiteObj.pages.push(pageObj);
                                pageObj._website = websiteObj._id;
                                pageObj.save();
                                return websiteObj.save();
                            })
                });
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        return PageModel
                .findById(pageId);
    }

    function findWidgetsForPage(pageId) {
        return PageModel.findById(pageId).populate("widgets", "name").exec();
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
        return PageModel
                    .remove({_id: pageId})
                    /*
                    .then(function() {
                            model.websiteModel
                                .findWebsiteById(websiteId)
                                .then(function(user) {
                                    var index = user.websites.indexOf(websiteId);
                                    user.websites.splice(index, 1);
                                    user.save();
                                })
                    });
                    */
    }

}


