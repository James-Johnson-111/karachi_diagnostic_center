import React, { useState } from "react";
import './LaboratoryInformation.css';

import Input from "../../../../../components/Input/Input";
import Grid from "../../../../../components/Grid/Grid";

import moment from "moment";

const LaboratoryInformation = () => {

    const [Duration, setDuration] = useState("");

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



    const onChangeVaccinationDate = (e) => {

        const { value } = e.target;

        const d = new Date(value);
        let year = d.getFullYear().toString();
        let month = (d.getMonth() + 1).toString().length === 1 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1).toString();
        let date = d.getDate().toString().length === 1 ? "0" + d.getDate() : d.getDate().toString();

        const D = moment(year + month + date, "YYYYMMDD").fromNow();

        setDuration(D);

    }

    return (
        <>

            <form className="LaboratoryInformation" onSubmit="#">

                <Grid columns="1" gap="20px" unit="60fr 40fr">

                    <div className="GridDiv">

                        <div className="info_container">

                            <h3>General</h3>

                            <div className="InputGrid">

                                <Input value={Form.general_appearence} label="Blood Group" onChange={OnChangeHandler} name="general_appearence" />

                                <Input value={Form.cardio_vascular} label="Hemogloben" onChange={OnChangeHandler} name="cardio_vascular" />

                                <Input value={Form.respiratory} label="Respiratory" onChange={OnChangeHandler} name="respiratory" />

                            </div>

                            <p> Thick Film for </p>

                            <div className="d-flex">

                                <Input value={Form.Abdomen} label="Malaria" onChange={OnChangeHandler} name="Abdomen" />

                                <Input value={Form.hernia} label="Microfilaria" onChange={OnChangeHandler} name="hernia" />


                            </div>

                            <p> Biochemistry </p>

                            <div className="InputGrid">

                                <Input value={Form.hydrocele} label="RBS" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="LFT" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="Creatinine" onChange={OnChangeHandler} name="hydrocele" />

                            </div>


                            <p>Serology</p>

                            <div className="InputGrid">

                                <Input value={Form.hydrocele} label="HIV" span="I & II" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="HBS Ag" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="Anti HCV" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="VDRL" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="TPHA" span="If VDRL positive" onChange={OnChangeHandler} name="hydrocele" />

                            </div>

                            <div className="d-flex">

                                <div className="w-100 mr-1">
                                    <p> Urine </p>

                                    <Input value={Form.Abdomen} label="Sugar" onChange={OnChangeHandler} name="Abdomen" />

                                    <Input value={Form.hernia} label="Albumin" onChange={OnChangeHandler} name="hernia" />

                                </div>

                                <div className="w-100 ml-1">
                                    <p> Covid - 19</p>

                                    <Input value={Form.Abdomen} label="Covid PCR" onChange={OnChangeHandler} name="Abdomen" />

                                    <Input value={Form.hernia} label="Covid Antibodies" onChange={OnChangeHandler} name="hernia" />

                                </div>

                            </div>

                            <p>Stool</p>

                            <div className="InputGrid">

                                <Input value={Form.hydrocele} label="Helminthes" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="Ova" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="Cyst" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="VDRL" onChange={OnChangeHandler} name="hydrocele" />

                                <Input value={Form.hydrocele} label="Others" onChange={OnChangeHandler} name="hydrocele" />

                            </div>

                        </div>

                    </div>


                    <div className="GridDiv">

                        <div className="info_container">

                            <h3>Vaccination</h3>

                            <p>Vaccination Status</p>

                            <div className="d-flex">

                                <div className="Inputs mr-1">
                                    <label> Polio </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach" >
                                        <option value="yes">Yes</option>
                                        <option value="nO">No</option>
                                    </select>
                                </div>

                                <div className="Inputs ml-1">
                                    <input type="date" required className="form-control" name="behaviour" />
                                </div>

                            </div>

                            <div className="d-flex">

                                <div className="Inputs mr-1">
                                    <label> MMR 1 </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach" >
                                        <option value="yes">Yes</option>
                                        <option value="nO">No</option>
                                    </select>
                                </div>

                                <div className="Inputs ml-1">
                                    <input type="date" required className="form-control" name="behaviour" />
                                </div>

                            </div>

                            <div className="d-flex">

                                <div className="Inputs mr-1">
                                    <label> MMR 2 </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach">
                                        <option value="yes">Yes</option>
                                        <option value="nO">No</option>
                                    </select>
                                </div>

                                <div className="Inputs ml-1">
                                    <input type="date" required className="form-control" name="behaviour" />
                                </div>

                            </div>

                            <div className="d-flex">

                                <div className="Inputs mr-1">
                                    <label> Meningococcal </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach" >
                                        <option value="yes">Yes</option>
                                        <option value="nO">No</option>
                                    </select>
                                </div>

                                <div className="Inputs ml-1">
                                    <input type="date" required className="form-control" name="behaviour" />
                                </div>

                            </div>

                            <p>Covid-19</p>

                            <div className="d-flex">

                                <div className="Inputs mr-1">
                                    <label> status </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach" >
                                        <option value=""></option>
                                        <option value="Partially_vaccinated">Partially vaccinated</option>
                                        <option value="Fully_vaccinated">Fully vaccinated</option>
                                        <option value="Non_vaccinated">Non vaccinated</option>
                                    </select>
                                </div>

                                {/* Reference: https://covid19.trackvaccines.org/country/pakistan/ */}

                                <div className="Inputs ml-1">
                                    <label> Dose type </label>
                                    <select value={Form.speach} onChange={OnChangeHandler} type="text" required className="form-control" name="speach" >
                                        <option value=""></option>
                                        <option value="Moderna">Moderna</option>
                                        <option value="Pfizer/BioNTech">Pfizer/BioNTech</option>
                                        <option value="Sinopharm_(Beijing)">Sinopharm (Beijing)</option>
                                        <option value="Sinovac">Sinovac</option>
                                        <option value="Oxford/AstraZeneca">Oxford/AstraZeneca</option>
                                        <option value="CanSino">CanSino</option>
                                        <option value="Gamaleya">Gamaleya</option>
                                        <option value="Anhui_Zhifei_Longcom">Anhui Zhifei Longcom</option>
                                        <option value="Livzon_Mabpharm_Inc">Livzon Mabpharm Inc</option>
                                    </select>
                                </div>

                            </div>

                            <div className="d-flex">


                                <div className="Inputs mr-1">
                                    <input type="date" required onChange={onChangeVaccinationDate} className="form-control" name="behaviour" />
                                </div>

                                <div className="Inputs ml-1">
                                    <input disabled type="text" value={Duration} required className="form-control" name="behaviour" />
                                </div>

                            </div>

                        </div>

                        <div className="LaboratoryInformation_Button">
                            <button type="submit" className="btn btn-block">Submit</button>
                        </div>

                    </div>

                </Grid>


            </form>

        </>
    )
}
export default LaboratoryInformation;
