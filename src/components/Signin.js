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
            <button className="sign-in-button" onClick={signInWithGoogle}>
                <img className="sign-in-google" src="https://img.icons8.com/fluency/480/000000/google-logo.png" alt="" />
                Sign in with Google
            </button>
        </>
    )
}

export default Signin
