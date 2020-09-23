import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertContext from '../../../Context/alerts/alertContext'
import AuthContext from '../../../Context/authContext/authContext'
import ContainerMern from '../ContainerMern'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import Icons from '../Icons'


const SignUp = (props) => {

    //extracción de valores
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, registerUser } = authContext;

    //Para el caso de un usuario duplicado o ya registrado
    useEffect(() => {
        if(authenticated) {
            props.history.push('/projects')
            return
        }
        
        if(message) {
            showAlert(message.msg, message.category);
            return
        }
//eslint-disable-next-line
    }, [message, authenticated, props.histoy])


    //State de sesión
    const [user, saveUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''

    });

    //extacción
    const { name, email, password, confirm } = user;

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
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //pass mínimo de 6 caracteres
        if(password.length < 6 ) {
            showAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        //pass iguales
        if( password !== confirm) {
            showAlert('Asegúrate de que las contraseñas sean iguales', 'alerta-error');
            return;
        }

        //pasarlo al action
        registerUser({
            name,
            email,
            password
        });

    }
    return ( 
        <div className="form-usuario bg-login login">


            <div className="contenedor-form shadow-dark">
                <h3 className="login-tittle">Crear una cuenta</h3>
                <form
                    onSubmit={onSubmit}
                >

                    { alert ? (
                        <div>
                            <div className="wrapper-input red">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Tu nombre"
                                    className=""
                                    value={name}
                                    onChange={onChange}
                                />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert"/>
                                </div>
                                <label className="label-input" htmlFor="inputDanger1"></label>
                            </div>

                            <div className="wrapper-input red">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Tu correo"
                                className=""
                                value={email}
                                onChange={onChange}
                            />
                            <div className="wrapper-icon">
                                <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert"/>
                            </div>
                            <label className="form-control-label" htmlFor="inputDanger1"></label>
                            </div>

                            <div className="wrapper-input red">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresá tu contraseña"
                                className=""
                                value={password}
                                onChange={onChange}
                            />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert"/>
                                </div>
                            <label className="form-control-label" htmlFor="inputDanger1"></label>
                            </div>

                            <div className="wrapper-input red">
                            <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                placeholder="Confirma tu contraseña"
                                className=""
                                value={confirm}
                                onChange={onChange}
                            />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faExclamation } className="icon-input-alert"/>
                                </div>
                            <label className="form-control-label" htmlFor="inputDanger1"></label>
                            </div>
                            <div className="alert-error"> {alert.msg} </div>
                        </div>
                    ) : 
                        <div>
                            <div className="wrapper-input yellow">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            className=""
                            value={name}
                            onChange={onChange}
                        />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faUser } className="icon-input"/>
                                </div>
                        <label className="control-label" htmlFor="disabledInput"></label>
                        </div>

                        <div className="wrapper-input blue">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Tu correo"
                                className=""
                                value={email}
                                onChange={onChange}
                            />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faEnvelope } className="icon-input"/>
                                </div>
                            <label className="control-label" htmlFor="disabledInput"></label>
                        </div>

                        <div className="wrapper-input">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    className=""
                                    value={password}
                                    onChange={onChange}
                                />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faUnlock } className="icon-input"/>
                                </div>
                                <label className="control-label" htmlFor="disabledInput"></label>
                            </div>
                        
                        <div className="wrapper-input">
                            <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                placeholder="Confirma tu contraseña"
                                className=""
                                value={confirm}
                                onChange={onChange}
                            />
                                <div className="wrapper-icon">
                                    <FontAwesomeIcon icon={ faUnlock } className="icon-input"/>
                                </div>
                            <label className="control-label" htmlFor="disabledInput"></label>
                        </div>


                    </div>
                    }
                        


                    <div className="form-group">
                        <input 
                            type="submit" 
                            className="yellow btn btn-block" 
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="link-route">
                   <FontAwesomeIcon icon={faAngleDoubleLeft} className="icon-back pointer" /> 
                </Link>
            </div>
            <Icons />

        </div>
    );
}

export default SignUp;