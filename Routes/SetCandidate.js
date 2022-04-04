const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const CreateLog = require('./Logs').CreateLog;

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

// the following request is to store the data of candidate filled by a user from counter, into the database

router.post('/newcandidate', (req, res) => {

    const { formdata, insertion, token, exists, tests } = req.body;

    let data = JSON.parse( formdata );
    let insert = JSON.parse( insertion );
    let candidateTests = JSON.parse( tests );

    let q = "";
    let params = [];
    let imageName = data.candidate_name + '_' + data.candidate_passport_no + ".png";
    
    const d = new Date( insert.date_time );

    if ( data.candidate_id && !exists )
    {

        q = "UPDATE `tbl_candidate_information` SET `candidate_name`= ?,`travelling_to`= ?,`candidate_age`= ?,`candidate_nationality`= ?,`candidate_gender`= ?,`candidate_marital_status`= ?,`candidate_profession`= ?,`candidate_passport_no`= ?,`candidate_passport_place_of_issue`= ?,`candidate_image`= ?,`insertion_date`= ?,`insertion_time`= ?,`insert_by`= ? WHERE candidate_id = ?;";
        params = [ data.candidate_name, data.travelling_to, data.candidate_age, data.candidate_nationality, data.candidate_gender, data.candidate_marital_status, data.candidate_profession, data.candidate_passport_no, data.candidate_passport_place_of_issue, imageName, d, d.toTimeString(), insert.by, data.candidate_id ]

    }else
    if ( data.candidate_id && exists )
    {

        q = "UPDATE `tbl_candidate_information` SET `candidate_name`= ?,`travelling_to`= ?,`candidate_age`= ?,`candidate_nationality`= ?,`candidate_gender`= ?,`candidate_marital_status`= ?,`candidate_profession`= ?,`candidate_passport_no`= ?,`candidate_passport_place_of_issue`= ?,`candidate_image`= ?,`insertion_date`= ?,`insertion_time`= ?,`insert_by`= ? WHERE candidate_id = ?;";
        params = [ data.candidate_name, data.travelling_to, data.candidate_age, data.candidate_nationality, data.candidate_gender, data.candidate_marital_status, data.candidate_profession, data.candidate_passport_no, data.candidate_passport_place_of_issue, imageName, d, d.toTimeString(), insert.by, data.candidate_id ]
        
        q = q.concat("SELECT candidate_id FROM tbl_candidate_information WHERE candidate_passport_no = ?");
        params.push( data.candidate_passport_no );

    }else
    {
        q = "INSERT INTO `tbl_candidate_information`(`candidate_name`, `travelling_to`, `candidate_age`, `candidate_nationality`, `candidate_gender`, `candidate_marital_status`, `candidate_profession`, `candidate_passport_no`, `candidate_passport_place_of_issue`, `candidate_image`, `insertion_date`, `insertion_time`, `insert_by`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        params = [ data.candidate_name, data.travelling_to, data.candidate_age, data.candidate_nationality, data.candidate_gender, data.candidate_marital_status, data.candidate_profession, data.candidate_passport_no, data.candidate_passport_place_of_issue, imageName, d, d.toTimeString(), insert.by ];

        q = q.concat("SELECT candidate_id FROM tbl_candidate_information WHERE candidate_passport_no = ?");
        params.push( data.candidate_passport_no );
    }


    if ( req.files )
    {
        const Image = req.files.image;

        Image.mv('client/public/images/candidates/' + imageName, (err) => {

            if (err) {

                console.log(err);

            }

        });
    }

    let sql1 = db.query(
        q,
        params,
        ( err, rslt ) => {

            if ( err )
            {
                console.log( err );
            }else
            {

                CreateLog( insert.by + " entered the candidate information whose name is " + data.candidate_name, sql1.sql, rslt );

                let date = d.getFullYear() + '-' + ( ( d.getMonth() + 1 ).toString().length === 1 ? ( "0" + ( d.getMonth() + 1 ) ) : ( d.getMonth() + 1 ) ) + '-' + d.getDate();;

                let q2 = "UPDATE tbl_tokens SET token_status = 'encountered' WHERE id = ? AND print_date = ?;";
                let params = [ parseInt( token ), date ];
                if ( data.candidate_id && !exists )
                {
                    q2 = q2.concat( "UPDATE tbl_candidate_comes SET status = 'encountered', handle_by = ?, location_id = ?" );
                }else
                if ( data.candidate_id && exists )
                {
                    q2 = q2.concat( "INSERT INTO tbl_candidate_comes (token_id, candidate_id, date, time, status, handle_by, location_id) VALUES (?,?,?,?,?,?,?);" );
                    params.push( parseInt( token ) );
                    params.push( rslt[1][0].candidate_id );
                    params.push( d );
                    params.push( d.toTimeString() );
                    params.push( "encountered" );
                }else
                {
                    q2 = q2.concat( "INSERT INTO tbl_candidate_comes (token_id, candidate_id, date, time, status, handle_by, location_id) VALUES (?,?,?,?,?,?,?);" );
                    params.push( parseInt( token ) );
                    params.push( rslt[1][0].candidate_id );
                    params.push( d );
                    params.push( d.toTimeString() );
                    params.push( "encountered" );
                }
                
                params.push( insert.by );
                params.push( 1 );
                db.query(
                    q2,
                    params,
                    ( err ) => {
            
                        if ( err )
                        {
                            console.log( err );
                        }else
                        {
                            res.send("Data Inserted Successfully");
                            res.end();
                        }
            
                    }
                )

            }

        }
    )

});

router.post('/newcandidatebycandidate', (req, res) => {

    const { formdata, token } = req.body;

    let data = JSON.parse( formdata );
    let q = "";
    let params = [];
    let imageName = data.candidate_name + '_' + data.candidate_passport_no + ".png";
    console.log( data );
    
    const d = new Date();

    db.query(
        "SELECT candidate_passport_no FROM tbl_candidate_information WHERE candidate_passport_no = ?",
        [ data.candidate_passport_no ],
        ( err, rslt ) => {

            if ( err )
            {
                console.log( err );
            }else
            {
                
                if( rslt[0] )
                {
                    
                    q = "UPDATE `tbl_candidate_information` SET `candidate_name` = ?, `travelling_to` = ?, `candidate_age` = ?, `candidate_nationality` = ?, `candidate_cnic` = ?, `candidate_gender` = ?, `candidate_marital_status` = ?, `candidate_profession` = ?, `candidate_passport_no` = ?, `candidate_passport_place_of_issue` = ?, `candidate_image` = ? WHERE candidate_passport_no = ?;";
                    params = [ data.candidate_name, data.travelling_to, data.candidate_age, data.candidate_nationality, data.candidate_cnic, data.candidate_gender, data.candidate_marital_status, data.candidate_profession, data.candidate_passport_no, data.candidate_passport_place_of_issue, imageName, data.candidate_passport_no ];
                    
                    q = q.concat("SELECT candidate_id FROM tbl_candidate_information WHERE candidate_passport_no = ?");
                    params.push( data.candidate_passport_no );

                }else
                {
                    q = "INSERT INTO `tbl_candidate_information`(`candidate_name`, `travelling_to`, `candidate_age`, `candidate_nationality`, `candidate_cnic`, `candidate_gender`, `candidate_marital_status`, `candidate_profession`, `candidate_passport_no`, `candidate_passport_place_of_issue`, `candidate_image`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
                    params = [ data.candidate_name, data.travelling_to, data.candidate_age, data.candidate_nationality, data.candidate_cnic, data.candidate_gender, data.candidate_marital_status, data.candidate_profession, data.candidate_passport_no, data.candidate_passport_place_of_issue, imageName ];
                
                    q = q.concat("SELECT candidate_id FROM tbl_candidate_information WHERE candidate_passport_no = ?");
                    params.push( data.candidate_passport_no );
                
                
                    if ( req.files )
                    {
                        const Image = req.files.image;
                
                        Image.mv('client/public/images/candidates/' + imageName, (err) => {
                
                            if (err) {
                
                                console.log(err);
                
                            }
                
                        });
                    }
                
                }
                db.query(
                    q,
                    params,
                    ( err, rslt ) => {
            
                        if ( err )
                        {
                            console.log( err );
                        }else
                        {
            
                            if ( rslt[1] )
                            {
                                db.query(
                                    "INSERT INTO tbl_candidate_comes (token_id, candidate_id, ghc_code, date, time) VALUES (?,?,?,?,?);",
                                    [ parseInt( token ), rslt[1][0].candidate_id, data.candidate_ghc, d, d.toTimeString() ],
                                    ( err ) => {
                            
                                        if ( err )
                                        {
                                            console.log( err );
                                        }else
                                        {
                                            res.send("Data Inserted Successfully");
                                            res.end();
                                        }
                            
                                    }
                                )
                            }else
                            {
                                res.send("Data Inserted Successfully");
                                res.end();
                            }
            
                        }
            
                    }
                )
                
            }

        }
    )


});






















































// the following request is to store the data filled by the candidate himself/herself, into the database

router.post('/databycandidate', (req, res) => {
    const { Name, Age, Nationality, Gander, MStatus, Profession, Passport, ImageName, placeofissue, travellingto, token } = req.body;
    const Image = req.files.Image;
    let imagesNames = ImageName + '.png';

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    Image.mv('client/public/images/candidates/' + imagesNames , ( err ) => {

        if(err) {

            console.log(err);

        }

    });
    
    db.query(
        'INSERT INTO candidate_info(candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, insert_date, inserted_time, place_of_issue, travelling_to ) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
        [Name,Passport,Age,Nationality,Gander,MStatus,Profession,date,fullTime,placeofissue,travellingto],
        ( err, rslt ) => {

            if( !err )
            {

                db.query(
                    'SELECT candidate_id from candidate_info WHERE candidate_passport ='+ Passport,
                    ( err, rslt ) => {
    
                        if( err )
                        {
    
                            console.log( err );
    
                        }else
                        {
    
                            db.query(
                                'INSERT INTO candidate_images(candidate_id, candidate_image) VALUES(?,?); INSERT INTO candidate_tokens(candidate_id, token_no, token_date, token_time) VALUES (?,?,?,?); INSERT INTO candidate_logs(candidate_id,candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, log_date, log_time, place_of_issue, travelling_to, logged_by ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                [ rslt[0].candidate_id, imagesNames, rslt[0].candidate_id, token, date, fullTime, rslt[0].candidate_id,Name,Passport,Age,Nationality,Gander,MStatus,Profession,date,fullTime,placeofissue,travellingto, 'candidate' ],
                                ( err, rsltt ) => {
    
                                    if( err )
                                    {
    
                                        console.log( err );
    
                                    }else
                                    {

                                        res.send('Data inserted successfully');
                                        res.end();
    
                                    }
    
                                }
                            )
    
                        }
    
                    }
                )

            }else
            {

                console.log( err );

            }

        }
    );

});

module.exports = router;