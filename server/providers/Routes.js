const MovieGlu = require("./MovieGlu");
const InternationShowTimes = require("./InternationalShowTimes");

module.exports = {
    ...MovieGlu.routes,
    ...InternationShowTimes.routes
};