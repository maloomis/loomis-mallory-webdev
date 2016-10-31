module.exports = function (app) {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        app.post("/api/website/:wid/page", createPage);
        app.get("/api/website/:wid/page", findAllPagesForWebsite);
        app.get("/api/page/:pid", findPageById);
        app.put("/api/page/:pid", updatePage);
        app.delete("/api/page/:pid", deletePage);

        function createPage(req,res) {
            var wid = req.params.wid;
            var page = req.body;

            if (page.name) {   
                var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var ID_LENGTH = 8;

                var generate = function() {
                    var rtn = '';
                    for (var i = 0; i < ID_LENGTH; i++) {
                        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
                    }
                    return rtn;
                }

                var site = {
                    "_id" : generate(),
                    "name" : page.name,
                    "websiteId" : wid,
                    "title" : page.title
                };

                pages.push(site);
            }
            res.send('0');     
        }

        function findAllPagesForWebsite(req,res) {
            var wid = req.params.wid;
            var result = [];
            for (var p in pages) {
                if (pages[p].websiteId == wid) {
                    result.push(pages[p]);
                }
            }
            res.send(result);
            return;
        }

        function findPageById(req,res) {
            var pid = req.params.pid;
            for (var p in pages) {
                if (pages[p]._id == pid) {
                    res.send(pages[p]);
                    return;
                }
            }
            res.send('0');
        }

        function updatePage(req,res) {
            var p = req.body;
            var pid = req.params.pid;
            for (var x = 0; x < pages.length; x ++) {
                var page = pages[x];
                if (page._id == pid) {
                    page.name = p.name;
                    page.title = p.title;
                }
            }
            res.send('0');
        }

        function deletePage(req,res) {
            var pid = req.params.pid;
            for (var x = 0; x < pages.length; x ++) {
                var page = pages[x];
                if (page._id == pid) {
                   pages.splice(x,1);
                }
            } 
            res.send('0');
        }
}