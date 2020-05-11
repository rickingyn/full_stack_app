import React, { createContext, useEffect, useState } from 'react'; 
import axios from 'axios';

// create Course Context to be consumed by components
const CourseContext = createContext();

// Create HOC Provider component to allow children components to consume context
export const Provider = (props) => {
    // set states using React hooks
    const [courses, setCourses] = useState([]);
    const [ authenticatedUser, setAuthenticatedUser ] = useState(null);

    // useEffect function to execute fechAPI function when the component is mounted
    useEffect( () => {
        fetchAPI();
    }, []); 

    // function to fetch API 
        // use axios to fetch api and set courses state using React hooks
    const fetchAPI = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses');
            setCourses(response.data.courses);
        } catch(error) {
            console.error('Unsuccessful retrieving list of courses: ', error);
        }
    }

    // GET request to /api/users to users; return user if credentials matches
    const getUser = async(user) => {
        // encode emailaddress and passsword passed from parameter
        const encodedCredentials = btoa(`${ user.emailAddress }:${ user.password }`); 

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
            const currentUser = response.data.user;

            // set authenticatedUser state to object container user authentication and user information
            setAuthenticatedUser({
                userAuthentication: user,
                user: currentUser
            })

            return currentUser;
        } catch(error) {
            console.error('An error has occured retreiving the user: ', error);
            return null;
        }
    }

    // POST request to /api/users to add new user
    const createUser = async(user) => {
        try {
            // return an empty array if user is created
            await axios.post('http://localhost:5000/api/users', user);
            return [];
        } catch(error) {
            // pass array of errors if status 400 is returned
            if(error.response.status === 400) {
                return error.response.data.errors;
            } else {
                throw new Error();
            }
        }
    }

    // function to sign user out
    const signOut = () => {
        setAuthenticatedUser(null);
    }

    // POST request to /api/courses to create new course
    const createCourse = async(course, currentUser) => {
        const encodedCredentials = btoa(`${ currentUser.emailAddress }:${ currentUser.password }`); 

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Basic ${ encodedCredentials }`,
              },
        };

        try {
            // pass course object to post method to create course
            // pass options as header to authenticate user
            await axios.post('http://localhost:5000/api/courses', course, options);
            
            // fetch courses API after new course added
            fetchAPI();

            // return empty array;
            return [];
        } catch(error) {
            // return error arrays if status is 400
            if(error.response.status === 400) {
                return error.response.data.errors;
            } else {
                throw new Error();
            }
        }
    }

    // PUT request to /api/courses/:id to update course
    const updateCourse = async(courseId, updatedCourse, currentUser) => {
        try {
            const encodedCredentials = btoa(`${ currentUser.emailAddress }:${ currentUser.password }`);

            const options = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Basic ${ encodedCredentials }`
                }
            };

            // PUT request, passing in Basic Authorization and updatedCourse
           await axios.put(`http://localhost:5000/api/courses/${ courseId }`, updatedCourse, options);
           fetchAPI();
        } catch(error) {
            console.error('An error occured while updating the course: ', error);
        }
        
    }

    // DELETE request to /api/courses/:id to delete course
    const deleteCourse = async(courseId, currentUser) => {
        try {
            const encodedCredentials = btoa(`${ currentUser.emailAddress }:${ currentUser.password }`);

            const options = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Basic ${ encodedCredentials }`
                }
            };

            await axios.delete(`http://localhost:5000/api/courses/${ courseId }`, options);
            fetchAPI();
            } catch(error) {
                console.error('An error occured while deleting the course: ', error);
        }
    }

    // pass courses state to Provider component
    return(
        <CourseContext.Provider value={{ 
            courses: courses,
            authenticatedUser: authenticatedUser,
            action: {
                getUser,
                createUser,
                signOut,
                createCourse,
                updateCourse,
                deleteCourse
            } 
        }} >
            { props.children }
        </CourseContext.Provider>
    );
}

// export consumer component to subscribe to context
export const Consumer = CourseContext.Consumer;