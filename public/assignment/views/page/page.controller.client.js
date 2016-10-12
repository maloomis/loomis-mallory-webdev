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
        vm.widgetList = widgetList;
        vm.editPage = editPage;

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

        function widgetList(pageId) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId + "/widget");
        }

        function editPage(pageId) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + pageId);
        }
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        
        vm.backToPageList = backToPageList;
        vm.backToProfile = backToProfile;
        vm.savePage = savePage;

        function backToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function savePage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.init = init;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        vm.deletePage = deletePage;
        vm.backToPageList = backToPageList;
        vm.backToProfile = backToProfile;
        vm.savePage = savePage;

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function backToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function savePage(page) {
            PageService.updatePage(vm.websiteId, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
        
    }
})();