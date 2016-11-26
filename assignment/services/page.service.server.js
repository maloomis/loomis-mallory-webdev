module.exports = function (app, model) {
        app.post("/api/website/:wid/page", createPage);
        app.get("/api/website/:wid/page", findAllPagesForWebsite);
        app.get("/api/page/:pid", findPageById);
        app.put("/api/page/:pid", updatePage);
        app.delete("/api/website/:wid/page/:pid", deletePage);

        function createPage(req,res) {
            var websiteId = req.params.wid;
            var page = req.body;
            model
                .pageModel
                .createPage(websiteId, page)
                .then(
                    function(newPage) {
                        res.send(newPage);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                );   
        }

        function findAllPagesForWebsite(req,res) {
            var websiteId = req.params.wid;

            model
                .pageModel
                .findAllPagesForWebsite(websiteId)
                .then(
                    function(pages) {
                        res.send(pages);
                    },
                    function(err) {
                        res.sendStatus(400).send(error);
                    }
                )
        }

        function findPageById(req,res) {
            var pageId = req.params.pid;
            model
                .pageModel
                .findPageById(pageId)
                .populate('Widgets')
                .then(
                    function(page) {
                        if (page) {
                            res.send(page);
                        }
                        else {
                            res.send('0');
                        }
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }

        function updatePage(req,res) {
            var page = req.body;
            var pageId = req.params.pid;
            model
                .pageModel
                .updatePage(page, pageId)
                .then(
                    function (status) {
                        res.sendStatus(200);
                    },
                    function(err) {
                        res.sendStatus(400).send(err);
                    }
                );
        }

        function deletePage(req,res) {
            var pageId = req.params.pid;
            var websiteId = req.params.wid;
            model
                .pageModel
                .deletePage(pageId, websiteId)
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