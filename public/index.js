    import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    import { doc , setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    import { db } from '../public/app.js';
    import { app } from '../public/app.js';
    import { auth } from '../public/app.js';

    const iconPassword = document.getElementById('togglePassword');
    const btn = document.getElementById('btnRegistrar');
    const pass = document.getElementById('pass');
    const showMsg = document.querySelectorAll('#show-msg');

    // Función de registro
    async function registrarUsuario() {
        // Captura de valores con IDs corregidos
        const email = document.getElementById('email').value.trim();
        const nombre = document.getElementById('v_nombre').value.trim();
        const paterno = document.getElementById('v_paterno').value.trim();
        const materno = document.getElementById('v_materno').value.trim();
        const dni = document.getElementById('v_dni').value.trim();
        const grupo = document.getElementById('v_grupo').value.trim();
        const contraseña = pass.value.trim();

        // Validaciones básicas
        if(!email || !contraseña || !dni || !nombre) {
            alert("Porfavor rellene los datos vacíos.");
            return;
        }

        if(contraseña.length < 6 && contraseña.length > 10) {
            alert("La contraseña debe tener al menos 6 caracteres y no más de 10.");
            return;
        }

        if (!document.getElementById('checkTerminos').checked) {
            alert("Debes aceptar los Términos y Condiciones para registrar tu voto.");
            return; // Frena la ejecución si no está marcado
        }

        btn.disabled = true;
        btn.innerText = "Registrando usuario...";

        try {
            // 1. Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
            const user = userCredential.user;

            // 2. Crear documento en Firestore con el UID del usuario
            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: nombre,
                paterno: paterno,
                materno: materno,
                dni: dni,
                grupo: grupo,
                haVotado: false // Importante para que el sistema le deje votar
            });

            alert("✅ ¡Cuenta creada! Procede a votar.");
            window.location.href = "voto.html";

        } catch (error) {
            console.error("Error detallado:", error);
            btn.disabled = false;
            btn.innerText = "REGISTRARSE Y VOTAR";

            if(error.code === 'auth/email-already-in-use') {
                alert("Ese correo ya está registrado.");
            } else if(error.code === 'auth/invalid-email') {
                alert("El formato del correo no es válido.");
            } else {
                alert("Error: " + error.message);
            }
        }
    }

    // Event Listener para el botón
    btn.addEventListener('click', registrarUsuario);

    // Escuchamos el evento click en el ID del icono
    iconPassword.addEventListener('click', () => {
        
        // CASO A: Si la contraseña está oculta, la mostramos
        if (pass.type === 'password') {
            pass.type = 'text';
            
            // Intercambiamos solo las clases de apariencia visual
            iconPassword.classList.remove('bi-eye');
            iconPassword.classList.add('bi-eye-slash');
        } 
        // CASO B: Si la contraseña está a la vista, la volvemos a ocultar
        else {
            pass.type = 'password';
            
            // Regresamos al icono del ojo abierto
            iconPassword.classList.remove('bi-eye-slash');
            iconPassword.classList.add('bi-eye');
        }
    });

    // Mostrar mensaje al dar click en icono, en sección de indicaciones
    showMsg.forEach((iconunique) => {
        iconunique.addEventListener('click', ()=> {

            const containerMain = iconunique.closest('.preguntas-desabermas');
            const answer = containerMain.querySelector('.rpta-indicaciones');
            if (iconunique.classList.contains('bi-chevron-double-down')) {
                iconunique.classList.remove('bi-chevron-double-down');
                iconunique.classList.add('bi-chevron-double-up');
                answer.style.display = 'flex';
            } else {
                iconunique.classList.remove('bi-chevron-double-up');
                iconunique.classList.add('bi-chevron-double-down');
                answer.style.display = 'none'; 
            }
        });
    });

    // Ventana emergente de terminos y condiciones
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('modalTyc');
        const btnAbrir = document.getElementById('btnAbrirTyc');
        const btnCerrar = document.getElementById('btnCerrarTyc');
        const btnAceptar = document.getElementById('btnAceptarTyc');
        const checkbox = document.getElementById('checkTerminos');

        // Abrir modal
        btnAbrir.addEventListener('click', () => {
            modal.classList.add('active');
        });

        // Cerrar modal desde la X
        btnCerrar.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Botón aceptar dentro del modal
        btnAceptar.addEventListener('click', () => {
            checkbox.checked = true; // Activa el check automáticamente
            modal.classList.remove('active');
        });

        // Cerrar si hacen click afuera de la caja blanca
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });