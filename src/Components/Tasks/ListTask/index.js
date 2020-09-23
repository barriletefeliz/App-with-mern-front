import React, { Fragment, useContext } from 'react';
import Task from '../Task'
import projectContext from '../../../Context/Projects/projectContext'
import TaskContext from '../../../Context/TaskContext/TaskContext'
import Mondrian from '../../Layout/Mondrian';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Style.scss'

const ListTask = () => {

    //obtención del state
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    //obtención tareas del proyecto
    const tasksContext = useContext(TaskContext);
    const { taskproject } = tasksContext;

    if(!project) return <Mondrian/>;

    //array desestructuring para extracción del project actual
    const [actualProyect] = project;

    //elimina un proyecto
    const onClickDelete = () => {
        deleteProject(actualProyect._id)
    }
    
    return(
        <Fragment>

            <div className="wrapper-tasks">
                <h2 className="task-title"> {actualProyect.name} </h2>
                <ul className="task-list">
                    {taskproject.length === 0
                        ? (<li className="tarea"><p>Agregale tareas a {actualProyect.name}.</p></li>)
                        : (
                            taskproject.map(task => (
                                <Task 
                                    key={task._id}
                                    className="tarea"
                                    task={task} 
                                />
                            )                
                        ))}
                        
                <div className="container-btn-delete">
                    <div
                        type="button"
                        className="red state-button btn shadow-dark shadow delete-proj-btn "
                        onClick={onClickDelete}
                        > <span className="text-delete">Eliminar Proyecto</span> 
                        <span className="icon-delete">
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>
                </div>
                </ul>

            </div>
        </Fragment>
    );
}

export default ListTask