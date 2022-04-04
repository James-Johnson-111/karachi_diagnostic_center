import React, { useEffect, useState } from "react";
import './Grid.css';

const Grid = ( props ) => {

    const [ Style, setStyle ] = useState(
        {
            gridTemplateColumns: '',
            gridColumnGap: ''
        }
    )

    useEffect(
        () => {

            let grid;
            if ( props.unit.split('fr').length === 2 )
            {
                grid = "repeat(" + props.columns +", " + props.unit + ")";
            }else
            {
                grid = props.unit;
            }

            setStyle(
                {
                    display: 'grid',
                    gridTemplateColumns: grid,
                    gridGap: props.gap
                }
            )

        }, [ props.columns, props.gap, props.unit ]
    )

    return (

        <>
            <div className="Grid" style={ Style }>
                { props.children }
            </div>
        </>

    )

}

export default Grid;
