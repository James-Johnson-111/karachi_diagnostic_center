import React, { useState } from 'react';
import UI from './UI';

import axios from '../../../../../axios';
import socket from '../../../../../io';

// REACT REDUX
import { useSelector } from 'react-redux';

const Candidateinformation = () => {

    const User = useSelector( ( state ) => state.OnUserLogin.user );

    const [ Form, setForm ] = useState(
        {
            candidate_ghc: '',
            candidate_name: "",
            travelling_to: "",
            candidate_age: "",
            candidate_nationality: "",
            candidate_gender: "",
            candidate_marital_status: "",
            candidate_profession: "",
            candidate_passport_no: "",
            candidate_passport_place_of_issue: ""
        }
    );

    const [ Tests, setTests ] = useState(
        {
            firstExamination: true,
            secondExamination: true,
            // laboratory: true,
            xray: true
        }
    )

    const [ CandidateExists, setCandidateExists ] = useState( false );
    const [ Token, setToken ] = useState();
    const [ TokenID, setTokenID ] = useState();

    const [ CandidateImage, setCandidateImage ] = useState(
        {
            image: null,
            preview: null
        }
    );

    const CallCandidate = () => {

        const Data = new FormData();
            Data.append('user', sessionStorage.getItem('ID'));
            Data.append('counter', User.counter);
            Data.append('date_time', new Date());

            axios.post('/getalltokens', Data).then(response => {
                
                if ( typeof( response.data ) !== "string" ) {

                    let token = response.data[0].token_no.toString();
                    
                    let getLenth = token.length;
                    let tokenTXT = '';
        
                    if( getLenth === 1 )
                    {
                        tokenTXT = '000' + token;
                    }
        
                    if( getLenth === 2 )
                    {
                        tokenTXT = '00' + token;
                    }
        
                    if( getLenth === 3 )
                    {
                        tokenTXT = '0' + token;
                    }
        
                    if( getLenth === 4 )
                    {
                        tokenTXT = token;
                    }
                    
                    setToken( tokenTXT );
                    setTokenID( response.data[0].id );

                    const Data = new FormData();
                    Data.append('token', response.data[0].token_no);
                    Data.append('date_time', new Date());

                    axios.post('/getcurrentcandidate', Data).then(res => {

                        let filled = true;
                        if ( !res.data[0] )
                        {
                            filled = false;
                        }

                        if ( filled ) {

                            setForm( res.data[0] );
                            setCandidateImage(
                                {
                                    image: res.data[0].candidate_image,
                                    preview: 'images/candidates/' + res.data[0].candidate_image
                                }
                            );

                        }
                        socket.emit('CallTheCandidate', { token: token, counter: User.counter });

                    }).catch(error => {

                        console.log( error );

                    })

                }else
                {
                    setToken( response.data );
                }

            }).catch(err => {

                console.log(err);

            });

    }

    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const val = {
            ...Form,
            [name]: value
        }

        setForm( val );

    }


    const UploadImage = ( data ) => {

        setCandidateImage( data );

    }

    const NewCandidate = ( e ) => {

        e.preventDefault();

        if ( isNaN( parseInt( Token ) ) )
        {
            alert("No Token Found");
        }else
        {
            const d = new Date();
            const Data = new FormData();
            Data.append('token', TokenID);
            Data.append('exists', CandidateExists);
            Data.append('formdata', JSON.stringify( Form ));
            Data.append('tests', JSON.stringify( Tests ));
            Data.append('insertion', JSON.stringify( { by: sessionStorage.getItem("ID"), date_time: d } ));
            Data.append('image', CandidateImage.image);
    
            axios.post(
                '/newcandidate',
                Data,
                {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            ).then(
                () => {
    
                    alert("Success");
                    setForm(
                        {
                            candidate_name: "",
                            travelling_to: "",
                            candidate_age: "",
                            candidate_nationality: "",
                            candidate_gender: "",
                            candidate_marital_status: "",
                            candidate_profession: "",
                            candidate_passport_no: "",
                            candidate_passport_place_of_issue: ""
                        }
                    )
                    setCandidateImage(
                        {
                            image: null,
                            preview: null
                        }
                    )
                    setToken('CALL THE NEXT ONE');
    
                }
            ).catch(
                err => {
    
                    alert("Error");
                    console.log(err);
    
                }
            )
        }

    }

    const DiscardToken = () => {

        if ( isNaN( parseInt( Token ) ) )
        {
            return false;
        }

        const formsData = new FormData();
        formsData.append('token', Token);
        formsData.append('date_time', new Date());
        axios.post('/discardtoken', formsData).then( () => {

            alert("Token " + Token + " has been discard");
            setToken('CALL THE NEXT ONE');

        }).catch(() => {

            alert("Can't discard " + Token + ". Try again later");

        })

    }

    const SetCandidateData = ( data ) => {

        setForm( data );
        setCandidateImage(
            {
                image: data.candidate_image,
                preview: 'images/candidates/' + data.candidate_image
            }
        );
        setCandidateExists( true );

    }

    const onChangeTest = ( e ) => {

        const { name, checked } = e.target;
        
        setTests(
            {
                ...Tests,
                [name]: checked
            }
        )

    }

    return (
        <UI 
            Form={ Form } 
            CandidateImage={ CandidateImage } 
            UploadImage={ UploadImage } 
            OnChangeHandler={ OnChangeHandler } 
            NewCandidate={ NewCandidate } 
            Token={ Token }
            CallCandidate={ CallCandidate }
            DiscardToken={ DiscardToken }
            SetCandidateData={ SetCandidateData }
            Tests={ Tests }
            onChangeTest={ onChangeTest }
        />
    );
}

export default Candidateinformation;