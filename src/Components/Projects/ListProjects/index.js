import React, {useContext, useEffect} from 'react';
import Project from '../Project'
import projectContext from '../../../Context/Projects/projectContext'
import AlertContext from '../../../Context/alerts/alertContext'
import './Style.scss'

const ListProjects = () => {

    //extrayendo proyectos del state del form
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects} = projectsContext;

    //extrae alerta
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    
    //traer proyectos cuando carga el componente
    useEffect(() => {
        //en caso de error
        if(message) {
            showAlert(message.msg, message.category)
        }

        getProjects();
        //eslint-disable-next-line
    }, [message]);

    //verifica si proyecto tiene contenido
    if(projects.length === 0) 
    return <p className="list-projects">?</p>;

    return(
        <ul className="list-projects"> 
            { alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null }

                {projects.map(project => (
                    <Project 
                        key={project._id}
                        project={project}
                        classNames="proyecto"
                    />
                ))}
        </ul>
    );

}

export default ListProjects