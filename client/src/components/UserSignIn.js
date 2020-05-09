import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../components/context';

function UserSignIn(props) {
    const [ user, setUser ] = useState({ emailAddress: 'joe@smith.com', password: 'joepassword' });
    const [ error, setError ] = useState();

    // render form sign in template
    return(
        <Consumer>   
            { ({ action }) => {
                // function cancels page refresh and redirects to root url
                const handleCancel = (event) => {
                    event.preventDefault();
                    props.history.push('/');
                }

                // use React hooks to set state of user to values from form
                const handleUpdate = (event) => {
                    const { name, value } = event.target;   
                    setUser({ ...user, [name]: value });
                }

                // prevent page refresh and call function from context to sign in; pass in user object as parameter
                const handleSubmit = (event) => {
                    event.preventDefault();
                    action.signIn(user)
                        .then( user => {
                            if( user === null ) {
                                setError('Sign-In was unsuccessful');
                            } else {
                                props.history.push('/');
                            }
                        });
                }

                return(
                    <div className='bounds'>
                        <div className='grid-33 centered signin'>
                            <h1>Sign In</h1>
                            { error ? <p>there was an error</p>
                                :
                            (<div>
                            <div>
                                <form onSubmit={ handleSubmit } >
                                    {/* set value equel to state and update state on change */}
                                    <div><input type='text' id='emailAddress' name='emailAddress' placeholder='Email Address' value={ user.emailAddress } onChange={ handleUpdate } /></div>
                                    <div><input type='password' id='password' name='password' placeholder='Password' value={ user.password } onChange={ handleUpdate } /></div>
                                    <div className='grid-100 pad-bottom'>
                                        <button className='button' type='submit'>Sign In</button>
                                        {/* button onclick calls handleCancel function */}
                                        <button className='button button-secondary' onClick={ handleCancel } >Cancel</button>
                                    </div>
                                </form>
                            </div>

                            <p>&nbsp;</p>
                            <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>

                            </div>)
                                
                            }
                        </div>
                    </div>
                );
            }}
        </Consumer>
    );
}

export default UserSignIn;