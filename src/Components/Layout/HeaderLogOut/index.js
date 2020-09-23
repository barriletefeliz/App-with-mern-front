import React, { useContext } from 'react';
import authContext from '../../../Context/authContext/authContext';

import './Style.scss'

const HeaderLogOut = () => {

    //extracción de la info de autenticacion
    const AuthContext = useContext(authContext);
    const { logOut } = AuthContext;

    return(
        <header className="log-out-container">
            <nav className="">
                <button
                    className=" log-out"
                    onClick={() => logOut() }
                >Cerrar Sesion
                </button>
            </nav>
        </header>

    );

}

export default HeaderLogOut