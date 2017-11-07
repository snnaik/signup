var express = require( 'express' ),
    router = express.Router();

router.get( '/', function( req, res, next ) {
    res.render( 'index', {
        title : 'Sample Sign Up Home',
        cssFile : 'index'
    } );
} );

module.exports = router;
