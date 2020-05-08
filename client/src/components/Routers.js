import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import components
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';

// function to render Components with correct routes
    // use Switch Component to only render one route
    // Redirecdt to home page if no route matches
const Routers = () => {
    return(
        <Switch>
            <Route to='/' render={ () => <Courses /> } />
            <Route to='/courses/create' render={ () => <CreateCourse /> } />
            <Route to='/courses/:id' render={ () => <CourseDetail /> } />
            <Route to='/courses/:id/update' render={ () => <UpdateCourse /> } />
            <Route to='/signin' render={ () => <UserSignIn /> } />
            <Route to='/signup' render={ () => <UserSignUp /> } />
            <Route to='/signout' render={ () => <UserSignOut /> } />
            <Redirect to='/' />
        </Switch>
    );
}

export default Routers;