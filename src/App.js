import React, { useRef, useState } from 'react';

//Import Styling
import './App.css';
// import LoginSvg from './Login-Svg';

// Import FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

//Import Firbase component
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

//Import FirebaseAuth component
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyAYLloP_ks8nVRBt-U9e18-Dm1XjeZltiE",
  authDomain: "chatsociety-1117c.firebaseapp.com",
  projectId: "chatsociety-1117c",
  storageBucket: "chatsociety-1117c.appspot.com",
  messagingSenderId: "763211186562",
  appId: "1:763211186562:web:29ab6b12834cf3a07ecf9b",
  measurementId: "G-MPQWXVGXZQ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <a href="http://chatsociety.netlify.app/">
          <h1>Chat Society</h1>
        </a>
        <a href="https://github.com/swapnilsparsh/ChatSociety" target="_blank" rel="noreferrer" >
          <FontAwesomeIcon size='3x' icon={faGithub} />
        </a>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

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

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


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
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

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

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="Profile Pic" />
      <p>{text}</p>
    </div>
  </>)
}

export default App;