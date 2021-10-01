import React from 'react'

//Import Firbase component
import firebase from 'firebase/app';

function ChatMessage(props) {

    const auth = firebase.auth()
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="Profile Pic" />
            <p>{text}</p>
        </div>
    </>)
}

export default ChatMessage
