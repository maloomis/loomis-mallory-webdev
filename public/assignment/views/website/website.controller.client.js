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
                if (result == '0') {
                    $location.url("/user/" + vm.userId + "/website/");
                }
            });
        }
    }
    
    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.init = init;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        
        init();
        
        vm.backToProfile = backToProfile;
        vm.backToWebsiteList = backToWebsiteList;
        vm.deleteWebsite = deleteWebsite;
        vm.editSite = editSite;
        vm.goToPageList = goToPageList;
        vm.updateWebsite = updateWebsite;

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function backToWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function editSite(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        } 

        function goToPageList(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.userId + "/website/");
        }
    }
})();