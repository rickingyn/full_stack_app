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
        // use { ...routeProps } to pass route properties to component
        <Switch>
            <Route exact path='/' render={ () => <Courses /> } />
            <Route exact path='/courses/create' render={ (routeProps) => <CreateCourse { ...routeProps } /> } />
            <Route exact path='/courses/:id' render={ (routeProps) => <CourseDetail { ...routeProps } /> } /> 
            <Route exact path='/courses/:id/update' render={ () => <UpdateCourse /> } />
            <Route path='/signin' render={ (routeProps) => <UserSignIn { ...routeProps } /> } />
            <Route path='/signup' render={ (routeProps) => <UserSignUp { ...routeProps } /> } />
            <Route path='/signout' render={ () => <UserSignOut /> } />
            <Redirect to='/' />
        </Switch>
    );
}

export default Routers;