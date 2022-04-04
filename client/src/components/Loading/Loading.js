import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.jpg';

const Loading = ( props ) => {

    const [ Style, setStyle ] = useState({});

    useEffect(
        () => {

            setStyle(
                {
                    position: props.position ? props.position : "fixed",
                    top: props.top ? props.top : 0,
                    left: props.left ? props.left : 0,
                    width: props.width ? props.width : '100%',
                    height: props.height ? props.height : '100%'
                }
            )

        }, [props.height, props.left, props.position, props.top, props.width]
    )

    return (
        <div className="Loading d-flex align-items-center justify-content-center bg-white" style={ Style }>
            
            <div>
                {
                    props.icon
                    ?
                    <>
                        <img className='d-block mx-auto' src={ props.icon } alt="Loading Icon" width='50' height='50' />
                        <p className="mb-0 mt-3 text-center"> { props.text ? props.text : "Loading...." } </p>
                    </>
                    :
                    <>
                        <img className='d-block mx-auto logoIcon' src={ Logo } alt="Loading Icon" width='150' height='130' />
                    </>
                }
            </div>

        </div>
    );

}

export default Loading;