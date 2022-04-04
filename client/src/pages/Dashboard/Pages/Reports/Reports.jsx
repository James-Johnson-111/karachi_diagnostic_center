import React from "react";
import './Reports.css';

import search from '../../../../assets/Icons/search.svg';
import user from '../../../../assets/Icons/user.svg'

const Reports = () => {

    return (

        <>

            <div className="Reports">

                <div className="Reports_Center_Container">

                    <h5>Search Candidate</h5>
                    <br />
                    <div className="Reports_Center">

                        <div className="SearchDiv">

                            <div className="SearchIcon">
                                <img src={search} alt="" />
                            </div>

                            <label>Search by Name</label>
                            <input type="search" className="form-control" />

                        </div>

                        <div className="SearchDiv">

                            <div className="SearchIcon">
                                <img src={search} alt="" />
                            </div>

                            <label>Search by Date</label>
                            <input type="date" className="form-control" />

                        </div>

                        <div className="SearchDiv">

                            <div className="SearchIcon">
                                <img src={search} alt="" />
                            </div>

                            <label>Search by Token No</label>
                            <input type="search" className="form-control" />

                        </div>

                    </div>
                </div>

                <div className="Report_List">

                    <p>Total records found : 04</p>

                    <div className="List_Details">

                        <div className="Index">
                            <h5>01</h5>
                        </div>

                        <div className="Image">
                            <img src={user} alt="" />
                        </div>

                        <div className="Info">
                            <p>Candidate Name</p>
                            <h5>Muhammad Malahim</h5>
                        </div>

                        <div className="Info">
                            <p>Candidate Passport</p>
                            <h5>262215632596522</h5>
                        </div>

                        <div className="Info">
                            <p>Traveling to</p>
                            <h5>Canada</h5>
                        </div>

                    </div>

                    <hr />

                    <div className="List_Details">

                        <div className="Index">
                            <h5>02</h5>
                        </div>

                        <div className="Image">
                            <img src={user} alt="" />
                        </div>

                        <div className="Info">
                            <p>Candidate Name</p>
                            <h5>Muhammad Malahim</h5>
                        </div>

                        <div className="Info">
                            <p>Candidate Passport</p>
                            <h5>262215632596522</h5>
                        </div>

                        <div className="Info">
                            <p>Traveling to</p>
                            <h5>Canada</h5>
                        </div>

                    </div>

                    <hr />

                    <div className="List_Details">

                        <div className="Index">
                            <h5>03</h5>
                        </div>

                        <div className="Image">
                            <img src={user} alt="" />
                        </div>

                        <div className="Info">
                            <p>Candidate Name</p>
                            <h5>Muhammad Malahim</h5>
                        </div>

                        <div className="Info">
                            <p>Candidate Passport</p>
                            <h5>262215632596522</h5>
                        </div>

                        <div className="Info">
                            <p>Traveling to</p>
                            <h5>Canada</h5>
                        </div>

                    </div>

                    <hr />

                    <div className="List_Details">

                        <div className="Index">
                            <h5>04</h5>
                        </div>

                        <div className="Image">
                            <img src={user} alt="" />
                        </div>

                        <div className="Info">
                            <p>Candidate Name</p>
                            <h5>Muhammad Malahim</h5>
                        </div>

                        <div className="Info">
                            <p>Candidate Passport</p>
                            <h5>262215632596522</h5>
                        </div>

                        <div className="Info">
                            <p>Traveling to</p>
                            <h5>Canada</h5>
                        </div>

                    </div>

                </div>

                

            </div>

        </>
    )

}

export default Reports;