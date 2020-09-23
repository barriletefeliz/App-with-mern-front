import React, { useContext, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar'
import Header from '../Layout/Header'
import FormTask from '../Tasks/FormTask'
import ListTask from '../Tasks/ListTask'
import HeaderLogOut from '../Layout/HeaderLogOut'
import authContext from '../../Context/authContext/authContext'
import './Style.scss'


const Projects = () => {

    //extracción de la info de autenticacion
    const AuthContext = useContext(authContext);
    const { authenticatedUser } = AuthContext;

    useEffect( () => {
        authenticatedUser();
        //eslint-disable-next-line
    }, []);

    return ( 
        <div className="container-all">
            <div className="dubleheader">
                <Header />
                <HeaderLogOut />
            </div>
            <div className="contenedor-app">
                <Sidebar />
                <div className="principal-section">
                    <main >
                        <FormTask />  
                        <div className="container-tasks">
                            <ListTask />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Projects