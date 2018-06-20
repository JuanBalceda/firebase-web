var ref = firebase.database().ref("usuario");
var refGuitarra = firebase.database().ref("guitarra");
var refImg = firebase.storage().ref();

var btnLogin = document.getElementById("btnLogin")
var btnLogout = document.getElementById("btnLogout")


var guitarraDemoA = document.getElementById("guitarraDemoA")
var guitarraDemoB = document.getElementById("guitarraDemoB")

var perfilNav = document.getElementById("perfilNav")

var usuarioLogin = {}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = "none"
    btnLogout.style.display = "block"

    perfilNav.style.display = "block"

    guitarraDemoA.style.display = "none"
    guitarraDemoB.style.display = "none"

    usuarioLogin = user
    leerGuitarrasNormales()
    leerGuitarrasVIP()
  } else {
    btnLogout.style.display = "none"
    btnLogin.style.display = "block"

    perfilNav.style.display = "none"

    guitarraDemoA.style.display = "block"
    guitarraDemoB.style.display = "block"
  }
});

btnLogin.addEventListener("click", function () {
  event.preventDefault();

  //Google Login
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  /*
  //Facebook Login
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  */
  /*
  //Twitter Login
  var provider = new firebase.auth.TwitterAuthProvider();
  */
  firebase.auth().signInWithPopup(provider)
    .then(function (datosUsuario) {
      usuario = {
        nombre: datosUsuario.user.displayName,
        email: datosUsuario.user.email,
        uid: datosUsuario.user.uid,
      }
      agregarUsuario(usuario, usuario.uid);
      window.location.href = "perfil.html"
    }).catch(function (err) {
      console.log(err)
    })
});

function agregarUsuario(usuario, uid) {
  ref.child(uid).update(usuario)
};

btnLogout.addEventListener("click", function () {
  event.preventDefault();
  firebase.auth().signOut().then(function () {
      window.location.href = "index.html"
    })
    .catch(function (err) {
      //console.log(err)
    });
});

function leerGuitarrasNormales() {
  refGuitarra.child("normal").on("child_added", function (datos) {
    var guitar = datos.val()
    var contenedorElementos = document.getElementById("guitarraNormal")
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
      contenedorElementos.firstChild
    )
  })
}

function leerGuitarrasVIP() {
  refGuitarra.child("vip").on("child_added", function (datos) {
    var guitar = datos.val()
    var contenedorElementos = document.getElementById("guitarraVIP")
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
      contenedorElementos.firstChild
    )
  })
}

function crearElementoGuitarra(clave, nombre, precio, descripcion, img) {
  var uid = usuarioLogin.uid;

  var html =
    '<article class="guitarra contenedor">' +
    '<img class="derechaa" src="" alt="Guitarra invie acustica" width="150" />' +
    '<div class="contenedor-guitarra-a">' +
    '<h3 class="title-b"></h3>' +
    '<ol>' +
    '<li class="precio-b"></li>' +
    '<li class="descripcion-b"></li>' +
    '</ol>' +
    '</div>' +
    '<button type="button" onclick="comprar(' + '`' + clave + '`' + ')">Comprar</button>' +
    '</article>'

  //Crear elemento para el html
  var div = document.createElement('div')
  div.innerHTML = html
  var guitarElement = div.firstChild
  var imgURL = ""
  refImg.child(img).getDownloadURL().then(function (url) {
    imgURL = url
  }).then(function () {
    guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
    guitarElement.getElementsByClassName('precio-b')[0].innerText = "$ " + precio
    guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
    guitarElement.getElementsByClassName('derechaa')[0].src = imgURL
  }).catch(function (err) {
    console.log(err)
  })
  return guitarElement;

}