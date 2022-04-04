const initialState = {
    user: {}
}

const OnUserLogin = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "ONUSERLOGIN":

            const { data } = action.payload;

            return {
                ...state,
                user: data
            }
        default:
            return state;

    }

}

export default OnUserLogin;