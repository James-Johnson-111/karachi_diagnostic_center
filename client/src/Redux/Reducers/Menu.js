const initialState = {
    Items: []
}

const SetMenuItems = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "SETMENUITEMS":

            const { url } = action.payload;
            let data = [];
            let condition = url.split('/#/');
            condition = condition[1];
            condition = condition.split('/');
            if ( condition[0] === 'candidate' )
            {
                data = [
                    {
                        link: true,
                        href: "/candidate/view=info",
                        title: "Candidate Info",
                        description: "Basic information"
                    },
                    {
                        link: true,
                        href: "/candidate/view=exam1",
                        title: "First Examination",
                        description: "Candidate general information"
                    },
                    {
                        link: true,
                        href: "/candidate/view=exam2",
                        title: "Second Examination",
                        description: "Candidate Mental Status"
                    },
                    {
                        link: true,
                        href: "/candidate/view=labinvestigation",
                        title: "Laboratory Investigation",
                        description: "Candidate Different Tests"
                    },
                ]
            }

            return {
                ...state,
                Items: data
            }
        default:
            return state;

    }

}

export default SetMenuItems;