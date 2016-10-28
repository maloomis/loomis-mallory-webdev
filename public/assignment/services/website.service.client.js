(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
       
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
                if (site._id == websiteId) {
                    site.name = website.name;
                    site.description = website.description;
                }
            }

        }
        
        function deleteWebsite(websiteId) {
            for (var x = 0; x < websites.length; x ++) {
                var website = websites[x];
                if (website._id == websiteId) {
                    websites.splice(x,1);
                }
            } 
        }
    }
})();