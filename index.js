

const bufferABase64 = buffer => btoa(String.fromCharCode(... new Uint8Array(buffer)));
const base64ABuffer = buffer => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
const LONGITUD_SAL = 16;
const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;

async function derivarContra(contra, sal, iteraciones, longitud, hash, algoritmo = "AES-CBC"){
  const encoder = new TextEncoder();
  let keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(contra),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(sal),
      iterations: iteraciones,
      hash
    },
    keyMaterial,
    { name: algoritmo, length: longitud },
    false,
    ['encrypt', 'decrypt']
  );
};

async function encriptar2(contra, texto) {
  const encoder = new TextEncoder();
  const sal = window.crypto.getRandomValues(new Uint8Array(LONGITUD_SAL));
  const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(LONGITUD_VECTOR_INICIALIZACION));
  const bufferTextoPlano = encoder.encode(texto);
  const clave = await derivarContra(contra, sal, 100, 256, "SHA-256");
  const encrypted = await window.crypto.subtle.encrypt(
    {name: "AES-CBC", iv: vectorInicializacion},
    clave,
    bufferTextoPlano
  );
  return bufferABase64([
    ...sal,
    ...vectorInicializacion,
    ...new Uint8Array(encrypted)
  ]);
};

async function desencriptar2(contra, encriptadoBase64){
  try {
    const decoder = new TextDecoder();
    const datosEncriptados = base64ABuffer(encriptadoBase64);
    const sal = datosEncriptados.slice(0, LONGITUD_SAL);
    const vectorInicializacion = datosEncriptados.slice(LONGITUD_SAL, LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION);
    const clave = await derivarContra(contra, sal, 100, 256, 'SHA-256');
    console.log("Clave derivada:", clave); 
    const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: vectorInicializacion },
      clave,
      datosEncriptados.slice(LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION)
    );
    console.log("Datos desencriptados como buffer:", datosDesencriptadosComoBuffer); 
    const textoDesencriptado = decoder.decode(datosDesencriptadosComoBuffer);
    console.log("Texto desencriptado:", textoDesencriptado); 
    return textoDesencriptado;
  } catch (error) {
    console.error("Error en desencriptar2:", error);
    throw error; 
  }
}

async function encriptar() {
  let texto = document.getElementById("texto").value;
  let contra = document.getElementById("contra").value;
  let tituloMensaje = document.getElementById("titulo-mensaje");
  let parrafo = document.getElementById("parrafo");
  let muñeco = document.getElementById("muñeco");

  if (contra === "") {
    tituloMensaje.textContent = "Error";
    parrafo.textContent = "La contraseña no puede estar vacía.";
    muñeco.src = "./img/muñeco.png";
    return; // Salir de la función si la contraseña está vacía
  }

  if (texto === "") {
    tituloMensaje.textContent = "Error";
    parrafo.textContent = "El texto no puede estar vacío.";
    muñeco.src = "./img/muñeco.png";
    return; // Salir de la función si el texto está vacío
  }

  try {
    let textoCifrado = await encriptar2(contra, texto);
    document.getElementById("texto").value = textoCifrado;
    tituloMensaje.textContent = "Texto encriptado con éxito";
    parrafo.textContent = "";
    muñeco.src = "./img/encriptado.jpg";
  } catch (error) {
    console.error(error);
    muñeco.src = "./img/muñeco.png";
    tituloMensaje.textContent = "Error al encriptar el texto";
    parrafo.textContent = "Hubo un error al encriptar el texto. Por favor, inténtalo de nuevo.";
  }
}

async function desencriptar() {
  let texto = document.getElementById("texto").value;
  let contra = document.getElementById("contra").value;
  let tituloMensaje = document.getElementById("titulo-mensaje");
  let parrafo = document.getElementById("parrafo");
  let muñeco = document.getElementById("muñeco");

  if (contra === "") {
    tituloMensaje.textContent = "Error";
    parrafo.textContent = "La contraseña no puede estar vacía.";
    muñeco.src = "./img/muñeco.png";
    return; // Salir de la función si la contraseña está vacía
  }

  if (texto === "") {
    tituloMensaje.textContent = "Error";
    parrafo.textContent = "El texto no puede estar vacío.";
    muñeco.src = "./img/muñeco.png";
    return; // Salir de la función si el texto está vacío
  }

  try {
    let textoDesencriptado = await desencriptar2(contra, texto);
    document.getElementById("texto").value = textoDesencriptado;
    tituloMensaje.textContent = "Texto desencriptado con éxito";
    parrafo.textContent = "";
    muñeco.src = "./img/desencriptado.jpg";
  } catch (error) {
    console.error("Error al desencriptar:", error);
    muñeco.src = "./img/muñeco.png";
    tituloMensaje.textContent = "Error al desencriptar el texto";
    parrafo.textContent = "Hubo un error al desencriptar el texto. Por favor, inténtalo de nuevo.";
  }
}

document.addEventListener("DOMContentLoaded", async() =>{
  const contra = document.getElementById("contra");
  const texto = document.getElementById("texto");
  const btnEncriptar = document.getElementById("btn-encriptar");
  const btnDesencriptar = document.getElementById("btn-desencriptar");
})

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const crearCuentaLink = document.getElementById('crear-cuenta');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (username === '' || password === '') {
      alert('Por favor, completa todos los campos.');
    } else {
      // Aquí puedes continuar con la lógica de autenticación
    }
  });

  crearCuentaLink.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Redirigir a la página de creación de cuenta');
    // Puedes redirigir a la página de creación de cuenta o mostrar un formulario modal, etc.
  });
});

document.getElementById('crear-cuenta').addEventListener('click', function() {
  window.location.href = 'CrearCuenta.html'; // Cambia 'CrearCuenta.html' por la ruta correcta
});

