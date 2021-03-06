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
            "deleteWidget" : deleteWidget,
            "sortWidgets" : sortWidgets
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }
        
        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }  

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widget, pageId) {
            var url = "/api/page/" + pageId +  "/widget/" + widget._id;
            return $http.put(url, widget);
        } 

        function deleteWidget(widget, pageId) {
            var url = "/api/page/" + pageId + "/widget/" + widget._id;
            return $http.delete(url, widget);
        }

        function sortWidgets(start, end, pageId) {
            var url ="/api/page/" + pageId + "/widget?start=index1&end=index2";
            url = url
                    .replace("index1", start)
                    .replace("index2", end);
            $http.put(url);
        }
    }
})();