import React from 'react';
import { Consumer } from './context';

const UpdateCourse = (props) => {
    // Cancel button returns to Course Details 
    const handleCancel = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    return(
        <Consumer>
            { ({ authenticatedUser, courses }) => {
                // find current course with course id in URL
                const courseId = props.match.params.id;
                const currentCourse = courses.find( course => course.id == courseId );

                return(
                    <div className='bounds course--detail'>
                        <h1>Update Course</h1>

                        <div>
                            <form>
                                <div className='grid-66'>
                                    <div className='course--header'>
                                        <h4 className='course--label'>Course</h4>

                                        <div><input 
                                            className='input-title course--title--input' 
                                            type='text' 
                                            name='title' 
                                            value={ currentCourse.title }
                                            placeholder='Course title...'
                                        /></div>
                                        <p>By { authenticatedUser.user.firstName } { authenticatedUser.user.lastName }</p>
                                    </div>

                                    <div className='course--description'>
                                        <div><textarea name='description' placeholder='Course description...'>
                                            { currentCourse.description }
                                        </textarea></div>
                                    </div>
                                </div>       

                                <div className='grid-25 grid-right'>
                                    <div className='course--stats'>
                                        <ul className='course--stats--list'>
                                            <li className='course--stats--list--item'>
                                                <h4>Estimated Time</h4>
                                                <div><input 
                                                    className='course--time--input' 
                                                    type='text' 
                                                    name='estimatedTime'
                                                    value={ currentCourse.estimatedTime }
                                                /></div>
                                            </li>
                                            <li className='course--stats--list--item'>
                                                <h4>Materials Needed</h4>
                                                <div><textarea name='materialsNeeded' placeholder='List materials...'>
                                                    { currentCourse.materialsNeeded }
                                                </textarea></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> 

                                <div className='grid-100 pad-bottom'>
                                    <button className='button' type='submit'>Update Course</button>
                                    <button className='button button-secondary' onClick={ handleCancel } >Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }}
        </Consumer>
    );
}

export default UpdateCourse;