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
        const params = {
            offset: config.offset,
            limit: config.limit,
            lang: config.lang,
            countries: config.countries,
            include_all: config.include_all,
            near_to: config.lat && config.long ? `${config.lat},${config.long}` : undefined,
            movie_id: config.movie_id,
            query: config.query
        };
        const endpoint = this.getEndpoint('cities', params);
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getCinemas(config={}) {
        const params = {
            search_query: config.search_query,
            search_field: config.search_field,
            offset: config.offset,
            limit: config.limit,
            city_ids: config.city_ids,
            chain_ids: config.chain_ids,
            location: config.lat && config.long ? `${config.lat},${config.long}` : undefined,
            distance: config.distance,
            bounds: config.bounds,
            countries: config.countries,
            time_from: config.time_from ? config.time_from : this.getTime(),
            time_to: config.time_to,
            movie_id: config.movie_id,
            fields: config.fields
        };
        const endpoint = this.getEndpoint('cinemas', params);
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getCinema(config={}) {
        if(!config.cinema_id) {
            throw new Error("No cinema id set");
        }

        const endpoint = this.getEndpoint('cinemas/' + config.cinema_id, {
            lang: config.lang
        });
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getChains(config={}) {
        const params = {
            countries: config.countries,
        };
        const endpoint = this.getEndpoint('chains', params);
        return this.getData(this.url + endpoint, { ...this.credentials })
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

    static async getMovie(config={}) {
        if(!config.movie_id) {
            throw new Error("No movie id set");
        }

        const endpoint = this.getEndpoint('movies/' + config.movie_id, {
            lang: config.lang
        });
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getGenres(config={}) {
        const endpoint = this.getEndpoint('genres', {
            lang: config.lang
        });
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getShowtimes(config={}) {
        const params = {
            fields: config.fields,
            all_fields: config.fields ? false : true,
            search_query: config.search_query,
            search_field: config.search_field,
            time_from: config.time_from ? config.time_from : this.getTime(),
            time_to: config.time_to,
            city_ids: config.city_ids,
            location: config.lat && config.long ? `${config.lat},${config.long}` : undefined,
            distance: config.distance,
            bounds: config.bounds,
            countries: config.countries,
            chain_ids: config.chain_ids,
            cinema_id: config.cinema_id,
            movie_id: config.movie_id,
            append: config.append,
            cinema_fields: config.cinema_fields,
            movie_fields: config.movie_fields,
        };
        const endpoint = this.getEndpoint('showtimes', params);
        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static async getShowtime(config={}) {
        if(!config.showtime_id) {
            throw new Error("No showtime id set");
        }

        const endpoint = this.getEndpoint('showtimes/' + config.showtime_id);
        return this.getData(this.url + endpoint, { ...this.credentials })
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
            '/api/cities': {
                method: 'get',
                function: this.getCities.bind(this),
                params: [
                    'offset',
                    'limit',
                    'lang',
                    'countries',
                    'include_all',
                    'lat',
                    'long',
                    'movie_id',
                    'query'
                ],
                response: 'json'
            },
            '/api/cinemas': {
                method: 'get',
                function: this.getCinemas.bind(this),
                params: [
                    'search_query',
                    'search_field',
                    'offset',
                    'limit',
                    'city_ids',
                    'chain_ids',
                    'lat',
                    'long',
                    'distance',
                    'bounds',
                    'countries',
                    'time_from',
                    'time_to',
                    'movie_id',
                    'fields'
                ],
                response: 'json'
            },
            '/api/cinema': {
                method: 'get',
                function: this.getCinema.bind(this),
                params: ['cinema_id', 'lang'],
                response: 'json'
            },
            '/api/chains': {
                method: 'get',
                function: this.getChains.bind(this),
                params: ['countries'],
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
            '/api/movie': {
                method: 'get',
                function: this.getMovie.bind(this),
                params: ['movie_id', 'lang'],
                response: 'json'
            },
            '/api/genres': {
                method: 'get',
                function: this.getGenres.bind(this),
                params: ['lang'],
                response: 'json'
            },
            '/api/showtimes': {
                method: 'get',
                function: this.getShowtimes.bind(this),
                params: [
                    'fields',
                    'search_query',
                    'search_field',
                    'time_from',
                    'time_to',
                    'city_ids',
                    'lat',
                    'long',
                    'distance',
                    'bounds',
                    'countries',
                    'chain_ids',
                    'cinema_id',
                    'movie_id',
                    'append',
                    'cinema_fields',
                    'movie_fields'
                ],
                response: 'json'
            },
            '/api/showtime': {
                method: 'get',
                function: this.getShowtime.bind(this),
                params: ['showtime_id'],
                response: 'json'
            }
        };
    }
}

module.exports = InternationalShowTimes;