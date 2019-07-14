const fs = require( "fs" );
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/movie-meet', {
    useNewUrlParser: true,
    useCreateIndex: true
} );
let db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function () {


    const cachePath = __dirname + "/../cache/";

    const CacheSchema = new mongoose.Schema( {
        _cache_id: {
            type: String,
            unique: true,
            required: true
        },
        content: {
            type: Object
        }
    } );


    const Cache = mongoose.model( 'Cache', CacheSchema );
    const files = fs.readdirSync( cachePath );


    files.forEach( (file, i) => {
        const cacheId = file.replace( ".json", "" );

        const fileContent = fs.readFileSync( cachePath + file, "utf8" );
        const cacheContent = JSON.parse( fileContent );

        Cache.create( {
            _cache_id: cacheId,
            content: cacheContent
        } );
        console.log(`[${(i+1)}/${files.length}] inserted ${file}`);

    } );



} );