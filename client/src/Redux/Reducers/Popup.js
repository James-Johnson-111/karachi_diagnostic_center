const initialState = {
    content: {
        title: '',
        message: ''
    }
}

const OnShowPopup = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "ONPOPUP":

            const { content } = action.payload;

            return {
                ...state,
                content: content
            }
        default:
            return state;

    }

}

export default OnShowPopup;