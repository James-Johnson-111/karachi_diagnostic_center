import React, { lazy, Suspense } from "react";
import './Widget.css';

import icon2 from '../../assets/Icons/bar-chart-2.svg';

const Logout = lazy( () => import('./Logout/Logout') );
const CandidateInWaiting = lazy( () => import('./CandidateInWaiting/CandidateInWaiting') );

const Widget = () => {

    return (
        <>
            <div className='widget'>

                <div className='widget_div'>
                    
                    <Suspense fallback={ <div>...</div> }>
                        <CandidateInWaiting />
                    </Suspense>

                    <div className='divs Tooltip' data-text="Screeshot">

                        <img src={icon2} alt="" />

                    </div>

                    <Suspense fallback={ <div>...</div> }>
                        <Logout />
                    </Suspense>

                </div>

            </div>

        </>
    )
}
export default Widget;
