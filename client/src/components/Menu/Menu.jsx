import React, { useEffect } from "react";
import './Menu.css';

import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';

const Menu = (props) => {

    useEffect(
        () => {

            $('.Menu .Menu_Center .tabItem').first().addClass('underline');

            $('.Menu .Menu_Center .Menu_Overflow').on(
                'scroll', () => {

                    let div = document.getElementById('Menu_Overflow');

                    const { scrollLeft } = div;

                }
            )

        }
    )

    const SetActive = (index) => {

        $('.Menu .Menu_Center .tabItem').removeClass('underline');
        $('.Menu .Menu_Center .tabItem' + index).addClass('underline');

    }

    return (

        <>
            <div className="Menu">
                <div className="Menu_Center">
                    <div className="Menu_item">

                        <div>
                            <div>
                                <img src={Logo} width="120" alt='Logo' />
                            </div>
                        </div>

                    </div>
                    <div className="Menu_Overflow" id="Menu_Overflow">
                        {
                            props.items
                                ?
                                props.items.map(
                                    (val, index) => {

                                        if (val.link) {
                                            return (
                                                <NavLink activeClassName="underline" to={val.href} className={"Menu_item MyMenuItems"} key={index}>

                                                    <div className="border-right w-100 px-3">

                                                        <h5> {val.title} </h5>
                                                        <p> {val.description} </p>

                                                    </div>

                                                </NavLink>
                                            )
                                        } else {
                                            return (
                                                <div className={"Menu_item MyMenuItems tabItem tabItem" + index} key={index} onClick={() => val.function()}>

                                                    <div className="border-right w-100 px-3" onClick={() => SetActive(index)}>

                                                        <h5> {val.title} </h5>
                                                        <p> {val.description} </p>

                                                    </div>

                                                </div>
                                            )
                                        }

                                    }
                                )
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </>

    )

}
export default Menu;