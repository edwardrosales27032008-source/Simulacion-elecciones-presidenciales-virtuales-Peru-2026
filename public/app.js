import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Tu objeto de configuración limpia
const firebaseConfig = {
    apiKey: "AIzaSyBYv9vgKwB3kDuJ6pH57Jpt-Gt9ZDrYSeI",
    authDomain: "sistemavotos2026.firebaseapp.com",
    projectId: "sistemavotos2026",
    storageBucket: "sistemavotos2026.firebasestorage.app",
    messagingSenderId: "829769345046",
    appId: "1:829769345046:web:ce5929176899345555ad37"
};
// 3. PRIMERO se inicializa la app de Firebase obligatoriamente
const app = initializeApp(firebaseConfig);

// 4. DESPUÉS de inicializar la app, recién se mandan a llamar los servicios pasándoles "app"
const auth = getAuth(app);
const db = getFirestore(app);

// 5. Por último, exportas las constantes para tus otros archivos JS de lógica
export { auth, db, app };