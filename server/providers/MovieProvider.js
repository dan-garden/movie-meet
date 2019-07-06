const providers = [
    // require("./MovieGlu"),
    require("./InternationalShowTimes")
];


class MovieProvider {
    static get provider() {
        const selected = providers[Math.floor(Math.random()*providers.length)];
        return selected;
    }

    static async getFilmsNowShowing(config={}) {
        return this.provider.getFilmsNowShowing(config);
    }

    static async getFilmsComingSoon(config={}) {
        return this.provider.getFilmsComingSoon(config);
    }

    static async getFilmLiveSearch(config={}) {
        return this.provider.getFilmLiveSearch(config);
    }

    static async getCinemaLiveSearch(config={}) {
        return this.provider.getCinemaLiveSearch(config);
    }

    static async getFilmDetails(config={}) {
        return this.provider.getFilmDetails(config);
    }

    static async getCinemaDetails(config={}) {
        return this.provider.getCinemaDetails(config);
    }

    static async getCinemasNearby(config={}) {
        return this.provider.getCinemasNearby(config);
    }

    static async getCinemaShowTimes(config={}) {
        return this.provider.getCinemaShowTimes(config);
    }
}

module.exports = MovieProvider;