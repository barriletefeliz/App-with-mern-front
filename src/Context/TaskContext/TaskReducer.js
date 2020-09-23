import { 
    TASKS_PROJECT, 
    ADD_TASK, 
    VALIDATION_TASK, 
    DELETE_TASK, 
    CURRENT_TASK, 
    UPDATE_TASK, 
    CLEAN_TASK } 
from '../../Types'

export default ( state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return{
                ...state,
                taskproject: action.payload
            }

        case ADD_TASK:
            return{
                ...state,
                taskproject: [action.payload, ...state.taskproject],
                errortask: false
            }

        case VALIDATION_TASK:
            return{
                ...state,
                errortask: true
            }

        case DELETE_TASK:
            return{
                ...state,
                taskproject: state.taskproject.filter(
                    task => task._id !== action.payload)
            }

        case CURRENT_TASK:
            return{
                ...state,
                selectedtask: action.payload
            }

        case UPDATE_TASK:
            return{
                ...state,
                taskproject: state.taskproject.map(task => 
                    task._id === action.payload._id ? 
                    action.payload : 
                    task )
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedtask: null

            }

        default:
            return state;
    }

}