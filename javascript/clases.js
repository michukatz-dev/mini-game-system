//Entrega Michelle Katz (220144) Y Maite Rios (362540)

class Sistema {
    constructor() {
        this.jugadores = [];
    }

    existeJugador(nombreBuscado) {
        for (let jugador of this.jugadores) {
            if (jugador.nombre === nombreBuscado) {
                return true;
            }
        }
        return false;
    }

    agregarJugador(nombre, edad) {
        if (this.existeJugador(nombre) == false) {
            let agregarNuevo = new Jugador(nombre, edad)
            this.jugadores.push(agregarNuevo)
        }
    }
}

let sistema = new Sistema();

class Jugador {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.iconosBien = 0;
        this.iconosMal = 0;
        this.sumaBien = 0;
        this.sumaMal = 0;
        this.comentarios = []
       

    }
//ACA AGREGAMOS COMENTARIO A LA LISTA JUGADOR
    agregarComentario() {
       
            let NuevoComentario = new Comentarios(comentario);
            this.comentarios.push(NuevoComentario);
        }
        

}




class Comentarios {
    constructor(comentario) {
        this.comentario = comentario
        this.fecha = new Date();

    }
    toString(){return this.comentario }
    }
