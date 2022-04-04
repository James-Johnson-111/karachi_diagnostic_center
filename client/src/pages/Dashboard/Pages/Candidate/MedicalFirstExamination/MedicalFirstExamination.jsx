import React, { useState } from "react";
import './MedicalFirstExamination.css';

import Input from "../../../../../components/Input/Input";

import axios from '../../../../../axios';
import Grid from "../../../../../components/Grid/Grid";

const MedicalFirstExamination = () => {

    const d = new Date();

    const [ Form, setForm ] = useState(
        {
            height: "",
            weight: "",
            body_mass_index: "",
            blood_pressure: "",
            pr: "",
            unaided_distant_lt_eye: "",
            unaided_distant_rt_eye: "",
            unaided_near_lt_eye: "",
            unaided_near_rt_eye: "",
            aided_distant_lt_eye: "",
            aided_distant_rt_eye: "",
            aided_near_lt_eye: "",
            aided_near_rt_eye: "",
            left_ear: "",
            right_ear: ""
        }
    )

    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const val = {
            ...Form,
            [name]: value
        }

        setForm( val );

    }

    const OnFirstMedicalExamination = ( e ) => {

        e.preventDefault();
        const values = {
            height: Form.height,
            weight: Form.weight,
            body_mass_index: Form.body_mass_index,
            blood_pressure: Form.blood_pressure,
            pr: Form.pr,
            unaided_distant_lt_eye: Form.unaided_distant_lt_eye + '/6',
            unaided_distant_rt_eye: Form.unaided_distant_rt_eye + '/6',
            unaided_near_lt_eye: Form.unaided_near_lt_eye + '/20',
            unaided_near_rt_eye: Form.unaided_near_rt_eye + '/20',
            aided_distant_lt_eye: Form.aided_distant_lt_eye + '/6',
            aided_distant_rt_eye: Form.aided_distant_rt_eye + '/6',
            aided_near_lt_eye: Form.aided_near_lt_eye + '/20',
            aided_near_rt_eye: Form.aided_near_rt_eye + '/20',
            left_ear: Form.left_ear,
            right_ear: Form.right_ear,
            insert_by: sessionStorage.getItem("ID"),
            date_time: d
        }

        axios.post(
            "/firstmedicalexam",
            {
                data: values
            }
        ).then(
            res => {

                alert("Record Inserted");

            }
        ).catch(
            err => {

                alert("Error");
                console.log( err );

            }
        )

    }

    const OnEnterToken = ( e ) => {

        if ( e.keyCode === 13 )
        {

            const token = parseInt( e.target.value );

            axios.post(
                "/getcandidatedetailsontoken",
                {
                    token: token,
                    date_time: d
                }
            ).then(
                res => {
    
                    console.log( res.data );
                    alert("Record Inserted");
    
                }
            ).catch(
                err => {
    
                    alert("Error");
                    console.log( err );
    
                }
            )

        }

    }

    return (
        <>

            <div className="MedicalFirstExamination">

                <input type="text" className="form-control mb-3 mx-auto rounded-0 border-0" onKeyUp={ OnEnterToken } placeholder="TOKEN NUMBER" style={ { width: "70%" } } />

                <form onSubmit={ OnFirstMedicalExamination }>

                    <Grid columns="3" gap="30px" unit="33.33fr">

                        <div className="GridDiv">

                            <div className="info_container">

                                <h3>General Information</h3>

                                <Input type="number" value={Form.height} label="Height" span="cm" onChange={OnChangeHandler} name="height" />

                                <Input type="number" value={Form.weight} label="Weight" span="kg" onChange={OnChangeHandler} name="weight" />

                                <Input value={Form.body_mass_index} label="Body Mass Index" span="BMI" onChange={OnChangeHandler} name="body_mass_index" />

                                <Input value={Form.blood_pressure} label="Blood Pressure" span="BP" onChange={OnChangeHandler} name="blood_pressure" />

                                <Input value={Form.pulse} label="Pulse" span="/m" onChange={OnChangeHandler} name="pulse" />

                                <Input value={Form.pr} label="PR" span="/m" onChange={OnChangeHandler} name="pr" />

                            </div>

                        </div>


                        <div className="GridDiv">

                            <div className="info_container">

                                <h3>Eye Information</h3>

                                <p className="font-weight-bolder text-center mb-3">Unaided</p>

                                <div className="d-flex">

                                    <Input type="number" max="6" value={Form.unaided_distant_lt_eye} label="Distant LT Eye" span="/6" onChange={OnChangeHandler} name="unaided_distant_lt_eye" />

                                    <Input type="number" max="6" value={Form.unaided_distant_rt_eye} label="Distant RT Eye" span="/6" onChange={OnChangeHandler} name="unaided_distant_rt_eye" />

                                </div>

                                <div className="d-flex">

                                    <Input type="number" max="20" value={Form.unaided_near_lt_eye} label="Near LT Eye" span="20/" onChange={OnChangeHandler} name="unaided_near_lt_eye" />

                                    <Input type="number" max="20" value={Form.unaided_near_rt_eye} label="Near RT Eye " span="20/" onChange={OnChangeHandler} name="unaided_near_rt_eye" />

                                </div>

                                <p className="font-weight-bolder text-center mb-3">Aided</p>

                                <div className="d-flex">

                                    <Input type="number" max="6" value={Form.aided_distant_lt_eye} label="Distant LT Eye" span="/6" onChange={OnChangeHandler} name="aided_distant_lt_eye" />

                                    <Input type="number" max="6" value={Form.aided_distant_rt_eye} label="Distant RT Eye" span="/6" onChange={OnChangeHandler} name="aided_distant_rt_eye" />

                                </div>

                                <div className="d-flex">


                                    <Input type='number0' max='20' value={Form.aided_near_lt_eye} label="Near LT Eye" span="20/" onChange={OnChangeHandler} name="aided_near_lt_eye" />

                                    <Input type='number0' max='20' value={Form.aided_near_rt_eye} label="Near RT Eye" span="20/" onChange={OnChangeHandler} name="aided_near_rt_eye" />

                                </div>

                            </div>

                        </div>

                        <div className="GridDiv">

                            <div className="info_container">

                                <h3>Ear Information</h3>

                                <Input value={Form.left_ear} label="Light Ear" onChange={OnChangeHandler} name="left_ear" />

                                <Input value={Form.right_ear} label="Right Ear" onChange={OnChangeHandler} name="right_ear" />

                            </div>

                        </div>

                        <div className="GridDiv"></div>

                        <div className="GridDiv">

                            <div className="MedicalFirstExamination_Button">
                                <button type="submit" className="btn btn-block">Submit</button>
                            </div>
                        </div>
                    </Grid>


                </form>

            </div>

        </>
    )
}
export default MedicalFirstExamination;
