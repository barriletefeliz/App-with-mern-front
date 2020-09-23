import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../Context/authContext/authContext';

const HigherOrderComp = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { authenticated, authenticatedUser, loading } = authContext;

    useEffect(() => {
        authenticatedUser();
        //eslint-disable-next-line
    }, []);

    return (
        <Route { ...props} render={ props => !authenticated && !loading ? (
            <Redirect to='/' />
        ) : (
            <Component { ...props }/>
        ) } />
    );
}

export default HigherOrderComp;