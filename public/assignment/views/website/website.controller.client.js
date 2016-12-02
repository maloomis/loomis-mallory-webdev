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
                .success(function(user) {
                    if (user != '0') {
                        vm.websiteList = user.websites;
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
        vm.submitted = false;

        function init() {
            promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.websiteList = user.websites;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve websites for user";
                });
        }
        
        init();

        function saveSite(website) {
            vm.submitted = true;

            if (!website) {
                return;
            }

            if (!website.name) {
                return;
            }

            promise = WebsiteService.createWebsite(vm.userId, website);
            promise.success(function() {
                $location.url("/user/" + vm.userId + "/website/");
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
        vm.submitted = false;

        vm.init = init;

        function init() {
            promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.websiteList = user.websites;
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
            promise = WebsiteService.deleteWebsite(vm.userId, vm.websiteId)
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
            vm.submitted = true;

            if (!website) {
                return;
            }

            if (!website.name) {
                return;
            }

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