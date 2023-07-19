import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCgvlqJeH5cosYkJDWRmYracq0vJVa3sJQ',
  authDomain: 'mern-netflix-clone-3174f.firebaseapp.com',
  projectId: 'mern-netflix-clone-3174f',
  storageBucket: 'mern-netflix-clone-3174f.appspot.com',
  messagingSenderId: '355221026610',
  appId: '1:355221026610:web:9a8c6f940da9faa3d6492b',
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
