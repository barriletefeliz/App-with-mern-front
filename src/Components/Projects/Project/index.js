import React, { useContext } from 'react';
import projectContext from '../../../Context/Projects/projectContext'
import TaskContext from '../../../Context/TaskContext/TaskContext'
import './Style.scss'

const Project = ({project}) => {

    //obtención de state de projects
    const projectsContext = useContext(projectContext);
    const { selectProject } = projectsContext;

    //obtención de la función del context
    const tasksContext = useContext(TaskContext);
    const { getTask } = tasksContext;

    //agrega projecto actual
    const toSelectProject = id =>{
        selectProject(id) //fija projecto actual
        getTask(id); //filtro de tareas en el click
    }

    return(
        <li>
            <div
                className="item-project"
                onClick={ () => toSelectProject(project._id) }
            >{project.name}
            </div>
        </li>
    );
}

export default Project