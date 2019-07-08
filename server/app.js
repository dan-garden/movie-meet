const Router = require( "./Router" );
const express = require( "express" );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );


app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );


mongoose.connect('mongodb://localhost/movie-meet', {
    useNewUrlParser: true,
    useCreateIndex: true
});
let db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function () {
    console.log( "Database Connected" );
} );

app.use( session( {
    secret: 'this_is_shrecret_00382600',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore( {
        mongooseConnection: db
    } )
} ) );


const SystemRoutes = require( "./system/Routes" );
const ProvidersRoutes = require( "./providers/Routes" );

Router.registerRoutes( app, {
    ...SystemRoutes,
    ...ProvidersRoutes
} );

Router.registerRoutes( app, {
    '/api/endpoints': {
        method: 'get',
        function: () => {
            return new Promise( function ( resolve, reject ) {
                resolve( {
                    endpoints: Router.routes.filter( r => {
                        return r.route !== "/api/endpoints"
                    } )
                } );
            } );
        },
        response: 'json'
    }
} );
app.use( '/', express.static( 'server/public/' ) )


module.exports = app;