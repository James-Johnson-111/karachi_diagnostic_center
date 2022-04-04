import React, { useEffect, useState } from "react";
import './TopBar.css';

import $ from 'jquery';

import searchIcon from '../../assets/Icons/search.svg';
import barIcon from '../../assets/Icons/bar-chart-2.svg';
import gridIcon from '../../assets/Icons/grid.svg';
import chatIcon from '../../assets/Icons/message-square.svg';
import userIcon from '../../assets/Icons/user.svg';
import menuIcon from '../../assets/Icons/menu.svg';

import { NavLink } from "react-router-dom";

const TopBar = () => {

    const [Dimensions, setDimensions] = useState(
        {
            width: 0,
            height: 0
        }
    )

    useEffect(
        () => {

            $('.Topbar_second').slideUp(0);

            $('.Topbar_second a').on(
                'click', () => {

                    SlideTopbar();

                }
            )

            setDimensions(
                {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            )

            window.addEventListener(
                'resize', () => {

                    setDimensions(
                        {
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                    )

                }
            )

        }, []
    );

    const SlideTopbar = () => {

        $('.Topbar_second').slideToggle();

    }

    return (
        <>
            <div className="TopBar">

                {
                    Dimensions.width > 992
                        ?
                        <div className="TopBarCenter">

                            <div className="TopBar_Content1">

                                <NavLink to="/dashboard" className="Divs" activeClassName="active">
                                    Dashboard
                                </NavLink>

                                <NavLink to="/candidate" className="Divs" activeClassName="active">
                                    Candidate Information
                                </NavLink>

                                <NavLink to="/report" className="Divs" activeClassName="active">
                                    Report
                                </NavLink>

                            </div>

                            <div className="TopBar_Content2">

                                <div className="Divs">
                                    <div className="hoverdiv">
                                        <img src={searchIcon} alt="" style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className="Divs">
                                    <div className="hoverdiv">
                                        <img src={barIcon} alt="" style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className="Divs">
                                    <div className="hoverdiv">
                                        <img src={gridIcon} alt="" style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className="Divs">
                                    <div className="hoverdiv">
                                        <img src={chatIcon} alt="" style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className="Divs">
                                    <NavLink to="/users/view=profile" className="hoverdiv">
                                            <img src={userIcon} alt="" style={{ color: 'white' }} />
                                    </NavLink>
                                </div>

                                <NavLink to="/users/view=create" className="createNew Divs">
                                    <p>Create New</p>
                                </NavLink>

                            </div>

                        </div>
                        :
                        <>
                            <div className="TopBar_Small">

                                <div></div>

                                <div className="CenterIcons">
                                    <div className="hoverdiv">
                                        <img src={searchIcon} alt="" style={{ color: 'white', width: "65%" }} />
                                    </div>

                                    <div className="hoverdiv">
                                        <img src={gridIcon} alt="" style={{ color: 'white', width: "65%" }} />
                                    </div>

                                    <div className="hoverdiv">
                                        <img src={chatIcon} alt="" style={{ color: 'white', width: "65%" }} />
                                    </div>

                                    <NavLink to="/users/view=profile" className="hoverdiv">
                                        <img src={userIcon} alt="" style={{ color: 'white', width: "65%" }} />
                                    </NavLink>
                                </div>

                                <div className="hoverdiv">
                                    <img src={menuIcon} onClick={SlideTopbar} alt="bars" />
                                </div>

                            </div>

                            <div className="Topbar_second" style={{ display: 'none' }}>
                                <div className="Topbar_secondDIv">
                                    <div>
                                        <NavLink to="/dashboard" className="TB_2_Link" activeClassName="active">
                                            Dashboard
                                        </NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/candidate" className="TB_2_Link" activeClassName="active">
                                            Candidate Information
                                        </NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/report" className="TB_2_Link" activeClassName="active">
                                            Report
                                        </NavLink>
                                    </div>
                                    <div className="createNew">
                                        <NavLink to="/users/view=create" className="text-light">
                                            <p>Create New</p>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                }

            </div>
        </>
    )

}
export default TopBar;