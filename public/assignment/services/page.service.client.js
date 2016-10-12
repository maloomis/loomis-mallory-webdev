(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
                        ];
        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        
        return api;

        function createPage(websiteId, page) {

        }

        function findPageByWebsiteId(websiteId) {
            var pgs = [];
            for (var x = 0; x < pages.length; x ++) {
                var page = pages[x];
                if (page.websiteId == websiteId) {
                    pgs.push(page);
                }
            }
            return pgs;
        }

        function findPageById(pageId) {

        }
        function updatePage(pageId, page) {

        }
        function deletePage(pageId) {

        }
    }
})();