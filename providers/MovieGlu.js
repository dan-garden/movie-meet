const MovieProvider = require("./MovieProvider.js");


class MovieGlu extends MovieProvider {
    static get credentials() {
        return {
            "Authorization": "Basic TU9WSV80ODp4Z3F0aXZNYVJmT08=",
            "client": "MOVI_48",
            "x-api-key": "a7ktzir3krIua2buq4cm9NRE7PBOQDr129c23ak8",
            "api-version": "v200"
        };
    }


    static get url() {
        return "https://api-gate2.movieglu.com/";
    }


    static async getNowShowing(config={}) {
        if(!config.country) {
            throw new Error("No country code set");
        }

        if(!config.lat) {
            throw new Error("No latitude set");
        }

        if(!config.long) {
            throw new Error("No longitude set");
        }
        
        
        const count = config.count ? config.count : 10;
        const endpoint = `filmsNowShowing/?n=${count}`;

        return this.getData(this.url + endpoint, {
            ...this.credentials,
            "territory": config.country,
            "device-datetime": this.getTime(),
            "geolocation": `${config.lat}:${config.long}`
        })
    }

}


module.exports = MovieGlu;