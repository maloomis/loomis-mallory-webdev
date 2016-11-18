module.exports = function (app, model) {
        var mime = require('mime');
        var multer = require('multer'); // npm install multer --save
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, __dirname + '../../../public/assignment/upload');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
            }
        });
        var upload = multer({ storage: storage });

        app.post("/api/page/:pid/widget", createWidget);
        app.get("/api/page/:pid/widget", findAllWidgetsForPage);
        app.get("/api/widget/:wgid", findWidgetById);
        app.put("/api/widget/:wgid", updateWidget);
        app.delete("/api/widget/:wgid", deleteWidget);
        app.post ("/api/upload", upload.single('myFile'), uploadImage);
        app.put("/api/page/:pid/widget", reorderWidget);

        function createWidget(req,res) {
            var pageId = req.params.pid;
            var widget = req.body;
            model
                .widgetModel
                .createWidget(pageId, widget)
                .then(
                    function(newWidget) {
                        res.send(newWidget);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                )
        }

        function findAllWidgetsForPage(req,res) {
            var pageId = req.params.pid;
            model
                .widgetModel
                .findAllWidgetsForPage(pageId)
                .then(
                    function(widgets) {
                        res.send(widgets);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                )
        }

        function findWidgetById(req,res) {
            var widgetId = req.params.wgid;
            model
                .widgetModel
                .findWidgetById(widgetId)
                .then(
                    function(widget) {
                        if (widget) {
                            res.send(widget);
                        }
                        else {
                            res.send('0');
                        }
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                )
        }

        function updateWidget(req,res) {
            var widget = req.body;
            var widgetId = req.params.wgid;
            model
                .widgetModel
                .updateWidget(widget, widgetId)
                .then(
                    function (status) {
                        res.sendStatus(200);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }

        function deleteWidget(req,res) {
            var widgetId = req.params.wgid;
            model
                .widgetModel
                .deleteWidget(widgetId)
                .then(
                    function(status) {
                        res.sendStatus(200);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }
        
        function uploadImage(req, res) {
            console.log(req.body);
            var widgetId      = req.body.widgetId;
            var userId        = req.body.userId;
            var websiteId     = req.body.websiteId;
            var pageId        = req.body.pageId
            var width         = req.body.width;
            var name          = req.body.name;
            var url           = req.body.url;
            var text          = req.body.text;
            var myFile        = req.file;

            var originalname  = myFile.originalname; // file name on user's computer
            var filename      = myFile.filename;
            var path          = myFile.path;         // full path of uploaded file
            var destination   = myFile.destination;  // folder where file is saved to
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;

            var widget = {
                width: width,
                name: name,
                url: "upload/" + filename,
                text: text,
                type: "IMAGE"
            };

            console.log(widget);

            model
                .widgetModel
                .updateWidget(widget, widgetId)
                .then(
                    function(status) {
                        res.redirect('../assignment/index.html#/user/'+ userId +
                            '/website/'+ websiteId +'/page/'+ pageId +'/widget/'+ widgetId);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
    }

    function reorderWidget(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);

        model
            .widgetModel
            .reorderWidget(start, end)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
}