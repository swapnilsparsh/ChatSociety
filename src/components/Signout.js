import React from 'react'

//Import Firbase component
import firebase from 'firebase/app';

function Signout() {

    const auth = firebase.auth()
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default Signout
