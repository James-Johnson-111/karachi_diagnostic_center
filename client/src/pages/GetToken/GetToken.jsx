/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';

import './GetToken.css';

import QRcode from 'qrcode';
import axios from '../../axios';

const GetToken = () => {

    const [ QRCode, setQRCode ] = useState('');
    const [ InitialNumber, setInitialNumber ] = useState( 0 );
    const [ ShowToken, setShowToken ] = useState( false );
    const [ Token, setToken ] = useState("");

    useEffect(
        () => {

            axios.post(
                '/gettokens',
                {
                    date_time: new Date()
                }
            ).then( res => {

                let tok = 0;
                if ( res.data[0] )
                {
                    tok = res.data[0].token_no;
                }

                setInitialNumber( tok );
    
            } ).catch( err => {

                console.log( err );
    
            } );
            

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    const getToken = ( gender ) => {

        let addition = InitialNumber + 1;
        setInitialNumber( addition );

        let token = addition.toString();
        let getLenth = token.length;
        let tokenTXT = null;

        if( getLenth === 1 )
        {
            tokenTXT = '000' + token;
        }

        if( getLenth === 2 )
        {
            tokenTXT = '00' + token;
        }

        if( getLenth === 3 )
        {
            tokenTXT = '0' + token;
        }

        if( getLenth === 4 )
        {
            tokenTXT = token;
        }
        
        let Url = 'https://192.168.10.116:3000/#/candidate/view=candidate/' + tokenTXT;

        QRcode.toDataURL(Url).then( response => {
            
            const d = new Date();
            setShowToken( true );
            setToken( tokenTXT );
            setQRCode( response );
            
            axios.post( '/newtoken', { token: addition, date_time: d, location_id: 1, gender: gender } ).then( () => {
                
                let prtContent = document.getElementById("tokenContent");
                let WinPrint = window.open('', '', "left=0,top=0,width='1%',height='1%',toolbar=0,scrollbars=0,status=0");
                WinPrint.document.write(prtContent.innerHTML);
                WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();
                WinPrint.close();

                setTimeout(() => {

                    setShowToken( false );

                }, 3000);

            } ).catch( error => {

                console.log( error );

            } );
            
        } )

    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string

    }

    return(

        <div className="GetToken" id="tokenPage">
            <div className="GetToken-inner d-flex align-items-center w-100 vh-100 justify-content-center" id="frame">
                <div className="GetToken-content" id="content">
                    
                    {
                        ShowToken
                        ?
                        <div style={ { width: "100%", padding: 0 } } id="tokenContent"> 
                            <div style={ { display: "flex", alignItems: "center", justifyContent: "center" } }> 
                                <div style={ { width: "50%" } }> 
                                    <img src={ QRCode } width="100%" alt="qr code img" /> 
                                </div> 
                                <div style={ { width: "50%", textAlign: "center", textTransform: "uppercase", fontWeight: "bold" } }> 
                                    <div> 
                                        <span style={ { marginBottom: 0, display: "block", fontFamily: "sans-serif" } }>KDC</span> 
                                        <span style={{ fontSize: '40px', display: "block", marginBottom: 0, fontFamily: "sans-serif" }}> { Token } </span> 
                                        <span style={{ marginBottom: 0, display: "block", fontFamily: "sans-serif" }}> { tConvert( new Date().toTimeString().substring(0,8) ) } </span> 
                                    </div> 
                                </div> 
                            </div> 
                        </div>
                        :
                        <div> 
                            <h3 className="mb-3 font-weight-bold text-uppercase text-center">press button & get your token</h3> 
                            <div className="text-center"> 
                                <button type="button" onClick={ () => getToken("Male") } className="btn btn-sm w-50">
                                    Male
                                </button> <br />
                                <button type="button" onClick={ () => getToken("Female") } className="btn btn-sm w-50">
                                    Female
                                </button> 
                            </div> 
                        </div>
                    }

                </div>
            </div>
        </div>

    );

}

export default GetToken;