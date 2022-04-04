import React, { useState, useRef, useEffect } from 'react';
import './UI.css';

import Modal from '../../../../../components/Modal/Modal';
import Webcam from 'react-webcam';
import axios from '../../../../../axios';

import Delete from '../../../../../assets/Icons/trash (1).svg';
import Next from '../../../../../assets/Icons/arrow-right-circle.svg';

import Input from '../../../../../components/Input/Input';
import Grid from '../../../../../components/Grid/Grid';

import ReactTooltip from 'react-tooltip';
import $ from 'jquery';

const UI = (props) => {

    const refs = useRef();

    const videoConstraints = {
        width: '100% !important',
        facingMode: 'user'
    }

    const [Candidates, setCandidates] = useState([]);
    const [Content, setContent] = useState(<></>);
    const [Token, setToken] = useState('');
    const [Show, setShow] = useState(false);

    useEffect(
        () => {

            if (props.CandidateImage.image !== null) {
                setShow(false);
            }

        }, [props.CandidateImage.image]
    )

    useEffect(
        () => {

            setToken(props.Token);

        }, [props.Token]
    )

    const OpenModel = () => {

        setContent(
            <div className="w-100">
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={refs}
                    videoConstraints={videoConstraints}
                    height={100 + '%'}
                    width={100 + '%'}
                    imageSmoothing
                    forceScreenshotSourceSize="true"
                />
                <button type="button" className="btn btn-dark btn-block mt-3 border-0" onClick={takePhoto}>TAKE PHOTO</button>
            </div>
        )

        ShowHide();

    }

    const ShowHide = () => {

        setShow(!Show);

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

        props.UploadImage(val);

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

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const NewCandidate = (e) => {

        e.preventDefault();

        if (props.CandidateImage.image === null) {
            alert("Please take the candidate photo");
        } else {
            props.NewCandidate(e);
        }

    }

    const OnSearchCandidate = (e) => {

        const { value } = e.target;
        if (value === '') {
            setCandidates([]);
            return false;
        }

        axios.post(
            '/searchcandidatebypassport',
            {
                passport: value
            }
        ).then(
            res => {

                setCandidates(res.data);

            }
        ).catch(
            err => {

                console.log(err);

            }
        )

    }

    const SelectCandidate = (index) => {

        let candidate = Candidates[index];
        props.SetCandidateData(candidate);
        setCandidates([]);
        $('input[name=candidatePassportNumber]').val('');

    }

    return (
        <div className="CandidateInformations">

            <Modal show={Show} close={ShowHide}>
                {Content}
            </Modal>

            <Grid columns="2" gap="20px" unit="50fr">

                <div className="Inputs">
                    <label className="text-uppercase" style={{ background: "none" }}> CURRENT TOKEN </label>
                    <div className="d-flex">
                        <input disabled value={Token} type="text" required className="form-control rounded-0 border-0 font-italic font-weight-bolder shadow-sm" name="candidate_name" />
                        <div className="btn-group">
                            <button onClick={() => props.DiscardToken()} className='btn' data-tip="Discard The Current Token">
                                <img src={Delete} width="15" height="15" alt="Delete Icon" />
                            </button>
                            <button onClick={() => props.CallCandidate()} className='btn' data-tip="Call The Candidate" style={{ backgroundColor: "#0BB783" }}>
                                <img src={Next} width="15" height="15" alt="Next Icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="Inputs">
                    <label className="text-uppercase" style={{ background: "none" }}> SEARCH CANDIDATE </label>
                    <input placeholder='By Passport Number' onKeyUp={OnSearchCandidate} type="search" required className="form-control rounded-0 border-0 shadow-sm" name="candidatePassportNumber" />
                    {
                        Candidates.length > 0
                            ?
                            <div className='candidateList'>

                                {
                                    Candidates.map(
                                        (val, index) => {

                                            return (
                                                <div onClick={() => SelectCandidate(index)} style={{ cursor: "pointer" }} key={index} className='d-flex align-items-center justify-content-around font-italic border-bottom'>

                                                    <div>

                                                        <small className='d-block font-weight-bold'>Name</small>
                                                        <small className='d-block'> {val.candidate_name} </small>

                                                    </div>
                                                    <div>

                                                        <small className='d-block font-weight-bold'>Age</small>
                                                        <small className='d-block'> {val.candidate_age} </small>

                                                    </div>
                                                    <div>

                                                        <small className='d-block font-weight-bold'>Passport</small>
                                                        <small className='d-block'> {val.candidate_passport_no} </small>

                                                    </div>

                                                </div>
                                            )

                                        }
                                    )
                                }

                            </div>
                            :
                            null
                    }
                </div>

            </Grid>

            <form onSubmit={NewCandidate}>

                <Grid columns="3" gap="20px" unit="37fr 37fr 26fr">

                    <div className="GridDiv">

                        <div className="info_container">

                            <h3>Candidate</h3>

                            <img
                                className="CandidaetImg"
                                src={
                                    props.CandidateImage.image === null
                                        ?
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        :
                                        props.CandidateImage.preview
                                } alt="Candidate"
                            />

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>G.H.C Code: </b>
                                <span> {props.Form.candidate_ghc} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Name: </b>
                                <span> {props.Form.candidate_name} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Age: </b>
                                <span> {props.Form.candidate_age} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Nationality: </b>
                                <span> {props.Form.candidate_nationality} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Gender: </b>
                                <span> {props.Form.candidate_gender} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Marital Status: </b>
                                <span> {props.Form.candidate_marital_status} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Profession: </b>
                                <span> {props.Form.candidate_profession} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Passport: </b>
                                <span> {props.Form.candidate_passport_no} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Passport Place of Issue: </b>
                                <span> {props.Form.candidate_passport_place_of_issue} </span>
                            </p>

                            <p className='font-italic' style={{ fontSize: '13px' }}>
                                <b>Travelling To: </b>
                                <span> {props.Form.travelling_to} </span>
                            </p>

                        </div>

                    </div>


                    <div className="GridDiv">

                        <div className="info_container">

                            <h3>Candidate Information</h3>

                            <Input value={props.Form.candidate_ghc} label="G.H.C Code" onChange={props.OnChangeHandler} name="candidate_ghc" />
                            <Input value={props.Form.candidate_name} label="Name" onChange={props.OnChangeHandler} name="candidate_name" />

                            <div className="d-flex w-100">

                                <Input value={props.Form.candidate_age} label="Age" onChange={props.OnChangeHandler} name="candidate_age" />

                                <Input value={props.Form.candidate_nationality} label="Nationality" onChange={props.OnChangeHandler} name="candidate_age" />

                            </div>

                            <div className="d-flex w-100">

                                <div className="Inputs mr-1 w-100">
                                    <label> Gender </label>
                                    <select value={props.Form.candidate_gender} required className="form-control" name="candidate_gender" onChange={props.OnChangeHandler}>
                                        <option value=""></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="Inputs ml-1 w-100">
                                    <label> Marital Status </label>
                                    <select value={props.Form.candidate_marital_status} required className="form-control" name="candidate_marital_status" onChange={props.OnChangeHandler}>
                                        <option value=""></option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                    </select>
                                </div>

                            </div>


                            <Input value={props.Form.candidate_profession} label="Profession" onChange={props.OnChangeHandler} name="candidate_profession" />

                            <Input value={props.Form.candidate_passport} label="Passport Number" onChange={props.OnChangeHandler} name="candidate_passport_no" />

                            <Input value={props.Form.candidate_passport_place_of_issue} label="Passport Place of Issue" onChange={props.OnChangeHandler} name="candidate_passport_place_of_issue" />

                            <Input value={props.Form.travelling_to} label="Travelling To" onChange={props.OnChangeHandler} name="travelling_to" />


                            <div className="CandidateInformations_Button">
                                <input required type="button" onClick={OpenModel} className="btn btn-block btn-light" value="Candidate Photo" />
                            </div>

                        </div>

                    </div>

                    <div className="GridDiv">

                        <div className="info_container">

                            <h3> Tests </h3>
                            
                            <div>
                                <input checked={ props.Tests.firstExamination } onChange={ props.onChangeTest } type="checkbox" name="firstExamination" value="firstExamination" />
                                <span className="ml-2">First Examination</span>
                            </div>
                            
                            <div>
                                <input checked={ props.Tests.secondExamination } onChange={ props.onChangeTest } type="checkbox" name="secondExamination" value="secondExamination" />
                                <span className="ml-2">Second Examination</span>
                            </div>
                            
                            {/* <div>
                                <input checked={ props.Tests.laboratory } onChange={ props.onChangeTest } type="checkbox" name="laboratory" value="laboratory" />
                                <span className="ml-2">Laboratory</span>
                            </div> */}
                            
                            <div>
                                <input checked={ props.Tests.xray } onChange={ props.onChangeTest } type="checkbox" name="xray" value="xray" />
                                <span className="ml-2">Xray</span>
                            </div>

                            <div className="CandidateInformations_Button mt-4">
                                <button type="submit" className="btn btn-block">Submit</button>
                            </div>

                        </div>

                    </div>

                </Grid>

            </form>
            <ReactTooltip />
        </div>
    );
}

export default UI;