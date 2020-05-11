import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './context'

const UserSignOut = () => {
    return(
        // subscibe to context and call signOut action
        // redirect to root url
        <Consumer>
            { ({ action }) => {
                action.signOut();

                return(
                    <Redirect to='/' />
                );
            }}
        </Consumer>
    );
}

export default UserSignOut;