import { 
    FORM_PROJECT, 
    GET_PROYECTS, 
    ADD_PROYECT,  
    ERROR_PROJECT, 
    VALIDATION_FORM, 
    ACTUAL_PROJECT, 
    DELETE_PROJECT } from '../../Types'


export default (state, action) => {
    switch(action.type) {
        case FORM_PROJECT:
        return{
            ...state,
            form: true
        }
        case GET_PROYECTS:
            return{
                ...state,
                projects: action.payload
        }
        case ADD_PROYECT:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                errorform: false
        }
        case VALIDATION_FORM:
            return{
                ...state,
                errorform: true
        }
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
        }       
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
        }    
        case  ERROR_PROJECT:
            return {
                ...state,
                message: action.payload 

            }
            
        default: 
            return state;

    }

}