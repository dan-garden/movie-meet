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

    static async getFilmsNowShowing(config={}) {    
        const endpoint = this.getEndpoint('movies', {
            "limit": count,
            "time_from": this.getTime(),
            "location": `${config.lat},${config.long}`
        });

        return this.getData(this.url + endpoint, { ...this.credentials })
    }

    static get routes() {
        return {
            '/api/movies': {
                method: 'get',
                function: this.getFilmsNowShowing.bind(this),
                params: ['lat', 'long', 'count'],
                response: 'json'
            }
        };
    }
}

module.exports = InternationalShowTimes;