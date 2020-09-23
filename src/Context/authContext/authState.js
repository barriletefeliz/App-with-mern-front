import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import { REGISTRATION_OK, 
    REGISTRATION_ERROR, 
    GET_USER, 
    LOGIN_OK, 
    LOGIN_ERROR, 
    SIGN_OUT } from '../../Types/index';

const AuthState = props => {
    const initalState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    };

    const [state, dispatch ] = useReducer(AuthReducer, initalState);

    const registerUser = async datos => {
        try {
            const response = await clienteAxios.post('/api/users', datos);
            //console.log('la respuesta es:' + response.data);
            dispatch({
                type: REGISTRATION_OK,
                payload: response.data
            });
            //obtiene usuario
            authenticatedUser();
            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: "alerta-error"
            } 

            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            });    
        }
    }

    //retorna el usuario autenticado
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }
        
        try {
            const response = await clienteAxios.get('/api/auth');
                //console.log(response)
                dispatch({
                    type: GET_USER,
                    payload: response.data.user
                }) 
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: LOGIN_ERROR
                })                
            } 
    };

    //cuando el usuario inicia sesión
    const logIn = async datos => {
        try {
            const response = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_OK,
                payload: response.data
            });

            //obtiene usuario
            authenticatedUser();
        } catch (error) {
            
            console.log(error.response.data.msg);

            const alert = {
                msg: error.response.data.msg,
                category: "alerta-error"
            } 
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });  
            return;
        }
    };

    //Cierra la sesión
    const logOut = () => {
        dispatch({
            type: SIGN_OUT
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                logIn,
                authenticatedUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>

    );

}

export default AuthState;