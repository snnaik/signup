var express = require( 'express' ),
    router = express.Router();

router.post( '/', function( req, res ) {
    res.send( req );
} );

module.exports = router;
