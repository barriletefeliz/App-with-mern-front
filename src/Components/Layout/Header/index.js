import React, { useContext, useEffect } from 'react';
import authContext from '../../../Context/authContext/authContext';
import './Style.scss'

const Header = () => {

    //extracción de la info de autenticacion
    const AuthContext = useContext(authContext);
    const { user, authenticatedUser } = AuthContext;
    
    useEffect( () => {
        authenticatedUser();
        //eslint-disable-next-line
    }, []);
    

    return(
        <header className="app-header">
            { user ? <p className="user-name">Holis <span className="header-name"> {user.name} </span></p> : null }
        </header>
    );
}

export default Header