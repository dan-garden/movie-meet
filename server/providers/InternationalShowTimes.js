const MovieProviderBase = require("./MovieProviderBase");

class InternationalShowTimes extends MovieProviderBase {
    static get credentials() {
        return {
            "X-Api-Key": "zopFVtDETtFTuhQhrZY03aOHpIrJRvGw",
            // "api-version": "v200",
            // "territory": "AU"
        };
    }


    static get url() {
        return "https://api.internationalshowtimes.com/v4/";
    }

    static async getFilmsNowShowing(config={}) {
        if(!config.lat) {
            throw new Error("No latitude set");
        }
        if(!config.long) {
            throw new Error("No longitude set");
        }
        
        const count = config.count ? config.count : 10;
        const endpoint = this.getEndpoint('movies', {
            "limit": count,
            "time_from": this.getTime(),
            "location": `${config.lat},${config.long}`
        });

        return this.getData(this.url + endpoint, { ...this.credentials })
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

}

module.exports = InternationalShowTimes;