function registrar() {
    let tEmail = document.getElementById("email");
    let tPass = document.getElementById("newpass");

    let email = tEmail.value;
    let pass = tPass.value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass).then(
            function() {
                verify();
            }
        )
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            tEmail.className = tEmail.className + " border border-danger";
            tPass.className = tEmail.className + " border border-danger";
            document.getElementById("error").innerHTML =
                errorCode + " " + errorMessage;
        });

    document.getElementById("User").value = "";
    document.getElementById("Password").value = "";
}

function ingresar() {
    let tEmail = document.getElementById("User");
    let tPass = document.getElementById("Password");

    let email = tEmail.value;
    let pass = tPass.value;
    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            tEmail.className = tEmail.className + " border border-danger";
            tPass.className = tEmail.className + " border border-danger";
            console.log(errorCode + " " + errorMessage);
            document.getElementById("error2").innerHTML =
                errorCode + " " + errorMessage;
        });

    document.getElementById("User").value = "";
    document.getElementById("Password").value = "";
}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        var contenido = document.getElementById("contenido");
        if (user) {
            console.log("Existe usuario Activo");
            console.log(user.emailVerified);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            showContent(contenido, user);
            // ...
        } else {
            // User is signed out.
            // ...
            console.log("No Existe usuario Activo");
        }
    });
}

observador();

function showContent(content, user) {
    if (user.emailVerified) {
        content.innerHTML = `<div class="card-body ">
      <h5 class="card-title ">Inicio de Session Exitoso!</h5>
      <p class="card-text " id="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima enim consectetur pariatur eligendi, perspiciatis, iusto numquam ea deleniti impedit beatae molestiae nesciunt recusandae fuga distinctio modi saepe provident sit.</p>
  </div>
  <div class="card-footer "> <button class="btn btn-dark " id="sessionClose " onclick="cerrar() ">Cerrar sesión</button>
  </div>`;
    } else {
        content.innerHTML = `
        <div class="card-body ">
                <h5 class="card-title ">Inicio de Session Exitoso!</h5>
                <p class="card-text " id="text">Email no verificado</p></div>
            <div class="card-footer "> <button class="btn btn-dark " id="sessionClose " onclick="cerrar() ">Cerrar sesión</button>
            </div>`;
    }
}

function cerrar() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            console.log('saliendo');
        })
        .catch(function(error) {
            console.log(error);
        });
}

function verify() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        console.log('enviando correo de verificacion...');
    }).catch(function(error) {
        console.log('error al enviar correo de verificacion');
    });
}