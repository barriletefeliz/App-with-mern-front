import { REGISTRATION_OK, 
    REGISTRATION_ERROR, 
    GET_USER, 
    LOGIN_OK, 
    LOGIN_ERROR, 
    SIGN_OUT } from '../../Types/index';

export default (state, action) => {
    switch(action.type) {
        
        case LOGIN_OK:
        case REGISTRATION_OK: 
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }

        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }

        case LOGIN_ERROR:
        case REGISTRATION_ERROR:
        case SIGN_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }

        default:
            return state;
    }
}