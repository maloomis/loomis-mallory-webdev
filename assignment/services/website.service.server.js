module.exports = function (app, model) {
        app.post("/api/user/:uid/website", createWebsite);
        app.get("/api/user/:uid/website", findAllWebsitesForUser);
        app.get("/api/website/:wid", findWebsiteById);
        app.put("/api/website/:wid", updateWebsite);
        app.delete("/api/website/:wid", deleteWebsite);

        function createWebsite(req,res) {
            var uid = req.params.uid;
            var website = req.body;

            model
                .userModel
                .addWebsite(uid, website);

            model
                .websiteModel
                .createWebsite(uid, website)
                .then(
                    function(newWebsite) {
                        website = newWebsite;
                        res.send(newWebsite);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                );
        }

        function findAllWebsitesForUser(req,res) {
            var uid = req.params.uid;

            model
                .websiteModel
                .findAllWebsitesForUser(uid)
                .then(
                    function(websites) {
                        res.send(websites);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                )
        }

        function findWebsiteById(req,res) {
            var wid = req.params.wid;
            for (var w in websites) {
                if (websites[w]._id == wid) {
                    res.send(websites[w]);
                    return;
                }
            }
            res.send('0');
        }

        function updateWebsite(req,res) {
            var website = req.body;
            var wid = req.params.wid;
            for (var x = 0; x < websites.length; x ++) {
                var site = websites[x];
                if (site._id == wid) {
                    site.name = website.name;
                    site.description = website.description;
                }
            }
            res.send('0');
        }

        function deleteWebsite(req,res) {
            var wid = req.params.wid;
            for (var x = 0; x < websites.length; x ++) {
                var website = websites[x];
                if (website._id == wid) {
                    websites.splice(x,1);
                }
            } 
            res.send('0');
        }
}