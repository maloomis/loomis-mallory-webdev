module.exports = function(app) {
    var mongoose = require("mongoose");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
    require("./models/user/user.model.server.js");
}