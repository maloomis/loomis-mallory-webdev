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

        function init() {
            promise = PageService.findAllPagesForWebsite(vm.websiteId)
                .success(function(pages) {
                    if (pages != '0') {
                        vm.pageList = pages;
                    }
                    else {
                        vm.error("Could not retrieve pages for website");
                    }
                });
        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;      
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.savePage = savePage;

        function savePage(page) {
            promise = PageService.createPage(vm.websiteId, page);
            promise.success(function(result) {
                if (result == '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
            })
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.init = init;

        function init() {
            promise = PageService.findPageById(vm.pageId)
                .success(function(page) {
                    if (page != '0') {
                        vm.page = page;
                    }
                    else {
                        vm.error = "Could not retrieve page";
                    }
                });
        }

        init();

        vm.deletePage = deletePage;
        vm.savePage = savePage;

        function deletePage(pageId) {
            promise = PageService.deletePage(vm.pageId)
                .success(function(page) {
                    if (page == '0') {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                    else {
                        vm.error = "Could not delete page";
                    }
                });
        }

        function savePage(page) {
            promise = PageService.updatePage(vm.pageId, page)
                .success(function(page) {
                    if (page == '0') {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                    else {
                        vm.error = "Could not save page";
                    }
                });
        }

        
    }
})();