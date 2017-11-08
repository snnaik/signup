var express = require( 'express' ),
    http = require( 'http' ),
    path = require( 'path' ),
    ncp = require( 'ncp' ).ncp,
    index = require( './routes/index' ),
    signup = require( './routes/signup' ),
    submit = require( './routes/submit' ),
    sassMiddleware = require( 'node-sass-middleware' ),
    app = express(),
    server = http.createServer( app ),
    port = '3000',
    srcPath = path.join( __dirname, 'src' ),
    destPath = path.join( __dirname, 'dest' );

app.set( 'port', port );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

app.use( sassMiddleware( {
    src : srcPath,
    dest : destPath,
    indentedSyntax : false,
    sourceMap : true
} ) );

app.use( express.static( destPath ) );

app.use( '/', index );
app.use( '/signup', signup );
app.post( '/submit', submit );

app.use( function( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error' );
} );

var filesToCopy = {
    src : [
        srcPath + '/images',
        srcPath + '/js'
    ],
    dest : [
        destPath + '/images',
        destPath + '/js'
    ]
};
ncp.limit = 8;
filesToCopy.src.forEach( function( val, i ) {
    ncp( val, filesToCopy.dest[ i ], function( err ) {
        if( err ) {
            console.error( err );
        } else {
            console.log( 'Folder copied: ' + val.substr( val.lastIndexOf( '/' ) ) );
        }
    } );
} );

server.listen( port );
server.on( 'listening', function() {
    console.log( 'Listening on port 3000' );
} );
