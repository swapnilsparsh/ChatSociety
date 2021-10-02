import React from 'react'

//Import Firbase component
import firebase from 'firebase/app';

function ChatMessage(props) {

    const auth = firebase.auth()
    const { text, uid, photoURL } = props.message;
    const { next, prev } = props.neighbour;
    //  Ommit profile picture if the previously sent message
    //  was sent by the same user. Avoiding ui repetition
    const withAvatar = !prev ? `` : prev.uid === uid ? `hidden` : ``
    const addDistance = !next ? `` : next.uid !== uid ? `next` : ``
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass} ${addDistance}`}>
            <img src={photoURL} className={withAvatar} alt="Profile Pic" />
            <p>{text}</p>
        </div>
    </>)
}

export default ChatMessage
