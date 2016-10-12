(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    
    function PageListController($routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        $location.url("/user/" + vm.userId + "/websites/")
    }

    function NewPageController() {

    }
    function EditPageController() {
        
    }
})();