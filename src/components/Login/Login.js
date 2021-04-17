import {useHistory, useLocation} from 'react-router-dom';
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar'

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        password: '',
        email: '',
        photo: '',
        error: '',
        success: false,

    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
           
            const {displayName, email,photoURL} = result.user;
            console.log(result.user);
            const signedInUser = {name: displayName, email,photoURL};
            setLoggedInUser(signedInUser);
            history.replace(from);
           
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
          
    }
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === "email"){
             isFormValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
            
        }
        if  (e.target.name === "password"){
            const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(e.target.value);
            const isPasswordNumber = e.target.value.length > 6;
            isFormValid = isPasswordValid && isPasswordNumber;
        }
        if(isFormValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

        const handleSubmit = (e) => {
            console.log(user.email, user.password)
            if (newUser && user.email && user.password){
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then( res => {
                    const newUserInfo = {...user};
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    console.log(res);
                })
                
                .catch(error => {
                   const newUserInfo = {...user};
                   let errorMessage = error.message;
                   newUserInfo.error = errorMessage;
                   newUserInfo.success = false;
                   setUser(newUserInfo);
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(errorMessage,errorCode);
                  });
            }
            if(!newUser && user.email && user.password ){
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res =>{
                    const newUserInfo = {...user};
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    console.log('sign in user', res.user);
                })
                .catch(function(error) {
                    const newUserInfo = {...user};
                    let errorMessage = error.message;
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                  });
            }

            e.preventDefault();
        }
       
        const updateUserName = name => {
            var user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name
            }).then(function() {
            console.log('user name updated successfully');
            }).catch(function(error) {
                console.log(error);
            });
        }
        
    return (
        <div> 
            <NavBar />
                <div className='login-section'>
                    <section className='login-form'>
                        <div>
                            <input type="checkbox" name="newUser" onChange= {() => setNewUser(!newUser)}/>
                            <label htmlFor="newUser">New User</label>
                        </div>
                        <form className="form-auth" onSubmit={handleSubmit}>
                            {newUser && <input className="form-control" type="text" name="name" placeholder="Your Name" onBlur={handleBlur}/> } <br/>
                            <input className="form-control" name="email" onBlur={handleBlur} type="text" placeholder="Your Email" required /> <br/>
                            <input className="form-control" name="password" onBlur={handleBlur}  type="password" placeholder="Your Password"required /> <br/>
                            <input className="btn btn-warning" type="submit" value={newUser? 'Sign Up' : 'Sign In'} ></input> 
                            <br></br>
                        </form>
                        <br/>
                        <p style={{color: 'red'}}>{user.error}</p>
                        {user.success && <p style={{color:'green'}}> User {newUser ? 'created' : 'Logged In'} Successfully </p>}
                            <div>
                                <button className="btn btn-info sign-in">Continue with Facebook</button>
                                <button onClick={handleGoogleSignIn} className="btn btn-info google-sign" >Continue with Google</button>
                            </div>
                    </section>
                    
                </div>
        </div>
    );
};

export default Login;