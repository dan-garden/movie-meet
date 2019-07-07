let globalRoutes = [];

class Router {
    static handleResponse(type, res, result) {
        if(type === 'json') {
            if(result.message || result.error) {
                result.status = "error";
            } else {
                result.status = "success";
            }
            res.json(result);
        } else if(type === 'dir') {
    
        }
    }

    static get routes() {
        return globalRoutes;
    }

    static registerRoutes(app, routes) {
        Object.keys(routes).forEach(route => {
            const config = routes[route];
            config.route = route;
            if(!config.params) {
                config.params = [];
            }
            globalRoutes.push(config);
            app[config.method](route, function(req, res) {
                let funcParams = { session: req.session };
                config.params.forEach(param => {
                    if(config.method === 'get') {
                        funcParams[param] = req.query[param];
                    } else if(config.method === 'post') {
                        funcParams[param] = req.body[param];
                    }
                })
                config.function(funcParams)
                .then(result => {
                    Router.handleResponse(config.response, res, result);
                })
                .catch(e => {
                    // console.error(e);
                    Router.handleResponse(config.response, res, { message: e.message })
                });
            });
        });

        return app;
    }
}


module.exports = Router;