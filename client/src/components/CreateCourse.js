import React, { useState } from 'react';
import { Consumer } from './context';

const CreateCourse = (props) => {
    // use React hooks to create state of an empty course
    const [ course, setCourse ] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    });

    // prevent page refresh and redirect to root url
    const handleCancel = (event) => {
        event.preventDefault();
        props.history.push('/');
    }

    // update properties of course state to value from form
    const handleUpdate = (event) => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value});
    }

    return(
        <Consumer>
            { ({ action, courses }) => {
                const handleSubmit = (event) => {
                    event.preventDefault();
                    
                }

                console.log(props)

                return(
                    <div className='bounds course--detail'>
                        <h1>Create Course</h1>
                        
                        {/* validation error here */}

                        {/* render form for new course */}
                        <form onSubmit={ handleSubmit }>
                            <div className='grid-66'>
                                <div className='course--header'>
                                    <h4 className='course--label'>Course</h4>
                                    <div><input  className='input-title course--title--input' type='text' name='title' placeholder='Course title...' value={ course.title } onChange={ handleUpdate }/></div>
                                    <p>By</p>
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