module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    
    function findUser(req,res) {
        var params = req.params;
        var query = req.query;

        if (query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if(query.username){
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };

    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };

    function findUserById(req, res) {
        var userId = parseInt(req.query._id);
        for (var u in users) {
            if (users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };
}