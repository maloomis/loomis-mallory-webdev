(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.backtoprofile = backtoprofile;
        vm.newwebsite = newwebsite;
        vm.pagelist = pagelist;
        vm.editsite = editsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function backtoprofile() {
            user = UserService.findUserById(vm.userId);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }

        function newwebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function pagelist(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editsite(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }
    }
    
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websitelist = websitelist;
        vm.pagelist = pagelist;
        vm.editsite = editsite;
        vm.profile = profile;
        vm.savesite = savesite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function websitelist() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function pagelist(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editsite(websiteName) {
            website = WebsiteService.findWebsiteByName(websiteName);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function savesite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/" + vm.userId + "/website/");
        }

    }
    
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.init = init;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        } 
    }
})();