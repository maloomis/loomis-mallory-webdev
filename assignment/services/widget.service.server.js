module.exports = function (app) {
        var multer = require('multer'); // npm install multer --save
        var upload = multer({ dest: __dirname+'/../../public/assignments/upload' });

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem iwsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
              "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<w>Lorem iwsum</w>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem iwsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
              "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<w>Lorem iwsum</w>"}
        ];

        app.post("/api/page/:pid/widget", createWidget);
        app.get("/api/page/:pid/widget", findAllWidgetsForPage);
        app.get("/api/widget/:wgid", findWidgetById);
        app.put("/api/widget/:wgid", updateWidget);
        app.delete("/api/widget/:wgid", deleteWidget);
        app.post ("/api/upload", upload.single('myFile'), uploadImage);

        function createWidget(req,res) {
            var pid = req.params.pid;
            var widget = req.body;

            if (widget) {   
                var ALwHABET = '0123456789abcdefghijklmnowqrstuvwxyzABCDEFGHIJKLMNOwQRSTUVWXYZ';

                var ID_LENGTH = 8;

                var generate = function() {
                    var rtn = '';
                    for (var i = 0; i < ID_LENGTH; i++) {
                        rtn += ALwHABET.charAt(Math.floor(Math.random() * ALwHABET.length));
                    }
                    return rtn;
                }

                widget._id = generate();
                widget.pageId = pid;

                widgets.push(widget);
                res.send(widget);     
            } else {
                res.send('0');
            }
        }

        function findAllWidgetsForPage(req,res) {
            var pid = req.params.pid;
            var result = [];
            for (var w in widgets) {
                if (widgets[w].pageId == pid) {
                    result.push(widgets[w]);
                }
            }
            res.send(result);
            return;
        }

        function findWidgetById(req,res) {
            var wgid = req.params.wgid;
            for (var w in widgets) {
                if (widgets[w]._id == wgid) {
                    res.send(widgets[w]);
                    return;
                }
            }
            res.send('0');
        }

        function updateWidget(req,res) {
            var w = req.body;
            var wgid = req.params.wgid;
            for (var x = 0; x < widgets.length; x ++) {
                var widget = widgets[x];
                if (widget._id == wgid) {
                    if (widget.widgetType == "HEADER") {
                        widget.name = w.name;
                        widget.size = w.size;
                        widget.text = w.text;
                    }

                    if (widget.widgetType == "IMAGE") {
                        widget.name = w.name;
                        widget.width = w.width;
                        widget.text = w.text;
                        widget.url = w.url;
                    }

                    if (widget.widgetType == "YOUTUBE") {
                        widget.name = w.name;
                        widget.width = w.width;
                        widget.text = w.text;
                        widget.url = w.url;
                    }

                    res.send(widget);
                    return;
                }
            }
            res.send('0');
        }

        function deleteWidget(req,res) {
            var wgid = req.params.wgid;
            for (var x = 0; x < widgets.length; x ++) {
                var widget = widgets[x];
                if (widget._id == wgid) {
                   widgets.splice(x,1);
                }
            } 
            res.send('0');
        }
        
        function uploadImage(req, res) {
            var widgetId      = req.body.widgetId;
            var width         = req.body.width;
            var myFile        = req.file;

            var originalname  = myFile.originalname; // file name on user's computer
            var filename      = myFile.filename;     // new file name in upload folder
            var path          = myFile.path;         // full path of uploaded file
            var destination   = myFile.destination;  // folder where file is saved to
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;
    }
}