export const MenuItems = ( url ) => {

    return {
        type: "SETMENUITEMS",
        payload: {
            url: url
        }
    }

}

export const UserLogin = ( data ) => {

    return {
        type: "ONUSERLOGIN",
        payload: {
            data: data
        }
    }

}

export const PopupMessage = ( content ) => {

    return {
        type: "ONPOPUP",
        payload: {
            content: content
        }
    }

}