var ref = firebase.database().ref("usuario");
var refTest = firebase.database().ref("test");

var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")

var btnPush = document.getElementById("btnPush")
var btnUpdate = document.getElementById("btnUpdate")
var btnSet = document.getElementById("btnSet")
var btnRemove = document.getElementById("btnRemove")

var usuario

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

btnLogout.addEventListener("click", function () {
  firebase.auth().signOut()
    .catch(function (err) {
      console.log(err)
    });
});

function agregarUsuario(usuario, uid) {
  ref.child(uid).update(usuario)
};

//Push
btnPush.addEventListener("click", function () {
  //Ejemplo 01
  var objeto = {
    nombre: "firebase",
    profesor: "Juan",
    contenido: {
      primero: "Autenticación",
      segundo: "Database"
    }
  }
  refTest.push(objeto).then(function () {
    alert("Exito al subir los datos")
  }).catch(function (err) {
    console.log(err)
    alert("Error")
  })
});

//Update
btnUpdate.addEventListener("click", function () {
  /*
  //Ejemplo 01
  var objeto = {
    nombre: "Android",
    profesor: "Ann",
    contenido: {
      primero:"Layouts",
      segundo:"Java code"
    }
  }
  refTest.child("-LFNM56fGlXmkn3Qm5Gp").update(objeto).then(function(){
    alert("Exito al actualizar los datos")
  }).catch(function(err){
    console.log(err)
    alert("Error")
  })
  */
  //Ejemplo 01
  var objeto = {
    modo: "Virtual"
  }
  refTest.update(objeto).then(function () {
    alert("Exito al actualizar los datos")
  }).catch(function (err) {
    console.log(err)
    alert("Error")
  })
});

//Set
btnSet.addEventListener("click", function () {
  /*
  //Ejemplo 01
  var objeto = {
    nombre: "Android",
    profesor: "Ann",
    contenido: {
      primero: "Layouts",
      segundo: "Java code"
    }
  }
  refTest.set(objeto).then(function () {
    alert("Exito al setear los datos")
  }).catch(function (err) {
    console.log(err)
    alert("Error")
  })
  */
  //Ejemplo 02
  var objeto = {
    Lugar: "Peru"
  }
  refTest.set(objeto).then(function () {
    alert("Exito al setear los datos")
  }).catch(function (err) {
    console.log(err)
    alert("Error")
  })

});

//Remove
btnRemove.addEventListener("click", function () {
  //Ejemplo 01
  ref.child("-LFMs6lRRnHJgu_33oKR").remove().then(function () {
    alert("Exito al remover los datos")
  }).catch(function (err) {
    console.log(err)
    alert("Error")
  })
});