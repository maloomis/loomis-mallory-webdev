module.exports = function(app, model) {
    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '../../../public/project/upload');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    app.post('/api/client', createClient);
    app.get('/api/client/:cid', findClientById);
    app.get('/api/client/', findClientByCredentials);
    app.put('/api/client/:cid', updateClient);
    app.delete('/api/client/:cid', deleteClient);
    app.post ("/api/uploadProfile", upload.single('myFile'), uploadImage);

    function createClient(req, res) {
        var client = req.body;
        model
            .clientModel
            .createClient(client)
            .then(
                function(newClient) {
                    res.send(newClient);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findClientByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .clientModel
            .findClientByCredentials(username, password)
            .then(
                function(clients) {
                    if (clients[0]) {
                        res.json(clients[0]);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    };

    function findClientById(req, res) {
        var clientId = req.params.cid;
        model
            .clientModel
            .findClientById(clientId)
            .then(
                function(client) {
                    if (client) {
                        res.send(client);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    };

    function updateClient(req, res) {
        var client = req.body;
        var clientId = req.params.cid;
        model
            .clientModel
            .updateClient(client, clientId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteClient(req, res) {
        var clientId = req.params.cid;
        model
            .clientModel
            .deleteClient(clientId)
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
        var clientId        = req.body.clientId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log(clientId);
        console.log(filename);

        model
            .clientModel
            .uploadImage(clientId, filename)
            .then(
                function(status) {
                    res.redirect('../project/index.html#/clientProfile/'+ clientId);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
}