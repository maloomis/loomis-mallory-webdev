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
            promise = WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function(result) {
                    if (widgets != '0') {
                        vm.widgets = result;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve widgets for page";
                });
        }

        init();

        vm.trustSrc = trustSrc;

        function trustSrc(widgetUrl) {
            var url = $sce.trustAsResourceUrl(widgetUrl);
            return url;
        }
    }
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);

        vm.backToProfile = backToProfile;
        vm.backToWidgetList = backToWidgetList
        vm.chooseHeaderWidget = chooseHeaderWidget;
        vm.chooseImageWidget = chooseImageWidget;
        vm.chooseYouTubeWidget = chooseYouTubeWidget;

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function backToWidgetList() {
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/");

        }

        function chooseHeaderWidget() {
            var widget = WidgetService.createWidget(vm.pageId, "HEADER");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + 
            "/page/" + vm.pageId + "/widget/" + widget._id);

        }

        function chooseImageWidget() {
            var widget = WidgetService.createWidget(vm.pageId, "IMAGE");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + 
            "/page/" + vm.pageId + "/widget/" + widget._id);

        }

        function chooseYouTubeWidget() {
            var widget = WidgetService.createWidget(vm.pageId, "YOUTUBE");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + 
            "/page/" + vm.pageId + "/widget/" + widget._id);   
        }
    }
    
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        vm.init = init;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);  
        }

        init();

        vm.deleteWidget = deleteWidget;
        vm.backToProfile = backToProfile;
        vm.backToWidgetList = backToWidgetList;
        vm.saveWidget = saveWidget; 

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function backToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function backToWidgetList() {
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/");

        }

        function saveWidget(widget) {
            WidgetService.updateWidget(widget);
            $location.url("/user/" + vm.userId + "/website/" + 
            vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }
    }
})();