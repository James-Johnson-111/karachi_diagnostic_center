const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const io = require('../server');

io.on('connection', ( socket ) => {

    // WHEN NEW USER LOGGED IN
    socket.on(
        'CallTheCandidate', ( data ) => {
            
            socket.broadcast.emit(
                'CallTheCandidate', data
            )
    
        }
    )

});

// with the help of following block of code we can get the current time in am/pm

var fullTime = null;

setInterval( () => {

    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var fullTimes = hours + ':' + minutes + ' ' + ampm;
    fullTime = fullTimes.toString();

}, 1 * 1000 );

// the following request is to get all tokens from the database

router.post( '/getalltokens', ( req, res ) => {

    const { user, counter, date_time } = req.body;

    const date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "SELECT * FROM tbl_tokens WHERE tbl_tokens.token_status = ? OR tbl_tokens.token_status = ? AND print_date = ? LIMIT 1",
        [ 'at waiting area', 'at counter with user ' + user, date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {
                if( rslt[0] )
                {

                    db.query(
                        "UPDATE tbl_tokens SET tbl_tokens.token_status = ?, counter = ? WHERE tbl_tokens.token_no = ? AND tbl_tokens.print_date = ?",
                        [ 'at counter', counter, rslt[0].token_no, date ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                
                            }else
                            {
                                
                                res.send( rslt );
                                res.end();
                
                            }
                
                        }
                    )
                }else
                {
                    res.send("No Record Found");
                    res.end();
                }

            }

        }
    )

} )

// the following request is to get a particular token from the database

router.post( '/gettoken', ( req, res ) => {

    const { token, date_time }= req.body;
    const date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');

    let q = db.query(
        "SELECT * FROM tbl_tokens WHERE token_no = ? AND tbl_tokens.token_status != 'encountered' AND print_date = ?",
        [ token, date.toString().substring(0,10) ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                console.log( q.sql );
                res.send(rslt);
                res.end();

            }

        }
    )

} )

router.get( '/gettokensatcounters', ( req, res ) => {

    const date = new Date().toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "SELECT * FROM tbl_tokens WHERE token_status LIKE 'at counter with user%' AND print_date = ? LIMIT 4",
        [ date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send(rslt);

            }

        }
    )

} )

// the following request is to store token into database when user click on 'get token' button

router.post( '/newtoken', ( req, res ) => {

    const { token, date_time, location_id, gender }= req.body;

    const d = new Date(date_time);

    db.query(
        "INSERT INTO tbl_tokens(`token_no`, `token_status`, `location_id`, `token_for`, `print_date`, `print_time`) VALUES(?,?,?,?,?,?)",
        [ token, 'at waiting area', location_id, gender, d, d.toTimeString() ],
        ( err ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send("Success");
                res.end();

            }

        }
    );

} );

// the following request is to get tokens from the table<database

router.post( '/gettokens', ( req, res ) => {

    const { date_time } = req.body;

    db.query(
        "SELECT token_no FROM tbl_tokens WHERE print_date = ? ORDER BY id DESC LIMIT 1",
        [ date_time.toString().substring(0,10) ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send( rslt );
                res.end();

            }

        }
    )

} );

module.exports = router;