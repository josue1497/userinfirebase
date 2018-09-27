function view(){
    var email=document.getElementById('User').value;
    var pass=document.getElementById('Password').value;

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    document.getElementById('User').value='';
    document.getElementById('Password').value='';
}