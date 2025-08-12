import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Determinar qué configuración usar según el entorno
const isDevelopment = import.meta.env.MODE === "development";

// Es seguro exponer estas claves en el frontend.
// Firebase lo gestiona con sus reglas de seguridad.

const devConfig = {
  apiKey: "AIzaSyDW_NGA417cyDaZIHgEq0C5R497TTd-IGA",
  authDomain: "dev-movie-and-beer-app.firebaseapp.com",
  projectId: "dev-movie-and-beer-app",
  storageBucket: "dev-movie-and-beer-app.firebasestorage.app",
  messagingSenderId: "221161028723",
  appId: "1:221161028723:web:a8e155c94fc9254e367e06",
  measurementId: "G-41B608CJ36",
};

const prodConfig = {
  apiKey: "AIzaSyCLf5GIjsUWf9dC5do2EeYjkZodCYxVtgo",
  authDomain: "movie-and-beer-app.firebaseapp.com",
  projectId: "movie-and-beer-app",
  storageBucket: "movie-and-beer-app.firebasestorage.app",
  messagingSenderId: "1010309150035",
  appId: "1:1010309150035:web:67c2f6570ad3833b701da6",
  measurementId: "G-HCDSNDGXFJ",
};

const firebaseConfig = isDevelopment ? devConfig : prodConfig;

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usaremos en la aplicación
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Usar emuladores en desarrollo local si la variable está presente
const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true";
if (useEmulators && isDevelopment) {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  console.log("--- Usando emuladores de Firebase!");
}
