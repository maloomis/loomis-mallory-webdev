(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            "createWidget" : createWidget,
            "findAllWidgetsForPage" : findAllWidgetsForPage,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;
        
        function createWidget(pageId, widgetType) {
            var widget = {
                "_id" : Math.floor(Math.random() * 20),
                "widgetType" : widgetType,
                "pageId" : pageId,
            }
            widgets.push(widget);
            return widget;
        }
        
        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }
        
        function findWidgetById(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                var widget = widgets[i];
                if (widget._id == widgetId) {
                    return widget;
                }
            }
        }
        
        function updateWidget(widget) {
            var updateWidget = findWidgetById(widget._id);
            if (widget.widgetType == "HEADER") {
                updateWidget.name = widget.name;
                updateWidget.size = widget.size;
                updateWidget.text = widget.text;
            }

            if (widget.widgetType == "IMAGE") {
                updateWidget.name = widget.name;
                updateWidget.width = widget.width;
                updateWidget.text = widget.text;
                updateWidget.url = widget.url;
            }

            if (widget.widgetType == "YOUTUBE") {
                updateWidget.name = widget.name;
                updateWidget.width = widget.width;
                updateWidget.text = widget.text;
                updateWidget.url = widget.url;
            }
        }
        
        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            widgets.splice(widgets.indexOf(widget), 1);
        }
    }
})();