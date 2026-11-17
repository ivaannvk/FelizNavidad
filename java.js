
const botonInicio = document.getElementById("botonInicio");
const bienvenida = document.querySelector(".bienvenida");
const seccionRegalo = document.getElementById("seccionRegalo");
const cajaRegalo = document.getElementById("cajaRegalo");
const botonAbrir = document.getElementById("botonAbrir");
const mensajeRegalo = document.getElementById("mensajeRegalo");

// ELEMENTOS DE LA CARTA
const seccionCarta = document.getElementById("seccionCarta");
const sobre = document.getElementById("sobre");
const carta = document.getElementById("carta");
const textoCarta = document.getElementById("textoCarta");
const firma = document.getElementById("firma");

/* MOSTRAR EL REGALO */
botonInicio.addEventListener("click", () => {
    bienvenida.hidden = true;
    seccionRegalo.hidden = false;
});

/* ABRIR EL REGALO */
botonAbrir.addEventListener("click", () => {
    cajaRegalo.textContent = "💝";
    mensajeRegalo.hidden = false;
    botonAbrir.hidden = true;
    seccionCarta.hidden = false;
});

/* APERTURA DE LA CARTA */
sobre.addEventListener("click", () => {
    sobre.classList.add("oculto");
    carta.hidden = false;
    escribirCarta();
});

/* EFECTO DE ESCRITURA */
function escribirCarta() {
    const mensaje = `Quería aprovechar estas fechas para decirte algo.

A veces aparecen personas que, sin esperarlo,
consiguen hacer que determinados momentos
sean un poquito más especiales.

Y tú eres una de esas personas.

No sé qué nos deparará el futuro,
pero sí sé que me alegra haberte conocido.

Espero que esta Navidad te regale
tantos momentos bonitos como los que mereces.`;

    let posicion = 0;
    textoCarta.textContent = "";
    firma.hidden = true;

    const intervalo = setInterval(() => {
        textoCarta.textContent += mensaje.charAt(posicion);
        posicion++;

        if (posicion >= mensaje.length) {
            clearInterval(intervalo);
            firma.hidden = false;
        }
    }, 45);
}

/* GENERADOR DE NIEVE */
function crearNieve() {
    const copo = document.createElement("div");
    copo.classList.add("nieve");
    copo.textContent = "❄";
    copo.style.left = Math.random() * 100 + "vw";
    copo.style.fontSize = (Math.random() * 12 + 10) + "px";
    copo.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.body.appendChild(copo);

    setTimeout(() => {
        copo.remove();
    }, 10000);
}

setInterval(crearNieve, 300);


/* CALENDARIO DE ADVIENTO */

const botonCalendario = document.getElementById("botonCalendario");
const seccionCalendario = document.getElementById("seccionCalendario");
const calendario = document.getElementById("calendario");
const sorpresa = document.getElementById("sorpresa");
const tituloSorpresa = document.getElementById("tituloSorpresa");
const contenidoSorpresa = document.getElementById("contenidoSorpresa");
const cerrarSorpresa = document.getElementById("cerrarSorpresa");

// Para probar el calendario puedes cambiar null por "2026-12-05".
// Cuando termines, vuelve a dejarlo en null.
const FECHA_PRUEBA = null;


// CONTENIDO DE LAS 24 CASILLAS

const sorpresas = [
    { tipo: "foto", titulo: "Un primer recuerdo", contenido: "./img/foto1.jpg" },
    { tipo: "boleto", titulo: "Una tarde de cine", contenido: "🎬 VALE POR UNA TARDE DE CINE. Película, palomitas y buena compañía. ¡Tú eliges qué vemos!" },
    { tipo: "frase", titulo: "Un pequeño recordatorio", contenido: "Hay personas que hacen especiales los días normales." },
    { tipo: "foto", titulo: "Un momento especial", contenido: "./img/foto2.jpg" },
    { tipo: "cancion", titulo: "Promesa", contenido: "./img/Melendi-Lapromesa.mp3" },
    { tipo: "foto", titulo: "Una sonrisa", contenido: "./img/foto3.jpg" },
    { tipo: "cancion", titulo: "Una canción para ti", contenido: "./img/SlappyLindooOo.mp3" },
    { tipo: "frase", titulo: "Un día bonito", contenido: "Un día más, una nueva razón para sonreír." },
    { tipo: "boleto", titulo: "Un paseo especial", contenido: "🚶 VALE POR UN PASEO SIN PRISAS. Elegimos un lugar bonito, disfrutamos del momento y creamos un nuevo recuerdo." },
    { tipo: "frase", titulo: "Un deseo", contenido: "Espero que hoy tengas un día precioso." },
    { tipo: "frase", titulo: "Disfrutar del presente", contenido: "A veces, lo más bonito es disfrutar del presente y de las pequeñas cosas." },
    { tipo: "boleto", titulo: "Una merienda", contenido: "☕ VALE POR UNA MERIENDA ESPECIAL. Algo rico, una buena conversación y un ratito para nosotros." },
    { tipo: "boleto", titulo: "Un plan sorpresa", contenido: "🎁 VALE POR UN PLAN SORPRESA. No preguntes demasiado, solo reserva un día para descubrirlo." },
    { tipo: "boleto", titulo: "Una cena especial", contenido: "🍽️ VALE POR UNA CENA ESPECIAL. Elegimos nuestro sitio favorito, disfrutamos de algo rico y compartimos una velada diferente." },
    { tipo: "foto", titulo: "Otro recuerdo bonito", contenido: "./img/foto4.jpg" },
    { tipo: "cancion", titulo: "Nuestra banda sonora", contenido: "./img/OMARCOURTZ-PORSIMAÑANANOESTOY.mp3" },
    { tipo: "boleto",titulo: "Una pequeña aventura",contenido: "🎡 VALE POR UNA AVENTURA JUNTOS. Un lugar nuevo, un plan improvisado y un recuerdo que guardar." },
    { tipo: "cancion", titulo: "Una canción especial", contenido: "./img/SlappyAv,NoTeTengoATí.mp3"},
    { tipo: "foto", titulo: "Un instante", contenido: "./img/foto5.jpg" },
    { tipo: "video", titulo: "Un pequeño vídeo", contenido: "./img/video1.mp4" },
    { tipo: "frase", titulo: "Un deseo navideño", contenido: "Espero que hayas disfrutado de estas pequeñas sorpresas." },
    { tipo: "video", titulo: "Un recuerdo en movimiento", contenido: "./img/video2.mp4" },
    { tipo: "frase", titulo: "Ya casi es Navidad", contenido: "¡Feliz Navidad! Deseo que tengas unas fiestas preciosas y llenas de momentos felices." },
    { tipo: "foto", titulo: "La última sorpresa", contenido: "./img/foto6.jpg" }
];


// RECUPERAR LOS DÍAS ABIERTOS

let diasAbiertos = [];

try {
    diasAbiertos = JSON.parse(localStorage.getItem("diasAbiertos") || "[]");

    if (!Array.isArray(diasAbiertos)) {
        diasAbiertos = [];
    }
} catch (error) {
    diasAbiertos = [];
}


// CALCULAR QUÉ DÍA ESTÁ DISPONIBLE

function obtenerDiaDisponible() {
    const fecha = new Date("2026-12-07T12:00:00");  

    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const dia = fecha.getDate();

    // Antes de diciembre de 2026
    if (año < 2026 || (año === 2026 && mes < 11)) {
        return 0;
    }

    // Durante diciembre de 2026
    if (año === 2026 && mes === 11) {
        return Math.min(dia, 24);
    }

    // Después de diciembre de 2026
    return 24;
}


// CREAR LAS 24 CASILLAS

function crearCalendario() {
    calendario.innerHTML = "";

    const diaDisponible = obtenerDiaDisponible();

    for (let i = 1; i <= 24; i++) {
        const casilla = document.createElement("button");
        casilla.classList.add("casilla");
        casilla.type = "button";

        const numero = document.createElement("span");
        numero.textContent = i;

        const estado = document.createElement("small");

        if (i <= diaDisponible) {

            if (diasAbiertos.includes(i)) {
            casilla.classList.add("bloqueada-visual");
            }

            estado.textContent = "DESCUBRIR";

        } else {

            estado.textContent = "BLOQUEADA";
            casilla.disabled = true;

        }

        casilla.appendChild(numero);
        casilla.appendChild(estado);

        casilla.addEventListener("click", () => {
            abrirSorpresa(i);
        });

        calendario.appendChild(casilla);
    }
}


// ABRIR UNA SORPRESA

function abrirSorpresa(dia) {
    const diaDisponible = obtenerDiaDisponible();

    if (dia > diaDisponible) {
        return;
    }

    const dato = sorpresas[dia - 1];

    tituloSorpresa.textContent = dato.titulo;
    contenidoSorpresa.innerHTML = "";


    // FOTOGRAFÍAS
    if (dato.tipo === "foto") {
        const imagen = document.createElement("img");
        imagen.src = dato.contenido;
        imagen.alt = "Una fotografía especial";

        contenidoSorpresa.appendChild(imagen);


    // CANCIONES
    } else if (dato.tipo === "cancion") {
        const audio = document.createElement("audio");

        audio.src = dato.contenido;
        audio.controls = true;
        audio.preload = "auto";
        audio.style.width = "100%";

        contenidoSorpresa.appendChild(audio);
        audio.load();


    // VÍDEOS
    } else if (dato.tipo === "video") {
        const video = document.createElement("video");

        video.src = dato.contenido;
        video.controls = true;
        video.preload = "metadata";
        video.style.width = "100%";
        video.style.borderRadius = "8px";

        contenidoSorpresa.appendChild(video);


    // REGALOS
    } else if (dato.tipo === "regalo") {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Abrir mi sorpresa";

        const texto = document.createElement("p");
        texto.textContent = dato.contenido;
        texto.hidden = true;

        boton.addEventListener("click", () => {
            texto.hidden = false;
            boton.hidden = true;
        });

        contenidoSorpresa.appendChild(boton);
        contenidoSorpresa.appendChild(texto);


    // FRASES Y BOLETOS
    } else {
        const texto = document.createElement("p");
        texto.textContent = dato.contenido;

        if (dato.tipo === "boleto") {
            texto.classList.add("contenido-boleto");
        } else {
            texto.classList.add("contenido-foto");
        }

        contenidoSorpresa.appendChild(texto);
    }


    // GUARDAR EL DÍA COMO ABIERTO

    if (!diasAbiertos.includes(dia)) {
        diasAbiertos.push(dia);
        localStorage.setItem("diasAbiertos", JSON.stringify(diasAbiertos));
    }

    crearCalendario();

    sorpresa.hidden = false;

    sorpresa.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// MOSTRAR EL CALENDARIO

botonCalendario.addEventListener("click", () => {
    seccionCalendario.hidden = false;

    crearCalendario();

    seccionCalendario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// CERRAR LA SORPRESA

cerrarSorpresa.addEventListener("click", () => {
    sorpresa.hidden = true;
});



