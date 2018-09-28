function registrar() {
  let tEmail = document.getElementById("email");
  let tPass = document.getElementById("newpass");

  let email = tEmail.value;
  let pass = tPass.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
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
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("Existe usuario Activo");
      showContent(contenido);
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("No Existe usuario Activo");
    }
  });
}

observador();

function showContent(content) {
  content.className = "card";
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
