module.exports = function (app) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        app.post("/api/user/:uid/website", createWebsite);
        app.get("/api/user/:uid/website", findAllWebsitesForUser);
        app.get("/api/website/:websiteId", findWebsiteById);
        app.put("/api/website/:websiteId", updateWebsite);
        app.delete("/api/website/:websiteId", deleteWebsite);

        function createWebsite(req,res) {
            var uid = req.params.uid;
            var website = req.body;

            if (website.name) {   
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
                    "name" : website.name,
                    "developerId" : uid
                };

                websites.push(site);
            }
            res.send('0');     
        }

        function findAllWebsitesForUser(req,res) {
            var uid = req.params.uid;
            var result = [];
            for (var w in websites) {
                if (websites[w].developerId == uid) {
                    result.push(websites[w]);
                }
            }
            res.send(result);
            return;
        }

        function findWebsiteById(req,res) {
            var uid = req.params.wid;
            for (var w in websites) {
                if (websites[w]._id == uid) {
                    res.send(websites[w]);
                    return;
                }
            }
            res.send('0');
        }

        function updateWebsite(req,res) {

        }

        function deleteWebsite(req,res) {

        }
}