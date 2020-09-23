import React, { useReducer } from 'react';
import projectContext from './projectContext'
import projectReducer from './projectReducer';
import { 
    FORM_PROJECT, 
    GET_PROYECTS, 
    ADD_PROYECT, 
    ERROR_PROJECT, 
    VALIDATION_FORM, 
    ACTUAL_PROJECT, 
    DELETE_PROJECT } from '../../Types'
import clienteAxios from '../../config/axios'

const ProjectState = props => {
    const initialState = {
        projects : [],
        form: false,
        errorform: false, 
        project: null, 
        mesagge: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState)

    //funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    //obtención de proyectos
    const getProjects = async () => {
        try {
            const result = await clienteAxios.get('/api/projects');
            dispatch({
                type: GET_PROYECTS,
                payload: result.data.projects
            });
        } catch (error) {
            console.log(error)
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    //agegar nuevo proyecto
    const addProject = async project => {
        try {
            const result = await clienteAxios.post('/api/projects', project);
            //inserta project en el state
            dispatch({
                type: ADD_PROYECT,
                payload: result.data
            })
        } catch (error) {
            console.log(error)
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    //validacion por formulario
    const showError = () => {
        dispatch({
            type: VALIDATION_FORM
        });
    }

    //Selecciona proyecto
    const selectProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        });
    }

    //elimina un proyecto
    const deleteProject = async projectId => {
        try {
            await clienteAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }    
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });       
        }
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project: state.project,
                mesagge: state.mesagge,
                showForm,
                getProjects,
                addProject,
                showError,
                selectProject,
                deleteProject
            }}>
            {props.children}
        </projectContext.Provider>
    )
}
 
export default ProjectState;