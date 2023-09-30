// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp_jiNxyIik6b9bGwO6gfxAFIgi5KKbQ4",
  authDomain: "crwn-clothing-db-e729f.firebaseapp.com",
  projectId: "crwn-clothing-db-e729f",
  storageBucket: "crwn-clothing-db-e729f.appspot.com",
  messagingSenderId: "189074708820",
  appId: "1:189074708820:web:e553f587c51a384994d0c1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore() 

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {displayName: 'mike'}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}