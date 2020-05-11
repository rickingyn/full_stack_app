import React, { useState } from 'react';
import { Consumer } from './context';

const CreateCourse = (props) => {
    // use React hooks to create state of an empty course
    const [ course, setCourse ] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: ''
    });

    const [ validationErrors, setValidationErrors ] = useState([]);

    // prevent page refresh and redirect to root url
    const handleCancel = (event) => {
        event.preventDefault();
        props.history.push('/');
    }

    return(
        <Consumer>
            { ({ action, authenticatedUser }) => {
                // update properties of course state to value from form
                // update userId to id from authenticatedUser context
                const handleUpdate = (event) => {
                    const { name, value } = event.target;
                    setCourse({ 
                        ...course, 
                        [name]: value,
                        userId: authenticatedUser.user.id
                    });
                 }

                // prevent page refresh and set currentUser variable to object with authentications from context
                // call createCourse function from context and pass course state and currentUser for authentication
                 // if user is not authenticated, return validation message
                 // return validation message if validation error from API call
                const handleSubmit = (event) => {
                    event.preventDefault();
                    
                    if (authenticatedUser) {
                        let currentUser = {
                            emailAddress: authenticatedUser.userAuthentication.emailAddress,
                            password: authenticatedUser.userAuthentication.password
                        };
     
                        action.createCourse(course, currentUser)
                            .then( errors => {
                                    //if array of errors are returned, set validationErrors array of validation errors
                                    if(errors.length > 0) {
                                        // create variable to build array of errors to pass to validationMessages
                                        let apiValidationErrors = [];

                                        errors.map( error => {
                                            console.log(error)

                                            if( !validationErrors.find( validationError => validationError == error ) ) {
                                                apiValidationErrors.push(error);
                                            }
                                        });
                                        setValidationErrors(apiValidationErrors);
                                    } else {
                                        props.history.push('/');
                                    }
                                })
                                .catch( error => console.log(error));
                    } else {
                        setValidationErrors(['Please sign into create a course']);
                    }
                }

                return(
                    <div className='bounds course--detail'>
                        <h1>Create Course</h1>
                        
                        {/* Display validation error if validationErrors state is not empty */}
                        { validationErrors.length > 0 && 
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className='validation-errors'>
                                    <ul>
                                        { validationErrors.map( validationError => (
                                            <li>{ validationError }</li>
                                        ) ) }
                                    </ul>
                                </div>
                            </div>
                        }

                        {/* render form for new course */}
                        <form onSubmit={ handleSubmit }>
                            <div className='grid-66'>
                                <div className='course--header'>
                                    <h4 className='course--label'>Course</h4>
                                    <div><input  className='input-title course--title--input' type='text' name='title' placeholder='Course title...' value={ course.title } onChange={ handleUpdate }/></div>
                                    <p>By { authenticatedUser.user.firstName } { authenticatedUser.user.lastName }</p>
                                </div>
                                
                                <div className='course--description'>
                                    <div><textarea name='description' placeholder='Course description...' value={ course.description } onChange={ handleUpdate }></textarea></div>
                                </div>
                            </div>

                            <div className='grid-25 grid-right'>
                                <div className='course--stats'>
                                    <ul className='course--stats--list'>
                                        <li className='course--stats--list--item'>
                                            <h4>Estimated Time</h4>
                                            <div><input className='course--time--input' type='text' name='estimatedTime' placeholder='Hours' value={ course.estimatedTime } onChange={ handleUpdate }/></div>
                                        </li>
                                        <li className='course--stats--list--item'>
                                            <h4>Materials Needed</h4>
                                            <div><textarea name='materialsNeeded' placeholder='List materials...' value={ course.materialsNeeded } onChange={ handleUpdate }></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='grid-100 pad-bottom'>
                                <button className='button' type='submit'>Create Course</button>
                                <button className='button button-secondary' onClick={ handleCancel }>Cancel</button>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Consumer>
        
    );
};

export default CreateCourse;