import React from 'react';
import './CandidateInWaiting.css';

import icon1 from '../../../assets/Icons/users.svg';

const CandidateInWaiting = () => {

  return (

    <>
        <div className='divs Tooltip CandidateListIcon' data-text="Candidate in Waiting" >

            <img src={icon1} alt="Candidate List Icon" />

            <div className="CandidateList">
                
                <h5 className="font-weight-bold mb-3">
                    Candidate in Waiting
                </h5>

                <div className="Candidate ListItem">

                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                        width="50" 
                        height="50" 
                        className="rounded-circle" 
                        alt="Candidate" 
                    />

                    <div className="w-100 pl-3">
                        
                        <div className="w-100 d-flex align-items-center justify-content-between">
                            <p>Usman Badar</p>
                            <p> Token: 0001 </p>
                        </div>
                        <div className="w-100 d-flex align-items-center justify-content-between">
                            <p>
                                15 minutes ago
                            </p>
                            <p className="CallCandidate"> Call Candidate </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </>

  )

}

export default CandidateInWaiting