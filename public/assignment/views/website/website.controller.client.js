(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.backToProfile = backToProfile;
        vm.newWebsite = newWebsite;
        vm.pageList = pageList;
        vm.editSite = editSite;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.userId);
        }
        
        init();

        function backToProfile() {
            user = UserService.findUserById(vm.userId);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function pageList(siteId) {
            $location.url("/user/" + vm.userId + "/website/" + siteId + "/page");
        }

        function editSite(siteId) {
            $location.url("/user/" + vm.userId + "/website/" + siteId);
        }
    }
    
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.backToWebsiteList = backToWebsiteList;
        vm.pageList = pageList;
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

        function pageList(websiteName) {
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
        vm.init = init;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.backToWebsiteList = backToWebsiteList;
        vm.profile = profile;
        vm.pageList = pageList;
        vm.editSite = editSite;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.userId + "/website/");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        } 

        function backToWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageList(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editSite(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }
    }
})();