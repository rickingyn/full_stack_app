import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './context';

// Component and other props are passed as parameter
const PrivateRoute = ({ component: Component, ...rest }) => { 
    return(
        <Consumer>
            { ({ authenticatedUser }) => {
                // render Route with passed in props and component if authenticated; else redirect to sign in page
                return(
                    <Route
                        { ...rest } // props (path) are passed with ...rest
                        // render component if authenticated; else redirect to root url
                        render={ (props) => (
                            authenticatedUser ? (
                                <Component { ...props } />
                            ) : (
                                <Redirect to='/signin'/>
                            )
                        )}
                    />
                );
            }}
        </Consumer>
    );
}

export default PrivateRoute;

