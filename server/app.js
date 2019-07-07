const Router = require("./Router");
const MovieGlu = require("./providers/MovieGlu");
const InternationShowTimes = require("./providers/InternationalShowTimes");

const express = require("express");
const app = express();

Router.registerRoutes(app, {
    ...MovieGlu.routes,
    ...InternationShowTimes.routes
});

Router.registerRoutes(app, {
    '/api/endpoints': {
        method: 'get',
        function: () => {
            return new Promise(function(resolve, reject) {
                resolve({
                    endpoints: Router.routes.filter(r => {
                        return r.route!=="/api/endpoints"
                    })
                });
            });
        },
        response: 'json'
    }
});
app.use('/', express.static('server/public/'))


module.exports = app;