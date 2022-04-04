import React from 'react';

// REACT REDUX
import { useSelector, useDispatch } from 'react-redux';
import { UserLogin } from '../../../Redux/Actions/Action';
import axios from '../../../axios';

import { useHistory } from 'react-router-dom';

import logout from '../../../assets/Icons/log-out.svg';

const Logout = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const User = useSelector( ( state ) => state.OnUserLogin.user );

    const Logout = () => {

        if ( User.user_roll === "C" )
        {
            axios.post(
                '/logoutcounter',
                {
                    user_id: User.user_id
                }
            ).then(
                res => {

                    history.replace('/login');

                }
            )
        }
        dispatch( UserLogin({}) );
        sessionStorage.removeItem('ID');

    }

  return (

    <div onClick={ Logout } className='divs Tooltip' data-text="Logout">

        <img src={logout} alt="Logout" />

    </div>
    
  )

}

export default Logout