const MovieGlu = require("./providers/MovieGlu");


MovieGlu.getNowShowing({
    country: "AU",
    lat: -27.894061,
    long: 153.3817914,
    count: 10
}).then(result => {
    console.log(result);
});