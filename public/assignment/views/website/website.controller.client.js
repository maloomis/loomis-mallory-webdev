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

        function pagelist(website) {
            website = WebsiteService.findWebsiteByName(website.name);
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }
    }
    
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

    }
    
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        } 
    }
})();