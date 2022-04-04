import SetMenuItems from './Menu';
import OnUserLogin from './Login';
import OnShowPopup from './Popup';

import { combineReducers } from 'redux';

const rootReducer = combineReducers(
    {
        SetMenuItems,
        OnUserLogin,
        OnShowPopup
    }
)

export default rootReducer;