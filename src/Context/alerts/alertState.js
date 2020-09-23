import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';

import { SHOW_ALERT, HIDE_ALERT } from '../../Types/index';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch ] = useReducer(alertReducer, initialState);

    //funcion
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        //limpiar error, 4 seg
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 4000);
    };


    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    );

}

export default AlertState