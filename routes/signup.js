var express = require( 'express' ),
    router = express.Router();

router.get( '/', function( req, res, next ) {
    res.render( 'signup', {
        title : 'Sign Up Page',
        cssFile : 'signup'
    } );
} );

module.exports = router;
