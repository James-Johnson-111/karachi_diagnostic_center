import React, { useState } from "react";
import './MedicalSecondExamination.css';

import Input from '../../../../../components/Input/Input';
import Grid from "../../../../../components/Grid/Grid";

const MedicalSecondExamination = () => {

    const [Form, setForm] = useState(
        {
            general_appearence: '',
            cardio_vascular: '',
            respiratory: '',
            ent: '',
            Abdomen: '',
            hernia: '',
            hydrocele: '',
            extremities: '',
            back: '',
            skin: '',
            cns: '',
            deformities: '',
            speach: '',
            behaviour: '',
            orientation: '',
            memory: '',
            concentration: '',
            mood: '',
            thoughts: '',
            others: '',
        }
    );

    const OnChangeHandler = (e) => {

        const { name, value } = e.target;
        const val = {
            ...Form,
            [name]: value
        }

        setForm(val);

    }

    return (
        <>

            <form className="MedicalSecondExamination" onSubmit="#">

                    <Grid columns="1" gap="20px" unit="60fr 40fr">


                        <div className="GridDiv">

                            <div className="info_container">

                                <h3>Systemic Information</h3>

                                <div className="InputGrid">

                                    <Input value={Form.general_appearence} label="General Appearence" onChange={OnChangeHandler} name="general_appearence" />

                                    <Input value={Form.cardio_vascular} label="Cardiovascular" onChange={OnChangeHandler} name="cardio_vascular" />

                                    <Input value={Form.respiratory} label="Respiratory" onChange={OnChangeHandler} name="respiratory" />

                                    <Input value={Form.ent} label="ENT" onChange={OnChangeHandler} name="ent" />

                                    <Input value={Form.skin} label="Skin" onChange={OnChangeHandler} name="skin" />

                                    <Input value={Form.cns} label="CNS" onChange={OnChangeHandler} name="cns" />

                                    <Input value={Form.deformities} label="Deformities" onChange={OnChangeHandler} name="cns" />

                                </div>

                                <p className="font-weight-bolder text-center mb-2">Gastro Intestinal</p>

                                <div className="d-flex">

                                    <Input value={Form.Abdomen} label="Abdomen" onChange={OnChangeHandler} name="Abdomen" />

                                    <Input value={Form.hernia} label="Hernia" onChange={OnChangeHandler} name="hernia" />

                                </div>

                                <p className="font-weight-bolder text-center"> Genitourinary </p>

                                <Input value={Form.hydrocele} label="Hydrocele" onChange={OnChangeHandler} name="hydrocele" />

                                <p className="font-weight-bolder text-center mb-2">Musculoskeletal</p>

                                <div className="d-flex">

                                    <Input value={Form.extremities} label="Extremities" onChange={OnChangeHandler} name="extremities" />

                                    <Input value={Form.back} label="Back" onChange={OnChangeHandler} name="back" />

                                </div>

                            </div>

                        </div>


                        <div className="GridDiv">

                            <div className="info_container">

                                <h3>Mental Status Information</h3>

                                <p className="font-weight-bolder text-center mb-2">Appearence</p>

                                <div className="d-flex">

                                    <Input value={Form.speach} label="Speach" onChange={OnChangeHandler} name="speach" />

                                    <Input value={Form.behaviour} label="Behaviour" onChange={OnChangeHandler} name="behaviour" />

                                </div>

                                <p className="font-weight-bolder text-center mb-2">Cognition</p>

                                <div className="d-flex">

                                    <Input value={Form.orientation} label="Orientation" onChange={OnChangeHandler} name="orientation" />

                                    <Input value={Form.memory} label="Memory" onChange={OnChangeHandler} name="memory" />

                                </div>

                                <Input value={Form.concentration} label="Concentration" onChange={OnChangeHandler} name="concentration" />

                                <Input value={Form.mood} label="Mood" onChange={OnChangeHandler} name="mood" />

                                <Input value={Form.thoughts} label="Thoughts" onChange={OnChangeHandler} name="thoughts" />

                                <Input value={Form.others} label="Others" onChange={OnChangeHandler} name="others" />

                            </div>

                            <div className="MedicalSecondExamination_Button">
                                <button type="submit" className="btn btn-block">Submit</button>
                            </div>

                        </div>
                    </Grid>

            </form>

        </>
    )
}
export default MedicalSecondExamination;
