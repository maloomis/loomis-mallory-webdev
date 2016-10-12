(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    
    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.init = init;
        vm.backToWebsiteList = backToWebsiteList;
        vm.backToProfile = backToProfile;
        vm.newPage = newPage;

        function init() {
            vm.pageList = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

        function backToWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function editPage() {

        }
    }

    function NewPageController($routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

    }
    function EditPageController() {
        
    }
})();