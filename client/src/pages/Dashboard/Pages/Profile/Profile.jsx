import React, { useState } from "react";
import './Profile.css';

import Img2 from '../../../../assets/Icons/edit2.svg';

// REACT REDUX
import { useSelector } from 'react-redux';

const Profile = () => {

    const User = useSelector( ( state ) => state.OnUserLogin.user );

    const [ EditMode, setEditMode ] = useState( false );

    const EditProfile = () => {

        setEditMode( !EditMode );

    }

    return (

        <>

            <div className="Profile">
                <div className="Profile_Div">
                    <div className="Profile_Top">
                        <div className="Profile_Img">
                            <img src={ 'images/users/' + User.user_image } alt="user_img" />
                        </div>
                    </div>
                    <div className="ProfileContent">
                        <div className="Profile_button">
                            <button className="btn" onClick={ EditProfile }> 
                                <img src={Img2} alt="edit icon" /> 
                                Edit Profile
                            </button>
                        </div>

                        {
                            EditMode
                            ?
                            <div className="EditProfileContainer">

                                <div>
                                    
                                </div>

                            </div>
                            :
                            null
                        }

                    </div>
                </div>
            </div>

        </>

    )

}

export default Profile;