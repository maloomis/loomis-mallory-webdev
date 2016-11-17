(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    
    function WidgetListController($location, $routeParams, $sce, WidgetService) {
        var vm = this;

        vm.userId =$routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.init = init;

        function init() {
            var promise = WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function(data) {
                    if (data != '0') {
                        vm.widgets = data;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve widgets for page";
                });
        };

        init();

        vm.trustSrc = trustSrc;

        function trustSrc(widgetUrl) {
            var url = $sce.trustAsResourceUrl(widgetUrl);
            return url;
        }
    }
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widget = {};

        vm.chooseHeaderWidget = chooseHeaderWidget;
        vm.chooseImageWidget = chooseImageWidget;
        vm.chooseYouTubeWidget = chooseYouTubeWidget;

        function chooseHeaderWidget() {
            vm.widget.widgetType = "HEADER";
            promise = WidgetService.createWidget(vm.pageId, vm.widget);
            promise.success(function(widget) {
                console.log(widget);
                if (widget != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                    "/page/" + vm.pageId + "/widget/" + widget._id);
                } else {
                    vm.error = "Could not create Header Widget";
                }
            });
        }

        function chooseImageWidget() {
            vm.widget.widgetType = "IMAGE";
            promise = WidgetService.createWidget(vm.pageId, vm.widget);
            promise.success(function(widget) {
                if (widget != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                    "/page/" + vm.pageId + "/widget/" + widget._id);
                } else {
                    vm.error = "Could not create Header Widget";
                }
            });
        }

        function chooseYouTubeWidget() {
            vm.widget.widgetType = "YOUTUBE";
            promise = WidgetService.createWidget(vm.pageId, vm.widget);
            promise.success(function(widget) {
                if (widget != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                    "/page/" + vm.pageId + "/widget/" + widget._id);
                } else {
                    vm.error = "Could not create Header Widget";
                }
            });   
        }
    }
    
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.init = init;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId)
                .success(function(widget) {
                    if (widget != '0') {
                        vm.widget = widget;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve widget";
                });
        }

        init();

        vm.deleteWidget = deleteWidget;
        vm.saveWidget = saveWidget; 

        function deleteWidget(widget) {
            var promise = WidgetService.deleteWidget(widget)
                .success(function(result) {
                    if (result) {
                        $location.url("/user/" + vm.userId + "/website/" + 
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                    else {
                        vm.error("Could not update widget");
                    }
                });
        }

        function saveWidget(widget) {
            var promise = WidgetService.updateWidget(widget)
                .success(function(widget) {
                    if (widget != '0') {
                        vm.widget = widget;
                        $location.url("/user/" + vm.userId + "/website/" + 
                        vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                    else {
                        vm.error("Could not update widget");
                    }
                });
        }
    }
})();