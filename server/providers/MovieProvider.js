const fetch = require("node-fetch");
const crypto = require('crypto');
const fs = require("fs");



class MovieProvider {

    static getTime() {
        const d = new Date();
        return (
            d.getFullYear() + "-" + 
            ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
            ("00" + d.getDate()).slice(-2) + " " + 
            "00" + ":" + 
            "00" + ":" + 
            "00"
        );
    }

    static getEndpoint(endpoint, query) {
        const search = new URLSearchParams();
        Object.keys(query).forEach(key => {
            let val = query[key];
            search.append(key, val);
        });


        return `${endpoint}/?${search.toString()}`;
    }

    static getCacheId(url, headers) {
        const unique = url + Object.values(headers).join("-");
        const hash = crypto.createHash('md5').update(unique).digest('hex');
        return hash;
    }

    static getCacheFile(id) {
        return "./server/cache/" + id + ".json";
    }

    static setCache(url, headers, result) {
        const id = this.getCacheId(url, headers);
        fs.writeFileSync(this.getCacheFile(id), JSON.stringify(result, null, 4));
        
        return result;
    }

    static getCache(url, headers) {
        const id = this.getCacheId(url, headers);
        if (fs.existsSync(this.getCacheFile(id))) {
            const result = fs.readFileSync(this.getCacheFile(id), "utf8");
            return JSON.parse(result);
        } else {
            return false;
        }
    }

    static async getData(url, headers={}, cache=true) {
        if(cache) {
            const cache = this.getCache(url, headers);
            if(cache) {
                return Promise.resolve(cache);
            }
        }

        return fetch(url, { method: "GET", headers })
        .then(result => {
            if(result.headers.get("mg-message")) {
                const error = result.headers.get("mg-message");
                return { error }          
            } else {
                return result.json();
            }
        })
        .then(result => {
            return this.setCache(url, headers, result);
        })
        .catch(e => {
            return Promise.resolve(console.error(e));
        })
    }

}


module.exports = MovieProvider;