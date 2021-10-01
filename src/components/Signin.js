import React from 'react'

//Import Firbase component
import firebase from 'firebase/app';

function Signin() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const auth = firebase.auth()

    return (
        <>
            <img className="sign-in-image" src="../SignIn.png" alt="" ></img>
            <div className='down-arrow-icon'>
                <img className="" src="../down-arrow-icon.png" alt="" />
            </div>
            <button className="sign-in-button" onClick={signInWithGoogle}>
                <img className="sign-in-google" src="https://img.icons8.com/fluency/480/000000/google-logo.png" alt="" />
                <p className="signin-text">Sign in with Google</p>
            </button>
        </>
    )
}

export default Signin
