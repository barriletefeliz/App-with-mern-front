import React from 'react';
import NewProjects from '../../Projects/NewProject'
import ListProjects from '../../Projects/ListProjects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './Style.scss'

const Sidebar = () => {
    return(
        <aside className="sidebar">
            <h1 className="title-app">YOUR<span>Tasks </span>
                <FontAwesomeIcon icon={faCheck} className="icon"/>
            </h1>
            <NewProjects />
            <div className="projects">
                <h2 className="tipografia">Tus proyectos</h2>
                <ListProjects />
            </div>
        </aside>

    );

}

export default Sidebar