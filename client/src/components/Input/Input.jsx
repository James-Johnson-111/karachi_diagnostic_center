import React from "react";
import './Input.css';

const Input = ( props ) => {

    return (

        <>

            <div className="Inputs">
                <label> {props.label} </label>
                <span> { props.span } </span>
                <input 
                    value={props.value} 
                    type={ props.type ? props.type : "text" } 
                    onChange={props.onChange} 
                    required 
                    className="form-control" 
                    name={props.name} 
                    max={ props.max ? props.max : undefined } 
                    maxLength={ props.maxLength ? props.maxLength : undefined } 
                />
            </div>

        </>

    )

}

export default Input;