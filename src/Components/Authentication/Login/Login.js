import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../../Context/alerts/alertContext'
import AuthContext from '../../../Context/authContext/authContext'
import ContainerMern from '../ContainerMern'
import Icons from '../Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import './Style.scss';


const Login = (props) => {

    //extracción de valores del context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, logIn } = authContext;

    //En caso de q pass o user no exista
    useEffect(() => {
        if(authenticated) {
            props.history.push('/projects')
            return /*va o no?*/
        }
        
        if(message) {
            showAlert(message.msg, message.category);
            return /*va o no?*/
        }
        //eslint-disable-next-line
    }, [message, authenticated, props.history])

    //State para iniciar sesión
    const [user, saveUser] = useState({
        email: '',
        password: ''

    });

    //extacción
    const { email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //
    const onSubmit = e => {
        e.preventDefault();

        //validación
        if(email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return /*va o no?*/
        }
        //pasarlo al action
        logIn({ email, password });

    };

    return ( 
        <div className="form-usuario login bg-login">
            <div className="contenedor-form shadow-dark">
                <h3 className="login-tittle">Iniciar Sesion</h3>

                <form
                    onSubmit={onSubmit}
                >
               
               { alert ? (
                   <div>
                        <div className="wrapper-input">
                            <input
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="Ingresa tu email"
                                className="input"
                                value={ email }
                                onChange={ onChange }
                            />
                            <div className="wrapper-icon">
                                <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert color-red"/>
                            </div>
                            <label className="label-input" htmlFor="email"></label>
                        </div>

                        <div className="wrapper-input">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu password"
                                className="alert-error"
                                value={ password }
                                onChange={ onChange }
                            />                                 
                            <div className="wrapper-icon">
                                <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert color-red"/>
                            </div>
                            <label className="" htmlFor="inputDanger1"></label>
                        </div>

                            <div className="alert-error">{alert.msg}</div>
                   </div>
                    ) : 
                    <div className="inputs-container">
                        <div className="wrapper-input">
                            <input
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="Ingresa tu email"
                                className="input"
                                value={ email }
                                onChange={ onChange }
                            />
                            <div className="wrapper-icon">
                                <FontAwesomeIcon icon={ faEnvelope } className="icon-input color-yellow"/>
                            </div>
                            <label className="label-input" htmlFor="email"></label>
                        </div>

                        <div className="wrapper-input">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu password"
                                className=""
                                 value={password}
                                onChange={onChange}
                            />
                            <div className="wrapper-icon">
                                <FontAwesomeIcon icon={ faUnlock } className="icon-input color-yellow"/>
                            </div>
                            <label className="alert-error" htmlFor="password"></label>
                        </div>
                    </div>
                    }

                    <div className="wrapper-btn">
                        <input 
                            type="submit" 
                            className="yellow btn-send shadow" 
                            value="Enviar"
                            />
                        </div>
                </form>

                <Link to={'/SignUp'} className="link-route">
                     <span className="get-count pointer">Obtener una cuenta</span>
                </Link>

            </div>

            <div className="mern-picture">
                <p className="">Jugando con</p>
                <ContainerMern />
                <Icons />
            </div>
        </div>
    );
}

export default Login;