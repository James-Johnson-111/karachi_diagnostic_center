import React, { useState } from 'react';
import './CreateUser.css';


import Modal from '../../../../components/Modal/Modal';
import Webcam from 'react-webcam';

const CreateUser = () => {

    
    const [ Content, setContent ] = useState( <></> );
    const [ Show, setShow ] = useState( false );


    const OpenModel = () => {

        setContent(
            <div className="w-100">
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    height = {100 + '%'}
                    width = {100 + '%'}
                    imageSmoothing
                    forceScreenshotSourceSize="true"
                />
                <button type="button" className="btn btn-dark btn-block mt-3 border-0">TAKE PHOTO</button>
            </div>
        )

        ShowHide();

    }

    
    const ShowHide = () => {

        setShow( !Show );

    }

    return (

        <div className='CreateUser'>

            <Modal show={Show} close={ShowHide}>
                {Content}
            </Modal>

            <form className="CreateUser_div" onSubmit="#">

                <div className="GridDiv">

                    <div className="info_container">

                        <h3>Create new Candidate</h3>

                        <img className="CandidaetImg" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" onClick={OpenModel} alt="" />

                        <div className="Inputs">
                            <label> User Login ID </label>
                            <input type="text" required className="form-control" name="candidate_name" />
                        </div>

                        <div className="Inputs">
                            <label> User Password </label>
                            <input type="text" required className="form-control" name="candidate_age" />
                        </div>

                        <div className="Inputs">
                            <label> Authority </label>
                            <input type="text" required className="form-control" name="candidate_nationality" />
                        </div>

                        <div className='Checkboxgrid'>

                            <div>
                                <label for="Check1"> Category 1</label>
                                <input type="checkbox" id="Check1" className='mx-2' />
                            </div>

                            <div>
                                <label for="Check1"> Category 1</label>
                                <input type="checkbox" id="Check1" className='mx-2' />
                            </div>

                            <div>
                                <label for="Check1"> Category 1</label>
                                <input type="checkbox" id="Check1" className='mx-2' />
                            </div>

                            <div>
                                <label for="Check1"> Category 1</label>
                                <input type="checkbox" id="Check1" className='mx-2' />
                            </div>

                        </div>

                        <div className="Inputs">
                            <label> User Role </label>
                            <input type="text" required className="form-control" name="candidate_profession" />
                        </div>

                    </div>

                    <div className="CreateUser_Button">
                        <button type="submit" className="btn btn-block">Create</button>
                    </div>

                </div>

            </form>

        </div>
    );
}

export default CreateUser;