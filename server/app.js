const MovieGlu = require("./providers/MovieGlu");


const express = require("express");
const app = express();




app.get('/api/filmsNowShowing', function (req, res) {
    MovieGlu.getFilmsNowShowing({
        country: "AU",
        lat: -27.894061,
        long: 153.3817914,
        count: 10
    }).then(result => {
        res.json(result);
    });
});


app.get('/api/cinemasNearby', function (req, res) {
    MovieGlu.getCinemasNearby({
        country: "AU",
        lat: -27.894061,
        long: 153.3817914,
        count: 10
    }).then(result => {
        res.json(result);
    });
});


app.get('/api/cinemaShowTimes', function (req, res) {
    MovieGlu.getCinemaShowTimes({
        cinema_id: 16307,
        date: "2019-07-01",
        film_id: 258633,
        // sort: "popularity"

    }).then(result => {
        res.json(result);
    });
});








app.use('/', express.static('server/public/'))



module.exports = app;