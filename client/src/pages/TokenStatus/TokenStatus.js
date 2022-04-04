import React, { useState, useEffect } from 'react';
import './TokenStatus.css';

import axios from '../../axios';
import socket from '../../io';
import spoken from 'spoken/build/spoken';
import $ from 'jquery';

const TokenStatus = () => {

    const [ Tokens, setTokens ] = useState( [] );
    const [ CallToken, setCallToken ] = useState(
        {
            token: 0,
            counter: 0
        }
    );

    useEffect(
        () => {

            const GetTokens = () => {

                axios.get('/gettokensatcounters').then(
                    res => {
    
                        setTokens( res.data );
                        $(".TokenStatus .Left.TokensAtCounters .TokenContainer").first().trigger('click');
    
                    }
                ).catch(
                    err => {
    
                        console.log( err );
    
                    }
                )

            }

            socket.on(
                'CallTheCandidate', ( data ) => {

                    setCallToken( data );
                    GetTokens();

                }
            )

        }, []
    )

    const CallCandidate = () => {

        spoken.say('Token Number ' + CallToken.token + ' Please Proceed to Counter Number ' + CallToken.counter );

    }

    const CreateToken = ( getLenth, token_no ) => {

        let Token = null;

        if( getLenth === 1 )
        {
            Token = '000' + token_no;
        }

        if( getLenth === 2 )
        {
            Token = '00' + token_no;
        }

        if( getLenth === 3 )
        {
            Token = '0' + token_no;
        }

        if( getLenth === 4 )
        {
            Token = token_no;
        }

        return Token;

    }

    return (
        <div className="TokenStatus">

            <div className="Left TokensAtCounters">

                {
                    Tokens.map(
                        ( val, index ) => {

                            let getLenth = val.token_no.toString().length;
                            let Token = CreateToken( getLenth, val.token_no );

                            return (
                                <div className="TokenContainer" key={ index } onClick={ () => CallCandidate() }>

                                    <div>
                                        <h2>
                                            token: { Token }
                                        </h2>

                                        <h2>
                                            counter: { val.token_no }
                                        </h2>
                                    </div>

                                </div>
                            )

                        }
                    )
                }

            </div>

            <div className="Right CurrentToken">

                <div>

                    <h1> Token number </h1>
                    <h1 className='light'> { CreateToken( CallToken.token.toString().length, CallToken.token ) } </h1>
                    <h1> please proceed to </h1>
                    <h1> counter number </h1>
                    <h1 className='light' style={ { backgroundColor: "#0BBB9B" } }> { CallToken.counter } </h1>

                </div>

            </div>
            
        </div>
    );

}

export default TokenStatus;