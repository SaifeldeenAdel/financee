import {AUTH_START, AUTH_FAILURE, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes"

// Setting up initial state
const initial_state = {
    token: null,
    loading: true,
    error: null
}


const reducer = (state= initial_state, action) =>{
    switch(action.type) {
        // Setting state according to action type
        case AUTH_START:
            return {
                ...state, 
                loading: true, 
                error: null
            }
            
        case AUTH_SUCCESS:
            return {
                ...state, 
                token: action.token,
                loading: false, 
            }

        case AUTH_FAILURE:
            return {
                ...state, 
                token: null, 
                loading:false, 
                error: action.error  
            }

        case AUTH_LOGOUT:
            return {
                ...state, 
                token: null, 
                loading: false, 
                error: null}
        default:
            return state
    }
}

export default reducer;