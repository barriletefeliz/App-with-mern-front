import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../../Context/Projects/projectContext'
import './Style.scss'

const NewProjects = () => {

    //obtención de state del form
    const projectsContext = useContext(projectContext);
    const { form, errorform, showForm, addProject, showError } = projectsContext;

    //state del nuevo proyecto
    const [project, saveProject] = useState({
        name: ''
    });

    //extracción del name
    const { name } = project;

    //contenido del input
    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    //cuando usuario submitea
    const onSubmitProject = e => {
        e.preventDefault();
        //valida proyecto
        if(name === ''){
            showError();
            return
        }
        //lo agrega al estado interno del componente
        addProject(project)
        //reinicia el form
        saveProject({
            name: ''
        })

    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="button button-one"
                onClick={ () => showForm()}
            >Nuevo proyecto</button>
           
           { form 
               ? (
                    <form 
                        className="form-new-project"
                        onSubmit={onSubmitProject}>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre del projecto"
                            name="name"
                            value={name}
                            onChange={onChangeProject}
                        />

                        <input 
                            type="submit" 
                            className="button button-one"
                            value="Agregar proyect"
                        />

                    </form>
               ) : null

           }

           {errorform ? <p className="mensaje error">Ponele un título a tu proyecto</p> : null}
        </Fragment>
    );
}

export default NewProjects