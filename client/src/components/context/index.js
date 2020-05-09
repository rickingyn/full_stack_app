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

    // function to make API call to users GET route; return user if credentials matches
    const getUser = async(user) => {
        // encode emailaddress and passsword passed from parameter
        const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`); 

        // create options object to pass as header in GET method
            // passes encoded credentials as basic authorization
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Basic ${ encodedCredentials }`
              },
        };

        // make API fetch to users GET route and pass options as 2nd parameter
            // if successful, return user; else return null;
        try {
            const response = await axios.get('http://localhost:5000/api/users', options);
            const currentUser = response.data;

            return currentUser;
        } catch(error) {
            console.error('An error has occured retreiving the user: ', error);
            return null;
        }
    }

    // function to make API call to users POST route to add user
    const createUser = async(user) => {
        try {
            await axios.post('http://localhost:5000/api/users', user);

            return [];
        } catch(error) {
            if(error.response.status === 400) {
                return error.response.data.errors;
            }
        }
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
                getUser: getUser,
                createUser: createUser
            } 
        }} >
            { props.children }
        </CourseContext.Provider>
    );
}

// export consumer component to subscribe to context
export const Consumer = CourseContext.Consumer;