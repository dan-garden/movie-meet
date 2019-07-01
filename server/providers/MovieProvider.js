const fetch = require("node-fetch");
const fs = require("fs");


class MovieProvider {

    static getTime() {
        const d = new Date();
        return (
            d.getFullYear() + "-" + 
            ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
            ("00" + d.getDate()).slice(-2) + " " + 
            ("00" + d.getHours()).slice(-2) + ":" + 
            ("00" + d.getMinutes()).slice(-2) + ":" + 
            ("00" + d.getSeconds()).slice(-2)
        );
    }

    static async getData(url, headers={}) {
        return fetch(url, { method: "GET", headers })
        .then(result => {
            if(result.headers.get("mg-message")) {
                throw new Error(result.headers.get("mg-message"));
            } else {
                return result.json();
            }
        })
        .catch(e => {
            return Promise.resolve(console.error(e));
        })
    }

}


module.exports = MovieProvider;