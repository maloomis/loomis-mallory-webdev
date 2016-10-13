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
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.userId);
        }
        
        init();
        
        vm.backToProfile = backToProfile;
        vm.editSite = editSite;
        vm.goToPageList = goToPageList;
        vm.newWebsite = newWebsite;
        
        function backToProfile() {
            user = UserService.findUserById(vm.userId);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }

        function goToPageList(siteId) {
            $location.url("/user/" + vm.userId + "/website/" + siteId + "/page");
        }

        function editSite(siteId) {
            $location.url("/user/" + vm.userId + "/website/" + siteId);
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }
    }
    
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.backToWebsiteList = backToWebsiteList;
        vm.goToPageList = goToPageList;
        vm.editSite = editSite;
        vm.profile = profile;
        vm.saveSite = saveSite;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function backToWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function goToPageList(websiteName) {
            site = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + site._id + "/page");
        }

        function editSite(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function saveSite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/" + vm.userId + "/website/");
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