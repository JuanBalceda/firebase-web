var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("Tenemos usuario")
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
  } else {
    console.log("No tenemos usuario")
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
    }).catch(function (err) {
      console.log(err)
    })
});

btnLogout.addEventListener("click", function () {
  firebase.auth().signOut()
    .catch(function (err) {
      console.log(err)
    });
});