import React, { useReducer} from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import clienteAxios from '../../config/axios'
import { 
    TASKS_PROJECT, 
    ADD_TASK, 
    VALIDATION_TASK, 
    DELETE_TASK, 
    CURRENT_TASK, 
    UPDATE_TASK, 
    CLEAN_TASK
} from '../../Types'

const TaskState = props => {
    const initialState = {
        taskproject: [],
        errortask: false,
        selectedtask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //obtención de tareas de proyecto
    const getTask =  async project => {
        console.log(project)
        try {
            const result = await clienteAxios.get('/api/tasks', 
            { params: { project} }
            );
            console.log('el resultado es:' + result);

            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            });
        } catch (error) {
            console.log(error)
        }
    }

    //add tareas al proyecto seleccionado
    const addTask = async task => {
        try {
            const result= await clienteAxios.post('/api/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: result.data.task
            });
        } catch (error) {
            console.log(error);    
        }
    }

    //Validación y muestra error si es necesario
    const validateTask = () => {
        dispatch({
            type: VALIDATION_TASK
        });
    }

    //elimina tarea por id
    const deleteTask = async (id, project) => {
        try {
            await clienteAxios.delete(`/api/tasks/${id}`, { params: { project} });
            dispatch({
                type: DELETE_TASK,
                payload: id
            });
        } catch (error) {
            console.log(error)
        }
    }

    //modificación de una tarea
    const updateTask = async task => {
        
        try {
            const result = await clienteAxios.put(`/api/tasks/${task._id }`, task);

            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            });
        } catch (error) {
            console.log(error)
        }
    }


    //Toma una tarea para edición
    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    }
    
    //Toma una tarea para edición
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        });
    }





    return (
        <TaskContext.Provider
        value={{
            taskproject : state.taskproject,
            errortask: state.errortask,
            selectedtask: state.selectedtask,
            getTask,
            addTask,
            validateTask,
            deleteTask,
            updateTask,
            saveCurrentTask,
            cleanTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;