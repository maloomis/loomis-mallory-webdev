(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    
    function WidgetListController($location, $routeParams, $sce, WidgetService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);

        vm.init = init;

        function init() {
            vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
        }

        init();

        vm.backToPageList = backToPageList;
        vm.backToProfile = backToProfile;
        vm.newWidget = newWidget;
        vm.trustSrc = trustSrc;

        function backToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function newWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function trustSrc(widgetUrl) {
            var url = $sce.trustAsResourceUrl(widgetUrl);
            return url;
        }
    }
    
    function NewWidgetController() {

    }
    
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.init = init;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);  
        }

        init();

        vm.deleteWidget = deleteWidget;
        vm.editWidget = editWidget;
        vm.backToProfile = backToProfile;
        vm.backToWidgetList = backToWidgetList;
        vm.saveWidget = vm.saveWidget; 

        function deleteWidget() {

        }

        function editWidget(widgetId) {
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function backToWidgetList() {
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/");

        }

        function saveWidget() {

        }
    }
})();