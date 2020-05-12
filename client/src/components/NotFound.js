import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className='bounds'>
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <Link className='button' to='/'>Return to Home Page</Link>
        </div>
    );
}

export default NotFound;