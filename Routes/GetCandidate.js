const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// here is an array in which all month names are stored with whcich we can store month name into database

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

// the following request is to get all users data

router.post( '/getcandidates', ( req, res ) => {

    db.query(
        "SELECT COUNT(candidate_id) as id, insert_date as date FROM candidate_info GROUP BY insert_date ASC",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

// the following request is to get candidate data agains the given token

router.post( '/gettokendata', ( req, res ) => {

    const { token } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image, candidate_tokens.token_no from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN candidate_tokens ON candidate_info.candidate_id = candidate_tokens.candidate_id INNER JOIN users ON users.login_id = candidate_info.insert_by WHERE candidate_tokens.token_no = '" + token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

// the following request is to get all candidate data according to the given date

router.post( '/getdatathroughdate', ( req, res ) => {

    const { date, logger } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN users ON candidate_info.insert_by = users.login_id WHERE insert_date LIKE '%" + date + "%'",
        (err, rslt) => {

            if (err) {

                console.log(err);

            } else {
                let tokenDate = new Date();
                let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                db.query(
                    "INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                    ['Search candidates data through date', logger, date, fullTime],
                    (err, rslts) => {

                        if (err) {
                            console.log(err);
                        } else {
                            res.send( rslt );
                            res.end();
                        }

                    }
                )

            }
        }
    )

} )

// the following request is to get all candidate data according to the given time

router.post( '/getcandidatethroughtime', ( req, res ) => {

    const { time1, time2, logger } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN users ON candidate_info.insert_by = users.login_id WHERE candidate_info.inserted_time BETWEEN '" + time1 + "' AND '" + time2 + "'",
        // "SELECT candidate_info.*, users.*, candidate_images.candidate_image from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN users ON candidate_info.insert_by = users.login_id WHERE candidate_info.inserted_time IN ('" + time1 + "', '" + time2 + "')",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                let tokenDate = new Date();
                let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                db.query(
                    "INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                    ['Search candidates data through time', logger, date, fullTime],
                    (err, rslts) => {

                        if (err) {
                            console.log(err);
                        } else {
                            res.send( rslt );
                            res.end();
                        }

                    }
                )

            }

        }
    )

} )

// the following request is to get the data of candidate against the current token

router.post( '/getcurrentcandidate', ( req, res ) => {

    const { token, date_time } = req.body;

    let date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');
    
    db.query(
        "SELECT \
        tbl_candidate_information.* \
        FROM tbl_candidate_information  \
        LEFT OUTER JOIN tbl_candidate_comes ON tbl_candidate_information.candidate_id = tbl_candidate_comes.candidate_id \
        RIGHT OUTER JOIN tbl_tokens ON tbl_tokens.id = tbl_candidate_comes.token_id \
        WHERE tbl_tokens.token_no = ? AND tbl_tokens.print_date = ? AND tbl_candidate_comes.date = ?",
        [ token, date, date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

router.post( '/discardtoken', ( req, res ) => {

    const { token, date_time } = req.body;

    let date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "UPDATE tbl_tokens SET tbl_tokens.token_status = 'discard' WHERE tbl_tokens.token_no = ? AND print_date = ?",
        [ token, date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

router.post( '/getcandidatedetailsontoken', ( req, res ) => {

    const { token, date_time } = req.body;

    db.query(
        "SELECT candidate_id FROM tbl_candidate_comes WHERE token_id = ? AND date = ?",
        [ token, date_time.substring(0,10) ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

router.post( '/searchcandidatebypassport', ( req, res ) => {

    const { passport } = req.body;

    db.query(
        "SELECT * FROM `tbl_candidate_information` WHERE candidate_passport_no LIKE '" + passport + "%'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} )

module.exports = router;