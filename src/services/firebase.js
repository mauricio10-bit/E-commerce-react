import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCSQh1OF1GD9mYV9BqAz6b62fnjMPM6bfM",
    authDomain: "ecommerce-auth-df74f.firebaseapp.com",
    projectId: "ecommerce-auth-df74f",
    storageBucket: "ecommerce-auth-df74f.firebasestorage.app",
    messagingSenderId: "680037644053",
    appId: "1:680037644053:web:becf13b27420d02b3a1b1c",
    measurementId: "G-70Z9ENJ75J"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
