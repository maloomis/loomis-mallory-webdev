(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(websites) {
                    if (websites != '0') {
                        vm.websiteList = websites;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve websites for user";
                });
        }
        
        init();
    }
    
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.saveSite = saveSite;

        function init() {
            promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(websites) {
                    if (websites != '0') {
                        vm.websiteList = websites;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve websites for user";
                });
        }
        
        init();

        function saveSite(website) {
            promise = WebsiteService.createWebsite(vm.userId, website);
            promise.success(function(result) {
                if (result) {
                    $location.url("/user/" + vm.userId + "/website/");
                }
            })
            .error(function() {
                vm.error = "Could not save website."
            })
            
        }
    }
    
    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.init = init;

        function init() {
            promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(websites) {
                    if (websites != '0') {
                        vm.websiteList = websites;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve websites for user";
                });
            
            promise = WebsiteService.findWebsiteById(vm.websiteId)
                .success(function(website) {
                    if (website != '0') {
                        vm.website = website;
                    }
                })
                .error(function() {
                    vm.error = "Could not retrieve website";
                })
        }
        
        init();
        
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite() {
            promise = WebsiteService.deleteWebsite(vm.websiteId)
                .success(function(result) {
                    if (result) {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function() {
                    vm.error = "Could not update website";
                });
        }

        function updateWebsite(website) {
            promise = WebsiteService.updateWebsite(vm.websiteId, website)
                .success(function(result) {
                    if (result) {
                        $location.url("/user/" + vm.userId + "/website/");
                    }
                })
                .error(function() {
                    vm.error = "Could not update website";
                });
        }
    }
})();