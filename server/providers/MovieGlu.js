const MovieProviderBase = require("./MovieProviderBase.js");

class MovieGlu extends MovieProviderBase {
    static get credentials() {
        return {
            "Authorization": "Basic TU9WSV80ODp4Z3F0aXZNYVJmT08=",
            "client": "MOVI_48",
            "x-api-key": "a7ktzir3krIua2buq4cm9NRE7PBOQDr129c23ak8",
            "api-version": "v200",
            "territory": "AU"
        };
    }

    static get url() {
        return "https://api-gate2.movieglu.com/";
    }

    static async getFilmsNowShowing(config={}) {
        if(!config.lat) {
            throw new Error("No latitude set");
        }
        if(!config.long) {
            throw new Error("No longitude set");
        }
        
        const count = config.count ? config.count : 10;
        const endpoint = this.getEndpoint('filmsNowShowing', {n: count});

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime(),
            "geolocation": `${config.lat};${config.long}`
        })
    }

    static async getFilmsComingSoon(config={}) {        
        const count = config.count ? config.count : 10;
        const endpoint = this.getEndpoint('filmsComingSoon', {n: count});

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime(),
            "geolocation": `${config.lat};${config.long}`
        })
    }

    static async getFilmLiveSearch(config={}) {
        if(!config.query || config.query.trim() == "") {
            throw new Error("No query set");
        }

        const count = config.count ? config.count : 5;
        const endpoint = this.getEndpoint('filmLiveSearch', { n: count, query: config.query });

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime()
        })
    }

    static async getCinemaLiveSearch(config={}) {
        if(!config.query || config.query.trim() == "") {
            throw new Error("No query set");
        }

        const count = config.count ? config.count : 5;
        const endpoint = this.getEndpoint('cinemaLiveSearch', { n: count, query: config.query });
        const headers = {
            ...this.credentials,
            "device-datetime": this.getTime()
        };
        if(config.lat && config.long) {
            headers.geolocation = `${config.lat};${config.long}`;
        }
        return this.getData(this.url + endpoint, headers);
    }

    static async getFilmDetails(config={}) {
        if(!config.film_id) {
            throw new Error("No film id set");
        }

        const endpoint = this.getEndpoint('filmDetails', { film_id: config.film_id });
        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime()
        })
    }

    static async getCinemaDetails(config={}) {
        if(!config.cinema_id) {
            throw new Error("No cinema id set");
        }

        const endpoint = this.getEndpoint('cinemaDetails', { cinema_id: config.cinema_id });
        const headers = {
            ...this.credentials,
            "device-datetime": this.getTime()
        };
        if(config.lat && config.long) {
            headers.geolocation = `${config.lat};${config.long}`;
        }
        return this.getData(this.url + endpoint, headers);
    }

    static async getCinemasNearby(config={}) {
        if(!config.lat) {
            throw new Error("No latitude set");
        }
        if(!config.long) {
            throw new Error("No longitude set");
        }

        const count = config.count ? config.count : 10;
        const endpoint = this.getEndpoint('cinemasNearby', { n: count });

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime(),
            "geolocation": `${config.lat};${config.long}`
        })
    }

    static async getCinemaShowTimes(config={}) {
        if(!config.cinema_id) {
            throw new Error("No cinema id set");
        }
        if(!config.date) {
            throw new Error("No date set");
        }

        config.sort = config.sort === "popularity" ? config.sort : "alphabetical";
        const endpoint = this.getEndpoint('cinemaShowTimes', { ...config });

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "device-datetime": this.getTime()
        })
    }






    static get routes() {
        return {
            '/api/filmsNowShowing': {
                method: 'get',
                function: this.getFilmsNowShowing.bind(this),
                params: ['lat', 'long', 'count'],
                response: 'json'
            },
            '/api/filmsComingSoon': {
                method: 'get',
                function: this.getFilmsComingSoon.bind(this),
                params: ['lat', 'long', 'count'],
                response: 'json'
            },
            '/api/filmLiveSearch': {
                method: 'get',
                function: this.getFilmLiveSearch.bind(this),
                params: ['query', 'count'],
                response: 'json'
            },
            '/api/cinemaLiveSearch': {
                method: 'get',
                function: this.getCinemaLiveSearch.bind(this),
                params: ['query', 'lat', 'long', 'count'],
                response: 'json'
            },
            '/api/filmDetails': {
                method: 'get',
                function: this.getFilmDetails.bind(this),
                params: ['film_id'],
                response: 'json'
            },
            '/api/cinemaDetails': {
                method: 'get',
                function: this.getCinemaDetails.bind(this),
                params: ['cinema_id'],
                response: 'json'
            },
            '/api/cinemasNearby': {
                method: 'get',
                function: this.getCinemasNearby.bind(this),
                params: ['lat', 'long', 'count'],
                response: 'json'
            },
            '/api/cinemaShowTimes': {
                method: 'get',
                function: this.getCinemaShowTimes.bind(this),
                params: ['cinema_id', 'date', 'film_id', 'sort'],
                response: 'json'
            }
        };
    }
}


module.exports = MovieGlu;