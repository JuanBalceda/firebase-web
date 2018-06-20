var ref = firebase.database().ref("usuario");
var loginUser = {}
var usuario = {}

var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")

var perfilNombre = document.getElementById("perfilNombre")
var perfilEmail = document.getElementById("perfilEmail")
var perfilTelefono = document.getElementById("perfilTelefono")
var perfilDireccion = document.getElementById("perfilDireccion")

var perfilEditar = document.getElementById("perfilEditar")

var datosPerfil = document.getElementById("datosPerfil")
var formularioPerfil = document.getElementById("formularioPerfil")
var form = document.getElementById("form")

var cancelForm = document.getElementById("cancelForm")

var nombreForm = document.getElementById("nombreForm")
var emailForm = document.getElementById("emailForm")
var telefonoForm = document.getElementById("telefonoForm")
var calleForm = document.getElementById("calleForm")
var interiorForm = document.getElementById("interiorForm")
var coloniaForm = document.getElementById("coloniaForm")
var cpForm = document.getElementById("cpForm")

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    leerInformacion(user.uid);
    loginUser = user
  } else {
    window.location.href = "index.html"
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
  }
});

btnLogout.addEventListener("click", function () {
  event.preventDefault();
  firebase.auth().signOut()
    .catch(function (err) {
      //console.log(err)
    });
});

function leerInformacion(uid) {
  /*
  //.once sólo llama una vez
  ref.child("zJ7Vj88JpuVLzttDAsa2wPFj6h02").once("value",function(data){
    console.log(data.val())
    llenarInformación(data.val().nombre, data.val().email)
  });
  */

  //.on Mantiene comunicación con la base de datos
  ref.child(uid).on('value', function (data) {
    llenarInformación(data.val())
  });
}

function llenarInformación(perfil) {
  var direccionCompleta

  perfilNombre.innerHTML = perfil.nombre
  perfilEmail.innerHTML = perfil.email
  perfilTelefono.innerHTML = perfil.telefono || '-'

  if (perfil.direccion != null) {
    direccionCompleta = perfil.direccion.calle + " " + perfil.direccion.interior + " " + perfil.direccion.codigoPostal + " " + perfil.direccion.colonia
  }
  perfilDireccion.innerHTML = direccionCompleta || '-'
  usuario = perfil
}

perfilEditar.addEventListener("click", function () {
  datosPerfil.style.display = "none"
  formularioPerfil.style.display = "block"
  nombreForm.value = usuario.nombre
  emailForm.value = usuario.email
  telefonoForm.value = usuario.telefono || ' '
  if (usuario.direccion != null) {
    calleForm.value = usuario.direccion.calle || ' '
    interiorForm.value = usuario.direccion.interior || ' '
    cpForm.value = usuario.direccion.codigoPostal || ' '
    coloniaForm.value = usuario.direccion.colonia || ' '
  }
})

cancelForm.addEventListener("click", function () {
  limpiarFormulario()
})

function limpiarFormulario() {
  form.reset()
  formularioPerfil.style.display = "none"
  datosPerfil.style.display = "block"
}

function editarDatos() {
  event.preventDefault()
  var objeto = {
    nombre: nombreForm.value,
    email: emailForm.value,
    telefono: telefonoForm.value,
    direccion: {
      calle: calleForm.value,
      interior: interiorForm.value,
      colonia: coloniaForm.value,
      codigoPostal: cpForm.value
    }
  }
  ref.child(loginUser.uid).update(objeto).then(function(){
    alert("Usuario editado correctamente")
    limpiarFormulario();
  }).catch(function(err){
    console.log(err)
  })
}