import React, { useContext } from 'react';
import projectContext from '../../../Context/Projects/projectContext'
import TaskContext from '../../../Context/TaskContext/TaskContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


import './Style.scss'

const Task = ({task}) => { 

    //extracción de proyecto activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    
    //obtención de la función del context
    const tasksContext = useContext(TaskContext);
    const { deleteTask, getTask, updateTask, saveCurrentTask } = tasksContext;

    // extrae el proyecto
    const [selectedProject ] = project;

    //se ejecuta en btn-eliminar
    const btnDelete = id => { 
        deleteTask(id, selectedProject._id);
        getTask(selectedProject.id);
    }

    //modificación del estado de las tareas
    const changeState = task => {
        if(task.state) {
            task.state = false;
        } else {
            task.state = true;
        } updateTask(task);
    }

    //agrega tarea que usuario selecciona para editar
    const selectTask = task => {
        saveCurrentTask(task)
    }

    return( 
    
        <li className="task shadow">
            <div> 
            <div className="wrapper-task"> 

                    <div className="buttons">
                        <div className="position-icons">
                            <div className="x">
                                <button
                                    type="button"
                                    className=" yellow btn btn-block state-button"
                                    onClick={() => selectTask(task)}
                                >Editar</button>
                            </div>

                            <div className="margin-btns">
                                {task.state
                                ?   
                                    (
                                        <button className="blue state-button btn"
                                        onClick={() => changeState(task)}> Hecho
                                            <div>
                                                <FontAwesomeIcon 
                                                    icon={faCheck} 
                                                    className="icon white"
                                                />
                                            </div>
                                        </button>

                                    )
                                :   
                                    (
                                        <button className="red state-button btn"
                                            onClick={() => changeState(task)}>
                                            incompleto
                                        </button>
                                    )
                                }    
                            </div>

                        </div>
                    </div>
                    <div className="btn-delete-bt"
                        onClick={() => btnDelete(task._id)}
                        > <FontAwesomeIcon icon={faTimes} className="icon"/>
                    </div>
                </div>
                <p className="task-name">{task.name}</p>
        </div>
            </li>



    );
}

export default Task