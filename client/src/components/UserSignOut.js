import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CourseContext } from './context';

const UserSignOut = () => {
    // using React hooks and context API together
    const context = useContext(CourseContext);
    
    // subscibe to context and call signOut action
    useEffect(() => {
        context.action.signOut();
        // eslint-disable-next-line
    }, []);

    return(
        // redirect to root url
        <Redirect to='/' />
    );
}

export default UserSignOut;