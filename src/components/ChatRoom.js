import React, { useEffect, useRef, useState } from 'react';

//Import Firbase component
import firebase from 'firebase/app';

//Import FirebaseAuth component
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Import FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Importing Component
import ChatMessage from './ChatMessage';

function ChatRoom() {

    const auth = firebase.auth()
    const firestore = firebase.firestore();

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const scrollToBottom = () =>{
        dummy.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=>{
        scrollToBottom();
    })

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        
        setFormValue('');
        scrollToBottom();
    }

    return (<>
        <main>

            {messages && messages.map((msg, index, pool) => {
              const prev = pool[index-1];
              const next = pool[index+1]
              return <ChatMessage key={msg.id} message={msg} neighbour={{prev, next}} />
            })}

            <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />

            <button className="chat-message-button" type="submit" disabled={!formValue}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>

        </form>
    </>)
}

export default ChatRoom
