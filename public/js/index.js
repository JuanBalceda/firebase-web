var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")

var usuario

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    window.location.href = "perfil.html"
  } else {
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
  }
});

btnLogin.addEventListener("click", function () {
  event.preventDefault();
  /*
    //Google Login
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  */

  //Facebook Login
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  /*
  //Twitter Login
  var provider = new firebase.auth.TwitterAuthProvider();
  */
  firebase.auth().signInWithPopup(provider)
    .then(function (datosUsuario) {
      console.log(datosUsuario)
      usuario = {
        nombre: datosUsuario.user.displayName,
        email: datosUsuario.user.email,
        uid: datosUsuario.user.uid,
      }
      agregarUsuario(usuario, usuario.uid);
    }).catch(function (err) {
      console.log(err)
    })
});

function agregarUsuario(usuario, uid) {
  ref.child(uid).update(usuario)
};
