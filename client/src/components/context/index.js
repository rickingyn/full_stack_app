import React, { createContext, useEffect, useState } from 'react'; 
import axios from 'axios';

// create Course Context to be consumed by components
const CourseContext = createContext();

// Create HOC Provider component to allow children components to consume context
export const Provider = (props) => {
    // useEffect function to execute fechAPI function when the component is mounted
    useEffect( () => {
        fetchAPI();
    }, []); // empty array as the 2nd parameter indicates to update only when the component is first mounted
    
    // function to fetch API 
        // use axios to fetch api and set courses state using React hooks
    const fetchAPI = () => {
        axios.get('http://localhost:5000/api/courses')
        .then( response => setCourses(response.data.courses))
        .catch( error => console.error('API Fetch was unsuccessful: ', error));
    }

    const signIn = async(user) => {
        const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`); 

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Basic ${ encodedCredentials }`
              },
        };

        const response = await axios.get('http://localhost:5000/api/users', options);
        const currentUser = response.data;

        return currentUser;
    }

    // delete course function and refetch new api
    const deleteCourse = (courseId) => {
        axios.delete(`http://localhost:5000/api/courses/${ courseId }`)
            .then( fetchAPI() )
            .catch( error => console.error('An error occured while deleting the course: ', error) );
    }

    // set courses state using React hooks
    const [courses, setCourses] = useState([]);

    // pass courses state to Provider component
    return(
        <CourseContext.Provider value={{ 
            courses: courses,
            action: {
                deleteCourse: deleteCourse,
                signIn: signIn
            } 
        }} >
            { props.children }
        </CourseContext.Provider>
    );
}

// export consumer component to subscribe to context
export const Consumer = CourseContext.Consumer;