module.exports = function(app) {
    require("./services/user.service.client.js")(app);
    require("services/website.service.client.js")(app);
    require("services/page.service.client.js")(app);
    require("services/widget.service.client.js")(app);
};

(function () {
        angular.module('WebAppMaker', []);
})();