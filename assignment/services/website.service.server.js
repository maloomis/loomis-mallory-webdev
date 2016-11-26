module.exports = function (app, model) {
        app.post("/api/user/:uid/website", createWebsite);
        app.get("/api/user/:uid/website", findAllWebsitesForUser);
        app.get("/api/website/:wid", findWebsiteById);
        app.put("/api/website/:wid", updateWebsite);
        app.delete("/api/user/:uid/website/:wid", deleteWebsite);

        function createWebsite(req,res) {
            var uid = req.params.uid;
            var website = req.body;

            model
                .websiteModel
                .createWebsite(uid, website)
                .then(
                    function(newWebsite) {
                        res.json(newWebsite);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                );
        }

        function findAllWebsitesForUser(req,res) {
            var userId = req.params.uid;

            model
                .websiteModel
                .findAllWebsitesForUser(userId)
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
            var websiteId = req.params.wid;
            model
                .websiteModel
                .findWebsiteById(websiteId)
                .then(
                    function(website) {
                        if (website) {
                            res.send(website);
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

        function updateWebsite(req,res) {
            var website = req.body;
            var websiteId = req.params.wid;
            model
                .websiteModel
                .updateWebsite(website, websiteId)
                .then(
                    function (status) {
                        res.sendStatus(200);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }

        function deleteWebsite(req,res) {
            var userId = req.params.uid;
            var websiteId = req.params.wid;
            model
                .websiteModel
                .deleteWebsite(userId, websiteId)
                .then(
                    function(status) {
                        res.sendStatus(200);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }
}