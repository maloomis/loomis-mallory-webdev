(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {
       
        var api = {
            "createWebsite" : createWebsite,
            "findAllWebsitesForUser" : findAllWebsitesForUser,
            "findWebsiteByName" : findWebsiteByName,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            var url = '/api/user/' + userId + '/website';
            return $http.post(url, website);
        }
        
        function findAllWebsitesForUser(userId) {
            var url = '/api/user/' + userId + '/website';
            return $http.get(url);
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