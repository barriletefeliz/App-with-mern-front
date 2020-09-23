import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../../Context/Projects/projectContext'
import TaskContext from '../../../Context/TaskContext/TaskContext'
import './Style.scss'

const FormTask = () => {

    //extracción de proyecto activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    //obtención de la función del context
    const tasksContext = useContext(TaskContext);
    const { selectedtask, errortask, addTask, validateTask, getTask, updateTask, cleanTask
    } = tasksContext;

    //effect para detectar si hay una tarea seleccionada
    useEffect( () => {

        if(selectedtask !== null) {
            saveTask(selectedtask)
        } else {
            saveTask({
                name: ''
            })
        }
    }, [selectedtask]);

    //state del form
    const [ task, saveTask] = useState({
        name: ''
    });

    //extrae name del proyecto
    const { name } = task;

    if(!project) return null;

    //array desestructuring para extracción del project actual
    const [actualProyect] = project;

    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //valida
        if(name.trim() === '') {
            validateTask();
            return
        }

        //código condicional que revisa si tiene que editar o agregar tarea
        if(selectedtask === null) {
            //es una tarea nueva, entonces la agrega al state de tareas
            task.project = actualProyect._id; 
           // task.state = false;
            addTask(task);
        } else {
            //es una tarea existente, entonces la actualiza
            updateTask(task);
            //FUNCION ELIMINAR TAREA SELECCIONADA
            cleanTask()
        }

        //trae y filtra tareas del proyecto actual
        getTask(actualProyect.id);

        //reinicia form
        saveTask({
            name: ''
        })
    }

    return(
        <div className="formulario-bg-red">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="Nombre de tu tarea..." 
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="button button-one"
                        value={ selectedtask ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortask ? <p className="mensaje error">Nombrá tu tarea</p>: null}

        </div>

    );

}

export default FormTask