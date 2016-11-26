module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deletePagesForWebsite: deletePagesForWebsite,
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

    function deletePage(pageId, websiteId) {
        return PageModel
                    .remove({_id: pageId})
                    .then(function() {
                            model.websiteModel
                                .findWebsiteById(websiteId)
                                .then(function(website) {
                                    var index = website.pages.indexOf(pageId);
                                    website.pages.splice(index, 1);
                                    website.save();
                                })
                    })
                    .then(function() {
                        model.widgetModel
                            .deleteWidgetsForPage(pageId);
                    });
    }

    function deletePagesForWebsite(websiteId) {
        return PageModel
                    .find({
                        _website: websiteId
                    })
                    .remove()
                    .exec();
    }

}


