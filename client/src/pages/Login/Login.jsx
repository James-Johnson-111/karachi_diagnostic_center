import React, { useEffect, useState } from 'react';

import UI from './UI';

import axios from '../../axios';
import { useHistory  } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

import Swal from 'sweetalert2';

const Login = () => {

    const history = useHistory();
    let key = 'real secret keys should be long and random';
 
    // Create an encryptor:
    let encryptor = require('simple-encryptor')(key);

    const [ Form, setForm ] = useState(
        {
            login_id: '',
            password: ''
        }
    )

    const [ ShowLoading, setShowLoading ] = useState(true);

    useEffect(
        () => {

            setShowLoading( false );

            if ( sessionStorage.getItem("ID") )
            {
                window.history.back();
            }

        }, []
    )

    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;

        const setValues = {

            ...Form,
            [name]: value

        }
        
        setForm( setValues );

    }

    const OnUserLogin = ( e ) => {

        e.preventDefault();
        setShowLoading( true );
        
        axios.post(
            '/getuser',
            {
                login_id: Form.login_id
            }
        ).then(
            response => {

                setShowLoading( false );

                if ( response.data[0].length > 0 )
                {

                    if ( encryptor.decrypt( response.data[0][0].user_password ) === Form.password )
                    {

                        sessionStorage.setItem("ID", response.data[0][0].user_id);
        
                        const Data = new FormData();
                        Data.append('log',  response.data[0][0].user_name + " Logged in" );Data.append('query', response.data[1]);Data.append('rslt', JSON.stringify( response ));
                        axios.post('/createlog', Data).then(() => {});
        
                        let link = '';

                        if ( response.data[0][0].user_roll === 'admin' ) {

                            link = '/dashboard';
                            history.replace(link);

                        } else if ( response.data[0][0].user_roll === 'C' ) {
                            
                            Swal.fire(
                                {
                                    title: 'Enter Your Counter Number',
                                    input: 'number',
                                    inputAttributes: {
                                    autocapitalize: 'off',
                                    placeholder: 'For Example: 1,2,3,4',
                                    max: 4,
                                    required: true
                                    },
                                    showCancelButton: false,
                                    confirmButtonText: 'Select Counter',
                                    showLoaderOnConfirm: true,
                                    preConfirm: ( counter ) => {

                                    return axios.post(
                                        "/setcountertouser",
                                        {
                                            counter: counter,
                                            user: response.data[0][0].user_id
                                        }
                                    ).then(
                                        () => {

                                            link = '/candidate/view=info';
                                            history.replace(link);

                                        }
                                    ).catch(
                                        err => {

                                            console.log( err );

                                        }
                                    )

                                    },
                                    allowOutsideClick: () => !Swal.isLoading()
                                }
                              )
                        }else
                        {
                            link = '/candidate';
                            history.replace(link);
                        }

                        
                    }else
                    {
                        Swal.fire(
                            {
                                title: 'Password Not Matched',
                                text: 'Your password is not matched with the registered password.',
                                icon: 'error',
                                showConfirmButton: false,
                                timer: 3000
                            }
                        )
                    }

                }else
                {
                    Swal.fire(
                        {
                            title: 'No User Found',
                            text: 'Please try again.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 3000
                        }
                    )
                }


            }
        ).catch(err => {

            Swal.fire(
                {
                    title: 'Network Error',
                    text: 'Please check your network connection.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000
                }
            )
            setShowLoading( false );

        });

    }

    return (

        <>
            <UI 
                OnChangeHandler={ OnChangeHandler }
                OnUserLogin={ OnUserLogin }
            />
            {
                ShowLoading
                ?
                <Loading />
                :
                null
            }
        </>

    );

}

export default Login;