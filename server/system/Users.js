class Users {

    static async postRegister(config={}) {

    }

    static async postLogin(config={}) {

    }

    static async postLogout(config={}) {

    }

    static get routes() {
        return {
            '/api/register': {
                method: 'post',
                function: this.postRegister.bind(this),
                params: [
                    ''
                ],
                response: 'json',
            },
            '/api/login': {
                method: 'post',
                function: this.postLogin.bind(this),
                params: [],
                response: 'json'
            },
            '/api/logout': {
                method: 'post',
                function: this.postLogout.bind(this),
                params: [],
                response: 'json'
            },
        }
    }
}

module.exports = Users;