var express = require( 'express' ),
    http = require( 'http' ),
    path = require( 'path' ),
    index = require( './routes/index' ),
    signup = require( './routes/signup' ),
    submit = require( './routes/submit' ),
    sassMiddleware = require( 'node-sass-middleware' ),
    app = express(),
    server = http.createServer( app ),
    port = '3000';

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

app.use( sassMiddleware( {
    src : path.join( __dirname, 'src' ),
    dest : path.join( __dirname, 'dest/css' ),
    indentedSyntax : false,
    sourceMap : true
} ) );

app.use( express.static( path.join( __dirname, 'dest' ) ) );

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

app.set( 'port', port );
server.listen( port );
server.on( 'listening', function() {
    console.log( 'Listening on port 3000' );
} );
