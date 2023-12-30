import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCWIGC7DqokxYez_fkqeIMhx_vWHp550hA",
    authDomain: "dropbox-clone-464bf.firebaseapp.com",
    projectId: "dropbox-clone-464bf",
    storageBucket: "dropbox-clone-464bf.appspot.com",
    messagingSenderId: "880019582473",
    appId: "1:880019582473:web:a1c4d586b629337cc712d8",
    measurementId: "G-159CD7JF7P"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };