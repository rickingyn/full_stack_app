import React, { createContext, useEffect, useState } from 'react'; 
import axios from 'axios';

// create Course Context to be consumed by components
const CourseContext = createContext();

// Create HOC Provider component to allow children components to consume context
export const Provider = (props) => {
    // useEffect function to execute on first render
        // use axios to fetch api and set courses state using React hooks
    useEffect( () => {
        axios.get('http://localhost:5000/api/courses')
        .then( response => setCourses(response.data.courses))
        .catch( error => console.log(error));
    });
    
    // set courses state using React hooks
    const [courses, setCourses] = useState([]);

    // pass courses state to Provider component
    return(
        <CourseContext.Provider value={{ courses }} >
            { props.children }
        </CourseContext.Provider>
    );
}

// export consumer component to subscribe to context
export const Consumer = CourseContext.Consumer