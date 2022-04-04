import React from 'react';
import './Popup.css';

// REACT REDUX
import { useSelector, useDispatch} from 'react-redux';
// REDUX ACTIONS/METHDS
import { PopupMessage } from '../../Redux/Actions/Action';

const Popup = () => {
    
    const Content = useSelector( ( state ) => state.OnShowPopup.content );
    const dispatch = useDispatch();

    const RemovePopup = () => {

        dispatch( 
            PopupMessage(
                {
                    title: "",
                    message: ""
                }
            )
        )

    }

  return (
      <>
        {
            Content.title === ''
            ?
            null
            :
            <div className="Popup">
                <i onClick={ RemovePopup } className="las la-times"></i>
                <p className="font-weight-bold">
                    { Content.title }
                </p>
                <p>
                    { Content.message }
                </p>
            </div>
        }
      </>
  )

}

export default Popup;