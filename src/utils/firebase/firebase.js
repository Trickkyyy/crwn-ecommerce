import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBIxv-GsCFhZDeuTCpcughGxuXjRTuNuxw",

    authDomain: "crwn-db-9d349.firebaseapp.com",

    projectId: "crwn-db-9d349",

    storageBucket: "crwn-db-9d349.appspot.com",

    messagingSenderId: "408486102566",

    appId: "1:408486102566:web:3c501efc58c870069e88e7"

};

const firebase_app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
export const db = getFirestore()

export const createUserDocumentFromAuth= async (userAuth) => {
    //doc(database,collection,document) doc gets 3 params.
    const userDocRef = doc(db,'users',userAuth.uid) 
    const userSnapshot = await getDoc(userDocRef)

    // If user doesnt exists it will create it
    if (!userSnapshot.exists()) {
        const {displayName,email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch (err) {
            console.log('error creating the user',err.message);
        }
    }
    return userDocRef
}