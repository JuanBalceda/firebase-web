var ref = firebase.database().ref("usuario");
var refGuitarra = firebase.database().ref("guitarra");

var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")

var guitarraForm = document.getElementById("guitarraForm")
var nombre = document.getElementById("nombre")
var descripcion = document.getElementById("descripcion")
var tipo = document.getElementById("tipo")
var precio = document.getElementById("precio")
var img = document.getElementById("img")

var loginUser = {}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    loginUser = user
  } else {
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
    window.location.href = "index.html"
  }
});

btnLogout.addEventListener("click", function () {
  event.preventDefault();
  firebase.auth().signOut()
    .catch(function (err) {
      //console.log(err)
    });
});

function nuevaGuitarra() {
  event.preventDefault()
  var objeto = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
    img: img.value
  }

  if (objeto.tipo == "normal") {
    subirGuitarra(objeto, "normal")
  } else if (objeto.tipo == "vip") {
    subirGuitarra(objeto, "vip")
  } else {
    alert("El tipo debe ser normal o vip")
  }

}

function subirGuitarra(guitarra, tipo) {
  refGuitarra.child(tipo).push(guitarra).then(function () {
    guitarraForm.reset()
    alert("Guitarra agregada")
  }).catch(function (err) {
    console.log(err)
  })
}