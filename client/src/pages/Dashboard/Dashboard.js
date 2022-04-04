import React, { lazy, Suspense, useEffect } from 'react';
import './Dashboard.css';

import axios from '../../axios';

import { Route, useHistory } from 'react-router-dom';
// REACT REDUX
import { useSelector, useDispatch } from 'react-redux';
// REDUX ACTIONS/METHDS
import { MenuItems, UserLogin, PopupMessage } from '../../Redux/Actions/Action';

const TopBar = lazy( () => import("../../components/TopBar/TopBar") );
const Menu = lazy( () => import('../../components/Menu/Menu') );
const Widget = lazy( () => import('../../components/Widget/Widget') );
const Popup = lazy( () => import('../../components/Popup/Popup') );

const Home = lazy( () => import('./Pages/Home/Home') );
const Candidate = lazy( () => import('./Pages/Candidate/Candidate') );
const Report = lazy( () => import('./Pages/Reports/Reports') );
const CreateUser = lazy( () => import('./Pages/CreateUser/CreateUser') );
const Profile = lazy( () => import('./Pages/Profile/Profile') );

const Dashboard = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const Items = useSelector( ( state ) => state.SetMenuItems.Items );

    useEffect(
        () => {

            dispatch( MenuItems( window.location.href ) );

            // IF USER DON'T HAVE LOGIN ID
            if ( !sessionStorage.getItem("ID") )
            {
                history.replace('/login');
            }else // IF USER HAS LOGIN ID
            {

                axios.post(
                    '/getuserdata',
                    {
                        loginID: parseInt( sessionStorage.getItem("ID") )
                    }
                ).then(
                    res => {

                        dispatch( UserLogin( res.data[0] ) );
                        // dispatch( 
                        //     PopupMessage(
                        //         {
                        //             title: "Welcome",
                        //             message: "You are welcome to Karachi Diagnostic Center"
                        //         }
                        //     )
                        // )

                    }
                ).catch(
                    err => {

                        console.log( err );
                        window.history.back();

                    }
                )

            }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ window.location.href ]
    )

    const Sus = ( props ) => {
  
      return <Suspense fallback={ <div>Loading...</div> }> { props.content } </Suspense>
  
    }

    return (
        <div>
            <Sus
                content={
                    <>
                        <TopBar />
                        <Menu items={ Items } />
                        <Widget />
                        <Popup />
                    </>
                }
            />

            <div className="content">
                <Route exact path="/dashboard" render={ () => <Sus content={ <Home /> } /> } />
                <Route exact path="/candidate" render={ () => <Sus content={ <Candidate /> } /> } />
                <Route exact path="/report" render={ () => <Sus content={ <Report /> } /> } />
                <Route exact path="/candidate/view=:view" render={ () => <Sus content={ <Candidate /> } /> } />
                <Route exact path="/users/view=create" render={ () => <Sus content={ <CreateUser /> } /> } />
                <Route exact path="/users/view=profile" render={ () => <Sus content={ <Profile /> } /> } />
            </div>
            
        </div>
    );

}

export default Dashboard;