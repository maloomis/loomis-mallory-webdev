module.exports = function(app) {
    var model = require("./models/models.server.js")();
    require("./services/client.service.server.js")(app, model);
    require("./services/trainer.service.server.js")(app, model);
}