(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
       
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
                    ]
        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteByName" : findWebsiteByName,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            var site = {
                "_id" : Math.random(),
                "name" : website.name,
                "developerId" : userId
            };
            websites.push(site);
        }
        
        function findWebsitesByUser(userId) {
            var sites = [];
            for (var x = 0; x < websites.length; x++) {
                var currentWebsite = websites[x];
                if (currentWebsite.developerId == userId) {
                    sites.push(currentWebsite);
                }
            }
            return sites;
        }

        function findWebsiteByName(websiteName) {
            for (var x = 0; x < websites.length; x ++) {
                var website = websites[x];
                if (website.name == websiteName) {
                    return website;
                }
            }
        }
        
        function findWebsiteById(websiteId) {
            for (var x = 0; x < websites.length; x ++) {
                var website = websites[x];
                if (website._id == websiteId) {
                    return website;
                }
            }
        }
        
        function updateWebsite(websiteId, website) {
            for (var x = 0; x < websites.length; x ++) {
                var site = websites[x];
                if (website._id == websiteId) {
                    site.name = website.name;
                    site.description = website.description;
                }
            }

        }
        
        function deleteWebsite(websiteId) {
            for (var x = 0; x < websites.length; x ++) {
                var website = websites[x];
                if (website._id == websiteId) {
                    websites = websites.slice(x,1);
                }
            } 
        }
    }
})();