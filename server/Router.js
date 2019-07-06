class Router {
    static handleResponse(type, res, result) {
        if(type === 'json') {
            if(result.message) {
                result.status = "error";
            } else {
                result.status = "success";
            }
            res.json(result);
        } else if(type === 'dir') {
    
        }
    }

    static registerRoutes(app, routes) {
        Object.keys(routes).forEach(route => {
            const config = routes[route];
            app[config.method](route, function(req, res) {
                let funcParams = {};
                config.params.forEach(param => {
                    if(config.method === 'get') {
                        funcParams[param] = req.query[param];
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