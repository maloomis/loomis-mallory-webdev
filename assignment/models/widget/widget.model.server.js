module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        return WidgetModel.create({
            _page: pageId,
            type: widget.widgetType
        }
);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({
            _page: pageId
        });
    }

    function findWidgetById(widgetId) {
        return WidgetModel
                .findById(widgetId);
    }

    function updateWidget(widget, widgetId) {
        if (widget.type == "HEADER") {
            return updateHeaderWidget(widget, widgetId);
        }
        if (widget.type == "YOUTUBE") {
            widget.url = widget.url.replace("watch?v=", "v/");
            return updateYoutubeWidget(widget, widgetId);
        }
        if (widget.type == "IMAGE") {
            return updateImageWidget(widget, widgetId);
        }
    }

    function updateHeaderWidget(widget, widgetId) {
        return WidgetModel.update(
            {
                _id: widgetId
            }, 
            {
                name: widget.name,
                text: widget.text,
                size: widget.size,
                deletable: true,
                formatted: true
            }
        );
    }

    function updateYoutubeWidget(widget, widgetId) {
        return WidgetModel.update(
            {
                _id: widgetId
            }, 
            {
                name: widget.name,
                text: widget.text,
                url: widget.url,
                width: widget.width,
                deletable: true,
                formatted: true
            }
        );
    }

    function updateImageWidget(widget, widgetId) {
        return WidgetModel.update(
            {
                _id: widgetId
            }, 
            {
                name: widget.name,
                text: widget.text,
                url: widget.url,
                width: widget.width,
                deletable: true,
                formatted: true
            }
        );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    function reorderWidget() {

    }

}


