const MovieProvider = require("./providers/MovieProvider");

const express = require("express");
const app = express();

const handleResponse = (type, res, result) => {
    if(type === 'json') {
        if(result.message) {
            result.status = "error";
        } else {
            result.status = "success";
        }
        res.json(result);
    } else if(type === 'dir') {

    }
};

const routes = {
    '/api/filmsNowShowing': {
        method: 'get',
        function: MovieProvider.getFilmsNowShowing.bind(MovieProvider),
        params: ['lat', 'long', 'count'],
        response: 'json'
    },
    '/api/filmsComingSoon': {
        method: 'get',
        function: MovieProvider.getFilmsComingSoon.bind(MovieProvider),
        params: ['lat', 'long', 'count'],
        response: 'json'
    },
    '/api/filmLiveSearch': {
        method: 'get',
        function: MovieProvider.getFilmLiveSearch.bind(MovieProvider),
        params: ['query', 'count'],
        response: 'json'
    },
    '/api/cinemaLiveSearch': {
        method: 'get',
        function: MovieProvider.getCinemaLiveSearch.bind(MovieProvider),
        params: ['query', 'lat', 'long', 'count'],
        response: 'json'
    },
    '/api/filmDetails': {
        method: 'get',
        function: MovieProvider.getFilmDetails.bind(MovieProvider),
        params: ['film_id'],
        response: 'json'
    },
    '/api/cinemaDetails': {
        method: 'get',
        function: MovieProvider.getCinemaDetails.bind(MovieProvider),
        params: ['cinema_id'],
        response: 'json'
    },
    '/api/cinemasNearby': {
        method: 'get',
        function: MovieProvider.getCinemasNearby.bind(MovieProvider),
        params: ['lat', 'long', 'count'],
        response: 'json'
    },
    '/api/cinemaShowTimes': {
        method: 'get',
        function: MovieProvider.getCinemaShowTimes.bind(MovieProvider),
        params: ['cinema_id', 'date', 'film_id', 'sort'],
        response: 'json'
    }
};

Object.keys(routes).forEach(route => {
    const config = routes[route];
    app[config.method](route, function(req, res) {
        let funcParams = {};
        config.params.forEach(param => {
            if(config.method === 'get') {
                funcParams[param] = req.query[param];
            }
        })
        config.function(funcParams)
        .then(result => {
            handleResponse(config.response, res, result);
        })
        .catch(e => {
            // console.error(e);
            handleResponse(config.response, res, { message: e.message })
        });
    });
});







app.use('/', express.static('server/public/'))



module.exports = app;