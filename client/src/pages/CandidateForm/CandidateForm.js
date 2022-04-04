import React, { useState, useRef, useEffect } from 'react';

import './CandidateForm.css';

import Modal from '../../components/Modal/Modal';
import Webcam from 'react-webcam';
import axios from '../../axios';
import Cookies from 'js-cookie';

import $ from 'jquery';
import Input from '../../components/Input/Input';
import Swal from 'sweetalert2';

const Candidateform = () => {

    const refs = useRef();

    const videoConstraints = {
        width: '100% !important',
        facingMode: 'user'
    }

    const [ Form, setForm ] = useState(
        {
            candidate_ghc: "",
            candidate_name: "",
            travelling_to: "",
            candidate_age: "",
            candidate_nationality: "",
            candidate_cnic: "",
            candidate_gender: "",
            candidate_marital_status: "",
            candidate_profession: "",
            candidate_passport_no: "",
            candidate_passport_place_of_issue: ""
        }
    );
    const [ Content, setContent ] = useState( <></> );
    const [ Token, setToken ] = useState('');
    const [ Show, setShow ] = useState( false );
    const [ CandidateImage, setCandidateImage ] = useState(
        {
            image: null,
            preview: null
        }
    );

    useEffect(
        () => {

            let token = window.location.href.split('/').pop();
            token = parseInt( token );   

            axios.post( '/gettoken', { token: token, date_time: new Date() } ).then( response => {

                if ( response.data.length > 0 )
                {
                    
                    if ( Cookies.get("Record") )
                    {
                        if ( response.data[0].id === parseInt( Cookies.get("Record") ) )
                        {

                            const Data = new FormData();
                            Data.append('token', response.data[0].token_no);
                            Data.append('date_time', new Date());
        
                            axios.post('/getcurrentcandidate', Data).then(response => {
                                
                                setForm( response.data[0] );
                                setCandidateImage(
                                    {
                                        image: response.data[0].candidate_image,
                                        preview: 'images/candidates/' + response.data[0].candidate_image
                                    }
                                );

                                $('input').attr('disabled', true);
                                $('select').attr('disabled', true);
                                $('button').attr('disabled', true);
        
                            }).catch(error => {
        
                                console.log( error );
        
                            })

                        }

                        setToken( response.data[0].id );

                    }else
                    {
                        
                        setToken( response.data[0].id );

                    }
                    setForm(
                        {
                            ...Form,
                            candidate_gender: response.data[0].token_for
                        }
                    )

                }else
                {
                    window.history.back()
                }

            } ) 

        }, []
    )

    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const val = {
            ...Form,
            [name]: value
        }

        setForm( val );

    }

    const OpenModel = () => {

        setContent(
            <div className="w-100">
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={refs}
                    videoConstraints={videoConstraints}
                    height = {100 + '%'}
                    width = {100 + '%'}
                    imageSmoothing
                    forceScreenshotSourceSize="true"
                />
                <button type="button" className="btn btn-dark btn-block mt-3 border-0" onClick={ takePhoto }>TAKE PHOTO</button>
            </div>
        )

        ShowHide();

    }

    const takePhoto = () => {

        var screenshot = refs.current.getScreenshot();

        let block = screenshot.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = b64toBlob(realData, contentType);

        const val = {
            image: blob,
            preview: screenshot
        }
        
        setShow( false );
        setCandidateImage( val );

    }

    const b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
    
        var byteCharacters = atob(b64Data); // window.atob(b64Data)
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
    
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            var byteArray = new Uint8Array(byteNumbers);
    
            byteArrays.push(byteArray);
        }
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    const ShowHide = () => {

        setShow( !Show );

    }

    const OnCandidateSubmit = ( e ) => {

        e.preventDefault();

        if ( CandidateImage.preview !== null )
        {
            console.log( Form )
            const Data = new FormData();
            Data.append("token", Token);
            Data.append("formdata", JSON.stringify( Form ));
            Data.append("image", CandidateImage.image);
    
            axios.post(
                '/newcandidatebycandidate',
                Data,
                {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            ).then(
                () => {
                    
                    Cookies.set('Record', Token, { expires: 1 });
                    window.location.reload();
    
                    Swal.fire(
                        {
                            title: 'Success',
                            text: 'Record inserted. Thank You.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 3000
                        }
                    )
    
                }
            ).catch(
                err => {
    
                    Swal.fire(
                        {
                            title: 'Error',
                            text: 'Seems like there is an internet issue, try again.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 3000
                        }
                    )
                    console.log(err);
    
                }
            )
        }else
        {
            Swal.fire(
                {
                    title: 'Please take your photo',
                    text: 'Try again.',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 3000
                }
            )
        }

    }

    return (
        <div className="w-100 py-5 d-flex align-items-center justify-content-center contain">
            <form className="CandidateForm" onSubmit={ OnCandidateSubmit }>

                <Modal show={ Show } close={ ShowHide }>
                    { Content }
                </Modal>

                <h3>Candidate Information</h3>

                <img 
                    className="CandidaetImg" 
                    src={ 
                        CandidateImage.image === null 
                        ? 
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        :
                        CandidateImage.preview
                    } alt="Candidate" 
                />

                <Input value={Form.candidate_ghc} label="G.H.C Code" onChange={OnChangeHandler} name="candidate_ghc" />
                <Input value={Form.candidate_name} label="Name" onChange={OnChangeHandler} name="candidate_name" />
                <Input value={Form.candidate_age} label="Age" type="number" onChange={OnChangeHandler} name="candidate_age" />
                <Input value={Form.candidate_nationality} label="Nationality" onChange={OnChangeHandler} name="candidate_nationality" />
                <Input value={Form.candidate_cnic} label="C.N.I.C Number" onChange={OnChangeHandler} name="candidate_cnic" />

                <div className="d-flex w-100">

                    <div className="Inputs mr-1 w-100">
                        <label> Gender </label>
                        <select value={Form.candidate_gender} required disabled className="form-control" name="candidate_gender" onChange={OnChangeHandler}>
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="Inputs ml-1 w-100">
                        <label> Marital Status </label>
                        <select value={Form.candidate_marital_status} required className="form-control" name="candidate_marital_status" onChange={OnChangeHandler}>
                            <option value=""></option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>

                </div>

                <Input value={Form.candidate_profession} label="Profession" onChange={OnChangeHandler} name="candidate_profession" />
                <Input value={Form.candidate_passport_no} label="Passport Number" onChange={OnChangeHandler} name="candidate_passport_no" />
                <Input value={Form.candidate_passport_place_of_issue} label="Passport Place of Issue" onChange={OnChangeHandler} name="candidate_passport_place_of_issue" />
                <Input value={Form.travelling_to} label="Traveling To" onChange={OnChangeHandler} name="travelling_to" />

                <div className="CandidateInformations_Button mb-3">
                    <input required type="button" onClick={ OpenModel } className="btn btn-block btn-light" value="Candidate Photo" />
                </div>

                <div className="CandidateInformations_Button">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>

            </form>
        </div>
    );

}

export default Candidateform;