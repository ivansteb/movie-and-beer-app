import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Es seguro exponer estas claves en el frontend.
// Firebase lo gestiona con sus reglas de seguridad.
const firebaseConfig = {
  apiKey: "AIzaSyCLf5GIjsUWf9dC5do2EeYjkZodCYxVtgo",
  authDomain: "movie-and-beer-app.firebaseapp.com",
  projectId: "movie-and-beer-app",
  storageBucket: "movie-and-beer-app.firebasestorage.app",
  messagingSenderId: "1010309150035",
  appId: "1:1010309150035:web:67c2f6570ad3833b701da6",
  measurementId: "G-HCDSNDGXFJ",
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usaremos en la aplicación
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
