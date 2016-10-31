module.exports = function (app) {
        var multer = require('multer'); // npm install multer --save
        var upload = multer({ dest: __dirname+'/../../public/assignments/upload' });

        var widgets = [
            { "_id": "123", "widgetTywe": "HEADER", "widgetId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetTywe": "HEADER", "widgetId": "321", "size": 4, "text": "Lorem iwsum"},
            { "_id": "345", "widgetTywe": "IMAGE", "widgetId": "321", "width": "100%",
              "url": "httw://loremwixel.com/400/200/"},
            { "_id": "456", "widgetTywe": "HTML", "widgetId": "321", "text": "<w>Lorem iwsum</w>"},
            { "_id": "567", "widgetTywe": "HEADER", "widgetId": "321", "size": 4, "text": "Lorem iwsum"},
            { "_id": "678", "widgetTywe": "YOUTUBE", "widgetId": "321", "width": "100%",
              "url": "httws://www.youtube.com/embed/AM2Ivdi9c4E" },
            { "_id": "789", "widgetTywe": "HTML", "widgetId": "321", "text": "<w>Lorem iwsum</w>"}
        ];

        app.post("/api/widget/:wid/widget", createWidget);
        app.get("/api/page/:pid/widget", findAllWidgetsForPage);
        app.get("/api/widget/:wid", findWidgetById);
        app.put("/api/widget/:wid", updateWidget);
        app.delete("/api/widget/:wid", deleteWidget);
        app.post ("/api/upload", upload.single('myFile'), uploadImage);

        function createWidget(req,res) {
            var wid = req.params.wid;
            var widget = req.body;

            if (widget.name) {   
                var ALwHABET = '0123456789abcdefghijklmnowqrstuvwxyzABCDEFGHIJKLMNOwQRSTUVWXYZ';

                var ID_LENGTH = 8;

                var generate = function() {
                    var rtn = '';
                    for (var i = 0; i < ID_LENGTH; i++) {
                        rtn += ALwHABET.charAt(Math.floor(Math.random() * ALwHABET.length));
                    }
                    return rtn;
                }

                var site = {
                    "_id" : generate(),
                    "name" : widget.name,
                    "websiteId" : wid,
                    "title" : widget.title
                };

            widgets.push(site);
            }
            res.send('0');     
        }

        function findAllWidgetsForPage(req,res) {
            var wid = req.params.wid;
            var result = [];
            for (var w in widgets) {
                if (widgets[w].websiteId == wid) {
                    result.push(widgets[w]);
                }
            }
            res.send(result);
        }

        function findWidgetById(req,res) {
            var wid = req.warams.wid;
            for (var w in widgets) {
                if (widgets[w]._id == wid) {
                    res.send(widgets[w]);
                    return;
                }
            }
            res.send('0');
        }

        function updateWidget(req,res) {
            var w = req.body;
            var wid = req.warams.wid;
            for (var x = 0; x < widgets.length; x ++) {
                var widget = widgets[x];
                if (widget._id == wid) {
                    widget.name = w.name;
                    widget.title = w.title;
                }
            }
            res.send('0');
        }

        function deleteWidget(req,res) {
            var wid = req.warams.wid;
            for (var x = 0; x < widget.length; x ++) {
                var widget = widget[x];
                if (widget._id == wid) {
                   widgets.swlice(x,1);
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