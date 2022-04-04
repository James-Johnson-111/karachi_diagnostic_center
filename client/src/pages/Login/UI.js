import React from 'react';

import './UI.css';

const UI = ( props ) => {

    return (

        // CONTAINER
        // LOGIN CONTAINER
        // PARENT DIV
        <div className="LoginPage Container d-flex align-items-center justify-content-center w-100 vh-100">
            
            {/* LOGIN CONTENT */}
            <div className="LoginContent popupHide">

                <h1 className="mb-3">LOGIN</h1>

                <form onSubmit={ props.OnUserLogin }>

                    {/* FOR LOGIN ID */}
                    <label className='mb-0'>LOGIN ID</label>
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                        name="login_id"
                        onChange={ props.OnChangeHandler }
                        required
                    />

                    {/* FOR LOGIN PASSWORD */}
                    <label className='mb-0'>PASSWORD</label>
                    <input 
                        type="password" 
                        className="form-control mb-3" 
                        name="password"
                        onChange={ props.OnChangeHandler }
                        required
                    />

                    {/* SUBMIT BUTTON */}
                    <button type='submit' className='btn px-5 d-block mx-auto'>LOGIN</button>

                </form>

            </div>

        </div>

    );
    
}

export default UI;