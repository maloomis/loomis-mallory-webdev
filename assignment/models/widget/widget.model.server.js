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
        reorderWidget: reorderWidget,
        setModel: setModel,
        deleteWidgetsForPage: deleteWidgetsForPage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        var widgetCount = WidgetModel.count('type');
        var index = 0;
        return WidgetModel
                    .count({}, function(err, count){
                        index = count;
                    })
                    .then(
                        function(err, result) {
                            return WidgetModel.create({
                                    _page: pageId,
                                    type: widget.widgetType,
                                    position: index
                                })
                        }
                    )
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

    function updateWidget(widget, widgetId, pageId) {
        if (widget.type == "HEADER") {
            return updateHeaderWidget(widget, widgetId, pageId);
        }
        if (widget.type == "YOUTUBE") {
            widget.url = widget.url.replace("watch?v=", "v/");
            return updateYoutubeWidget(widget, widgetId, pageId);
        }
        if (widget.type == "IMAGE") {
            return updateImageWidget(widget, widgetId, pageId);
        }
        if (widget.type == "HTML") {
            return updateHTMLWidget(widget, widgetId, pageId);
        }
        if (widget.type == "TEXT") {
            return updateTextWidget(widget, widgetId, pageId);
        }
    }

    function updateHeaderWidget(widget, widgetId, pageId) {
        return WidgetModel
                    .update(
                                {
                                    _id: widgetId
                                }, 
                                {
                                    name: widget.name,
                                    text: widget.text,
                                    size: widget.size,
                                    deletable: true
                                }
                    )
                    .then(
                        function(result) {
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(pageObj){
                                    pageObj.widgets.push(widgetId);
                                    return pageObj.save();
                                })
                        }
                    );
    }

    function updateYoutubeWidget(widget, widgetId, pageId) {
        return WidgetModel
                    .update(
                        {
                            _id: widgetId
                        }, 
                        {
                            name: widget.name,
                            text: widget.text,
                            url: widget.url,
                            width: widget.width,
                            deletable: true
                        }
                    )                    
                    .then(
                        function(result) {
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(pageObj){
                                    pageObj.widgets.push(widgetId);
                                    return pageObj.save();
                                })
                        }
                    );
    }

    function updateImageWidget(widget, widgetId, pageId) {
        return WidgetModel
                    .update(
                        {
                            _id: widgetId
                        }, 
                        {
                            name: widget.name,
                            text: widget.text,
                            url: widget.url,
                            width: widget.width,
                            deletable: true
                        }
                    )
                    .then(
                        function(result) {
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(pageObj){
                                    pageObj.widgets.push(widgetId);
                                    return pageObj.save();
                                })
                        }
                    );
    }

    function updateHTMLWidget(widget, widgetId, pageId) {
        return WidgetModel
                    .update(
                        {
                            _id: widgetId
                        }, 
                        {
                            text: widget.text,
                            deletable: true
                        }
                    )                    
                    .then(
                        function(result) {
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(pageObj){
                                    pageObj.widgets.push(widgetId);
                                    return pageObj.save();
                                })
                        }
                    );
    }

    function updateTextWidget(widget, widgetId, pageId) {
        return WidgetModel
                        .update(
                            {
                                _id: widgetId
                            }, 
                            {
                                text: widget.text,
                                rows: widget.rows,
                                placeholder: widget.placeholder,
                                formatted: widget.formatted,
                                deletable: true,
                                name: widget.name
                            }
                        )
                        .then(
                            function(result) {
                                model.pageModel
                                    .findPageById(pageId)
                                    .then(function(pageObj){
                                        pageObj.widgets.push(widgetId);
                                        return pageObj.save();
                                    })
                            }
                        );
    }

    function deleteWidget(widgetId, pageId) {
        return WidgetModel
                    .remove({_id: widgetId})
                    .then(function() {
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(page) {
                                    var index = page.widgets.indexOf(widgetId);
                                    page.widgets.splice(index, 1);
                                    page.save();
                                })
                    })
                    .then(function(){
                        WidgetModel.find().sort('priority').exec(function(err, widgets) {
                            var p = 0;
                            widgets.forEach(function(widget){
                                widget.position = p;
                                widget.save();
                                p++;
                            })
                        })
                    });
    }

    function deleteWidgetsForPage(pageId) {
        return WidgetModel
                    .find({
                        _page: pageId
                    })
                    .remove()
                    .exec();
    }

    function reorderWidget(start, end) {
        return WidgetModel.find(
            
            function(err, widgets){
                widgets.forEach(function(widget){
                    if (start > end) {
                        if (widget.position >= end && widget.position < start) {
                            widget.position++;
                        } else if (widget.position == start) {
                            widget.position = end;
                        }
                        widget.save();
                    } else {
                        if (widget.position == start) {
                            widget.position = end;
                        } else if (widget.position > start && widget.position <= end) {
                            widget.position--;
                        }
                        widget.save();
                    }
            });
        })

    }

}


