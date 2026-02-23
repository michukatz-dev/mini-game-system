//Entrega Michelle Katz (220144) Y Maite Rios (362540)
window.addEventListener('load', inicio);


function inicio() {
    let datos = document.getElementById('datos');
    let juegos = document.getElementById('juegos');
    let administrador = document.getElementById('administrador');
    botonesInicio()

    //para que solo se vea datos
    datos.style.display = "block";
    juegos.style.display = "none";
    administrador.style.display = "none";

    //juegos
    juegoSuma();
    juegoIconos();


    document.getElementById('idBotonAgregar').addEventListener('click', altaJugadores);
    funcionComentarios()
    document.getElementById('destacar').addEventListener('input', buscador);

    document.getElementById('comentario1').addEventListener('change', agregarTablaDatos);
    document.getElementById('comentario2').addEventListener('change', agregarTablaDatos);

    document.getElementById("idModoAdministrador").addEventListener("click", actualizarTodos);
    // masComentarios()
    // nuncaJugo()

}


//Coneccion a que todas las tablans anden TABLA SECCION ADMINISTRADOR DE RESULTADOS JUEGOS
function funcionComentarios() {
    document.getElementById('botonEnviarComentario').addEventListener('click', desarrolloComentarios)
    document.getElementById('enviar').addEventListener('click', tablas)
    document.getElementById('tablaJuegoEmojis').addEventListener('click', tablas)
    document.getElementById('botonEnviarComentario').addEventListener('click', tablas)
    document.getElementById('botonEnviarComentario').addEventListener('click', tabla3)
    //lista de datos coneccion
    document.getElementById('botonEnviarComentario').addEventListener('click', masComentarios)
    document.getElementById('idBotonAgregar').addEventListener('click', nuncaJugo)
    document.getElementById('idBotoncuantosjugadores').addEventListener('click', totaljugadores)
    document.getElementById('mismaEdad').addEventListener('click', mismaEdad)
    document.getElementById('btnMayor10').addEventListener('click', mayores10A)
    document.getElementById('btnPromedio').addEventListener('click', mejorpromedio)

}

function mejorpromedio() {
    let lista = sistema.jugadores;
    let name = ""
    let maximo = 0;
    for(let i of lista){
       let suma =  i.sumaBien + i.iconosBien;
       if (suma >maximo){
        maximo = suma;
        name =i.nombre
       }

    }
    alert (name + " "+ maximo )
}

function mayores10A() {
    let lista = sistema.jugadores;
    suma = 0;
    for (let i of lista) {
        if (i.edad > 10) {
            suma++
        }
    }

    alert(suma)
}

function botonPromedio() {

    if (sistema.jugadores.length === 0) {
        alert("No hay jugadores");
        return;
    }

    let lista = sistema.jugadores;
    let suma = 0
    for (let i of lista) {
        suma = i.edad;


    }
    let promedio = suma / sistema.jugadores.length

}


function jugadorMasJoven() {
    let lista = sistema.jugadores;
    let min = Number.MAX_SAFE_INTEGER;
    let name = ""

    for (let i of lista) {
        if (i.edad < min) {
            min = i.edad
            name = i.nombre
        }
    }

    alert("nombre del mas chico: " + name + " " + min)

}

function mismaEdad() {
    let ul = document.getElementById("masComentarios");
    ul.innerHTML = "";

    if (sistema.jugadores.length === 0) {
        ul.innerHTML = "<li>Sin datos</li>";
        return;
    }


    function aciertos() {
        let lista = sistema.jugadores;
        let max = 0;
        let name = ""
        for (let i of lista) {
            if (i.sumaBien + i.iconosBien > max) {
                max = i.sumaBien + i.iconosBien
                name = i.nombre
            }

        }

        alert("nombre " + name + " max " + max)
    }




    let orden = sistema.jugadores.sort((a, b) => a.edad - b.edad)
    for (let i = 0; i < orden.length; i++) {
        if (orden[j].edad == orden[j + 1].edad) {
            let li = document.createElement("li");
            li.textContent = orden[j].nombre + orden[j + 1].nombre + ", edad " + j.edad + orden[j].edad;
            ul.appendChild(li);
        }
    }
}


function top3(){
    let lista = sistema.jugadores
    let max1 = 0 
    let max2 = 0 
    let max3 = 0 
    for (let i of lista){
        if (i.iconosBien > max1 && i.iconosBien > max2 && i.iconosBien > max3 ){
            max1 = i.iconosBien
        }

         if (i.iconosBien < max1 && i.iconosBien > max2 && i.iconosBien > max3 ){
            max2 = i.iconosBien
        }

        if (i.iconosBien < max1 && i.iconosBien < max2 && i.iconosBien > max3 ){
            max3 = i.iconosBien
        }
    }
    alert (max1 +" " + max2+ " "+max3)
    
}


function totaljugadores() {
    let lista = sistema.jugadores
    let total = lista.length
    alert(total)
}

//BOTONES FIJOS INICIO
function botonesInicio() {
    let botonDatos = document.getElementById("BotonDatos");
    let botonJuegos = document.getElementById("Botonjuegos");
    let botonAdministrador = document.getElementById("BotonAdministrador");


    botonDatos.addEventListener("click", function iddatos() {
        datos.style.display = "block";
        juegos.style.display = "none";
        administrador.style.display = "none";
    });

    //solo permite acceder si tenes jugador
    botonJuegos.addEventListener("click", function idjuegos() {
        if (sistema.jugadores.length === 0) {
            alert("ingresar jugador");
            return;
        } else {
            datos.style.display = "none";
            juegos.style.display = "block";
            administrador.style.display = "none";
        }
    });
    botonAdministrador.addEventListener("click", function idadministrador() {
        datos.style.display = "none";
        juegos.style.display = "none";
        administrador.style.display = "block";
    });
}


//ALTA DE JUGADORES (datos)
function altaJugadores() {
    let formulario = document.getElementById("formulario");
    let nombre = document.getElementById("idNombre").value;
    let edad = parseInt(document.getElementById("idEdad").value);

    if (nombre == "") {
        alert("agregar nombre")
        return
    }
    // Si existe jugador se avisa
    if (sistema.existeJugador(nombre)) {
        alert('YA EXISTE UN USUARIO CON ESE NOMBRE')
        return;
    }

    if (edad < 5 || edad > 100) {
        alert('el usuario no tiene la edad correcta')
        return;
    }

    sistema.agregarJugador(nombre, edad);
    formulario.reset();
    //agregar al select de juegos
    agregarASelect();

}

//AGREGAR AL SELECT EN SECCION JUGADORES
function agregarASelect() {
    let lista = document.getElementById('jugador');
    lista.innerHTML = "";
    for (let c of sistema.jugadores) {
        let nodo = document.createElement('option');
        nodo.text = c.nombre + " " + c.edad;
        nodo.value = c.nombre;
        lista.appendChild(nodo);
    }

}


//BUSCADOR
function buscador() {
    let input = document.getElementById('destacar');
    let texto = input.value.toLowerCase();

    let comentarioo = document.querySelectorAll('.Comentarios');

    comentarioo.forEach(celda => {
        let original = celda.textContent;     // texto normal
        // para comparar

        if (texto !== "" && original.toLowerCase().includes(texto)) {

            // armamos el resaltado
            let regex = new RegExp(texto, "gi"); // g = global, i = ignoreCase
            let nuevo = original.replace(regex, match => {
                return `<span style="color:red;">${match}</span>`;
            });

            celda.innerHTML = nuevo;

        } else {
            // si no hay coincidencia, restauramos el texto original
            celda.innerHTML = original;
        }
    });
}



//LISTA DE JUGADORES CON MAS COMENTARIOS
function masComentarios() {
    let ul = document.getElementById("masComentarios");
    ul.innerHTML = "";


    if (sistema.jugadores.length === 0) {
        ul.innerHTML = "<li>Sin datos</li>";
        return;
    }
    sistema.jugadores.sort((a, b) => {
        if (a.nombre > b.nombre) return 1;
        if (a.nombre < b.nombre) return -1;
        return 0;
    });

    let max = 0;
    for (let j of sistema.jugadores) {
        if (j.comentarios.length > max) {
            max = j.comentarios.length;
        }
    }

    for (let j of sistema.jugadores) {
        if (j.comentarios.length === max) {
            let li = document.createElement("li");
            li.textContent = j.nombre + ", edad " + j.edad + " (" + j.comentarios.length + " comentarios)";
            ul.appendChild(li);
        }

    }

}

//LISTA DE JUGADORES QUE NUNCA JUGARON
function nuncaJugo() {
    let hayAlMenosUno = false;
    let ul = document.getElementById("nuncaJugo");
    ul.innerHTML = "";
    if (sistema.jugadores.length === 0) {
        ul.innerHTML = "<li>Sin datos</li>";
        return;
    }

    sistema.jugadores.sort((a, b) => {
        if (a.nombre > b.nombre) return 1;
        if (a.nombre < b.nombre) return -1;
        return 0;
    });

    for (let j of sistema.jugadores) {
        if (j.iconosBien == 0 && j.iconosMal == 0 && j.sumaBien == 0 && j.sumaMal == 0) {
            let li = document.createElement("li");
            li.textContent = j.nombre + ", edad " + j.edad;
            ul.appendChild(li);
            hayAlMenosUno = true;

        }
    }

    if (!hayAlMenosUno) {
        ul.innerHTML = "<li>Sin datos</li>";
    }
}

//JUEGO CON ICONOS
let parejas = [
    ["🐶", "🐺"],
    ["🐱", "🦁"],
    ["🐰", "🐹"],
    ["🐸", "🐢"],
    ["🐴", "🦄"],
    ["🐮", "🐷"],
    ["🍎", "🍅"],
    ["👮", "🕵️"],
    ["🐻", "🐼"],
    ["🐭", "🐹"],
    ["🐔", "🐤"],
    ["🐍", "🦎"],
    ["🐟", "🐠"],
    ["🦉", "🦅"],
    ["🍒", "🍇"],
    ["🍉", "🍈"],
    ["😀", "😃"],
    ["😎", "🤠"],
    ["😐", "😶"],
];


//SONIDOS
let sonidoBien = new Audio('audio/ping.mp3');
let sonidoMal = new Audio('audio/ping2.mp3');

function iconosAlAzar() {
    let iconosPares = Math.floor(Math.random() * parejas.length);
    return parejas[iconosPares];


}


function juegoIconos() {
    let tickSonido = document.getElementById('conSonido');
    let table = document.getElementById('tablaJuegoEmojis');
    table.innerHTML = "";
    let numTabla = Math.floor(Math.random() * 3) + 2;
    let [icono1, icono2] = iconosAlAzar();
    let total = numTabla * numTabla;
    let iconoDiferente = Math.floor(Math.random() * total);

    let k = 0
    for (let i = 0; i < numTabla; i++) {
        let fila = table.insertRow();
        for (let j = 0; j < numTabla; j++, k++) {
            let celda = fila.insertCell();
            let iconoBoton = document.createElement('button');
            iconoBoton.addEventListener('click', tablas)
            let esDiferente = (k === iconoDiferente);
            iconoBoton.textContent = esDiferente ? icono2 : icono1;

            iconoBoton.addEventListener('click', () => {
                let jugador = jugadorActual();
                //ACA SI ACIETA SUMA 1 
                if (esDiferente) {
                    jugador.iconosBien++;
                    nuncaJugo()
                    if (tickSonido && tickSonido.checked) {
                        sonidoBien.play();
                    } else {

                        alert('wohooo');
                    }
                    juegoIconos();
                } else {
                    //ACA NO ACIRETA SUMA 1 
                    jugador.iconosMal++;
                    nuncaJugo()

                    if (tickSonido && tickSonido.checked) {
                        sonidoMal.play();
                    } else {
                        alert('Siga intentando');
                    }
                }

            });
            celda.appendChild(iconoBoton);
        }

    }


}

//JUEGO CALCULA LA SUMA
let num1;
let num2;

function juegoSuma() {
    nuevaSuma();
    document.getElementById('enviar').addEventListener('click', calculaSuma);
}

//CREA TEXTO DE 2 NUMEROS AL AZAR
function nuevaSuma() {
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    document.getElementById('suma').innerHTML = "Sumar..." + num1 + "+" + num2;
    document.getElementById('botonEnviar').value = "";
}


//SUMA NUMERO. SI ESTA BIEN RESET SINO REPITE
function calculaSuma() {
    let tickSonido = document.getElementById('conSonido');
    let cuenta = num1 + num2;
    let respuesta = parseInt(document.getElementById('botonEnviar').value);
    let jugador = jugadorActual();
    if (respuesta === cuenta) {
        jugador.sumaBien++;
        nuncaJugo();
        let boton = document.getElementById('botonEnviar')
        boton.style.backgroundColor = 'lightgreen';
        if (tickSonido && tickSonido.checked) {
            sonidoBien.play();
        }
        // TIEMPO PARA CAMBIAR AL COLOR BLANCO
        setTimeout(() => {
            boton.style.backgroundColor = "white";
            nuevaSuma();
        }, 2000);
    } else {
        jugador.sumaMal++;
        nuncaJugo();

        let boton = document.getElementById('botonEnviar')
        boton.style.backgroundColor = 'lightyellow';
        if (tickSonido && tickSonido.checked) {
            sonidoMal.play();
        }

        document.getElementById('botonEnviar').value = "";

        // TIEMPO PARA CAMBIAR AL COLOR BLANCO
        setTimeout(() => {
            boton.style.backgroundColor = 'white';
        }, 1000)

    }


}


//AGARRAR EL JUGADOR CORRECTO HECHO Y COLOCAR CUANTOS ACERTO Y ERRO 
function jugadorActual() {
    let nombreSelect = document.getElementById('jugador').value;
    for (let j of sistema.jugadores) {
        if (j.nombre === nombreSelect) {
            return j;
        }
    }
    return null;
}



function desarrolloComentarios() {
    let texto = document.getElementById('idComentario').value;
    let jugador = jugadorActual();


    //para obligar a elegir jugador
    if (!jugador) {
        alert("Seleccioná un jugador");
        return;
    }
    //si no hay texto...
    if (texto === "") {
        alert("Escribí un texto");
        return;
    }

    let nuevoComentario = new Comentarios(texto);
    jugador.comentarios.push(nuevoComentario);

    document.getElementById('idComentario').value = "";
    agregarTablaDatos()
    tabla3();

}

function tablas() {
    agregarTablaResumen()

}


function agregarTablaDatos(datos) {
    let tabla = document.getElementById('TablaDatosAgregar');
    tabla.innerHTML = "";
    //FILTROS TABLAS DATOS
    let lista = sistema.jugadores.slice();
    let filtroPorNombre = document.getElementById('comentario1').checked;
    let filtroPorEdad = document.getElementById("comentario2").checked;


    if (filtroPorEdad) {
        lista.sort((a, b) => a.edad - b.edad);

    }

    if (filtroPorNombre) {
        lista.sort(function (a, b) {
            //ORDEN ASCENDENTE MARCADO POR EL 1
            if (a.nombre > b.nombre) return 1;
            if (a.nombre < b.nombre) return -1;
            return 0;
        });
    }

    //para la tabla le agregamos una fila con 3 celdas
    for (let j of lista) {
        if (j.comentarios != "") {
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell();
            celdaNombre.textContent = j.nombre;

            let celdaEdad = fila.insertCell();
            celdaEdad.textContent = j.edad;

            let celdaComentarios = fila.insertCell();
            celdaComentarios.classList.add("Comentarios");
            celdaComentarios.textContent = j.comentarios.join(", ");
        }

    }

}

//TABLA 2
function agregarTablaResumen(datos) {
    let tabla2 = document.getElementById('tablaResumen')
    tabla2.innerHTML = "";
    let lista = sistema.jugadores.slice();


    for (let j of lista) {
        let fila2 = tabla2.insertRow();
        let celdaNombre2 = fila2.insertCell();
        celdaNombre2.textContent = j.nombre;

        let celdaEdad2 = fila2.insertCell();
        celdaEdad2.textContent = j.edad;

        let celdaiconosBien = fila2.insertCell();
        celdaiconosBien.textContent = j.iconosBien;

        let celdaiconosMal = fila2.insertCell();
        celdaiconosMal.textContent = j.iconosMal;

        let celdasumaBien = fila2.insertCell();
        celdasumaBien.textContent = j.sumaBien;

        let celdasumaMal = fila2.insertCell();
        celdasumaMal.textContent = j.sumaMal;

        let celdaCantidadComentarios = fila2.insertCell();
        celdaCantidadComentarios.textContent = j.comentarios.length;


    }
}




let ultimoComentarioEditado = null;

function tabla3(datos) {
    let tabla3 = document.getElementById("tablaEdicionComentarios")
    tabla3.innerHTML = "";

    let lista3 = [];
    for (let j of sistema.jugadores) {

        for (let c of j.comentarios) {
            lista3.push({
                nombre: j.nombre,
                comentario: c.comentario,
                fecha: c.fecha
            });
        }
    }
    lista3.sort((a, b) => a.fecha - b.fecha);
    for (let item of lista3) {
        let fila3 = tabla3.insertRow();

        let celdaNombre3 = fila3.insertCell();
        celdaNombre3.textContent = item.nombre;

        let hora = item.fecha.getHours();
        let minutos = item.fecha.getMinutes();
        let segundos = item.fecha.getSeconds();

        let horaEscrita = hora + ":" + minutos + ":" + segundos
        let celdaHora = fila3.insertCell();

        celdaHora.textContent = horaEscrita;

        let celdaComentarios3 = fila3.insertCell();

        let input = document.createElement("input");
        input.type = "text";
        input.value = item.comentario;

        // guardamos info para saber a quién pertenece
        input.dataset.nombre = item.nombre;
        input.dataset.fecha = item.fecha;


        input.addEventListener("input", () => {
            ultimoComentarioEditado = input.value;
        });

        celdaComentarios3.appendChild(input);

    }
}
//PARA ACTUALIZAR TODOS LOS INPUTS -
function actualizarTodos() {
    if (ultimoComentarioEditado === null) {
        return;
    }
    let inputs = document.querySelectorAll("#tablaEdicionComentarios input");

    inputs.forEach(inp => inp.value = ultimoComentarioEditado);
    for (let jugador of sistema.jugadores) {
        for (let comentario of jugador.comentarios) {
            comentario.comentario = ultimoComentarioEditado;
        }
    }
    agregarTablaDatos();
    alert("cambios impactados en tabla de seccion datos")
}






