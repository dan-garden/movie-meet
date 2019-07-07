const MovieProviderBase = require("./MovieProviderBase");

class InternationalShowTimes extends MovieProviderBase {
    static get credentials() {
        return {
            "X-Api-Key": "zopFVtDETtFTuhQhrZY03aOHpIrJRvGw"
        };
    }
    
    static get url() {
        return "https://api.internationalshowtimes.com/v4/";
    }

    static async getLocales() {
        const endpoint = this.getEndpoint('locales');
        return this.getData(this.url + endpoint, {  ...this.credentials })
    }

    static async getCountries() {
        const endpoint = this.getEndpoint('countries');
        return this.getData(this.url + endpoint, {  ...this.credentials })
    }

    static async getCities(config={}) {

    }

    static async getCinemas(config={}) {

    }

    static async getChains(config={}) {

    }

    static async getMovies(config={}) {
        const params = {
            search_query: config.search_query,
            search_field: config.search_field,
            offset: config.offset,
            limit: config.limit,
            time_from: config.time_from ? config.time_from : this.getTime(),
            time_to: config.time_to,
            chain_ids: config.chain_ids,
            city_ids: config.city_ids,
            location: config.lat && config.long ? `${config.lat},${config.long}` : undefined,
            distance: config.distance,
            bounds: config.bounds,
            countries: config.countries,
            fields: config.fields,
            all_fields: config.fields ? false : true,
            lang: config.lang,
            imbd_id: config.imbd_id,
            cinema_id: config.cinema_id,
            include_outdated: config.include_outdated,
            include_upcomings: config.include_upcomings,
            genre_ids: config.genre_ids
        };
        const endpoint = this.getEndpoint('movies', params);
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getGenres(config={}) {

    }

    static get routes() {
        return {
            '/api/locales': {
                method: 'get',
                function: this.getLocales.bind(this),
                response: 'json'
            },
            '/api/countries': {
                method: 'get',
                function: this.getCountries.bind(this),
                response: 'json'
            },
            '/api/movies': {
                method: 'get',
                function: this.getMovies.bind(this),
                params: [
                    'search_query',
                    'search_field',
                    'offset',
                    'limit',
                    'time_from',
                    'time_to',
                    'chain_ids',
                    'city_ids',
                    'lat',
                    'long',
                    'distance',
                    'bounds',
                    'countries',
                    'fields',
                    'lang',
                    'imbd_id',
                    'cinema_id',
                    'include_outdated',
                    'include_upcomings',
                    'genre_ids'
                ],
                response: 'json'
            },    
        };
    }
}

module.exports = InternationalShowTimes;