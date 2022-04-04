const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// the following request is to get all users data

router.post('/getuser', ( req, res ) => {

    const { login_id } = req.body;

    let q = db.query(
        'SELECT user_id, user_name, user_password, user_roll FROM tbl_users WHERE user_name = ?',
        [ login_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send( [ rslt, q.sql ] );
                res.end();

            }

        }
    )

} );

router.post(
    '/getuserdata', ( req, res ) => {

        const { loginID } = req.body;

        db.query(
            "SELECT * FROM tbl_users WHERE user_id = ?",
            [ loginID ], ( err, rslt ) => {

                if ( err )
                {
                    console.log( err )
                }else
                {
                    res.send( rslt );
                    res.end();
                }

            }
        )

    }
)

router.post(
    '/setcountertouser', ( req, res ) => {

        const { counter, user } = req.body;

        db.query(
            "UPDATE tbl_counters SET user_id = ? WHERE counter = ?",
            [ user, counter ], ( err, rslt ) => {

                if ( err )
                {
                    console.log( err )
                }else
                {
                    res.send( rslt );
                    res.end();
                }

            }
        )

    }
)

router.post(
    '/logoutcounter', ( req, res ) => {

        const { user_id } = req.body;

        db.query(
            "UPDATE tbl_counters SET user_id = ? WHERE user_id = ?",
            [ null, user_id ], ( err ) => {

                if ( err )
                {
                    console.log( err )
                }else
                {
                    res.end();
                }

            }
        )

    }
)

module.exports = router;