import React from 'react';

//Import Styling
import './App.css';


//Import Firbase component
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

//Import FirebaseAuth component
import { useAuthState } from 'react-firebase-hooks/auth';

// Importing Component
import Header from './components/Header';
import SignIn from './components/Signin';
import ChatRoom from './components/ChatRoom';


firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const auth = firebase.auth();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Header />

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}


export default App;
