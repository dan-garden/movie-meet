const Router = require("./Router");
const MovieGlu = require("./providers/MovieGlu");
const InternationShowTimes = require("./providers/InternationalShowTimes");

const express = require("express");
const app = express();

Router.registerRoutes(app, {
    ...MovieGlu.routes,
    ...InternationShowTimes.routes
});

app.use('/', express.static('server/public/'))


module.exports = app;