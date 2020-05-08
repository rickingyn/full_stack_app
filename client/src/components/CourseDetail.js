import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './context'; // import Consumers Component from Context API
import '../stylesheets/styles.css';

const CourseDetail = (props) => {
    return(
        <Consumer>
            { ({ courses, action }) => {
                // assign id string query in URL to courseId
                const courseId = props.match.params.id;

                // use find() method to find courses from context using courseId
                const course = courses.find( course => course.id == courseId );

                // function to handle delete;
                    // calls deleteCourse function from context to delete course
                    // redirects to root route
                const handleDelete = () => {
                    action.deleteCourse(courseId);
                    props.history.push('/');
                }
                
                // render Course Detail template
                return(
                    <div>
                        <div className='actions--bar'>
                            <div className='bounds'>
                                <div className='grid-100'>
                                    <span>
                                        <Link className='button' to={ `/courses/:id/update` }>Update Course</Link>
                                        <button className='button' onClick={ handleDelete } >Delete Course</button>
                                    </span>
                                    <Link className='button button-secondary' to='/'>Return to List</Link>
                                </div>
                            </div>
                        </div>
            
                        <div className='bounds course--detail'>
                            <div className='grid-66'>
                                <div className='course--header'>
                                    <h4 className='course--label'>Course</h4>
                                    <h3 className='course--title'>{ course.title }</h3>
                                    <p>{ course.user.firstName } { course.user.lastName }</p>
                                </div>
            
                                <div className='course--description'>
                                    <p>{ course.description }</p>
            
                                </div>
                            </div>
            
                            <div className='grid-25 grid-right'>
                                <div className='course--stats'>
                                    <ul className='course--stats--list'>
                                        <li className='course--stats--list--item'>
                                            <h4>Estimated Time</h4>
                                            <h3>{ course.estimatedTime }</h3>
                                        </li>
                                        <li className='course--stats--list--item'>
                                            <h4>Materials Needed</h4>
                                            <ul>
                                                <li>{ course.materialsNeeded }</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Consumer>
    );
}

export default CourseDetail;