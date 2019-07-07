const Router = require("./Router");
const express = require("express");
const app = express();


const SystemRoutes = require("./system/Routes");
const ProvidersRoutes = require("./providers/Routes");

Router.registerRoutes(app, {
    ...SystemRoutes,
    ...ProvidersRoutes
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