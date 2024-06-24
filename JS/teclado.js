// Definindo códigos de teclas como constantes
var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_CIMA = 38;
var SETA_BAIXO = 40;
var ESPACO = 32;
var ENTER = 13;

// Definição da classe Teclado
function Teclado(elemento){
    this.elemento = elemento;

    this.pressionadas = []; // Array de teclas pressionadas
    this.disparadas = [];   // Array de teclas disparadas
    this.funcoesDisparo = []; // Funções de disparo associadas às teclas

    // Registrar estado das teclas no array
    var teclado = this;
    elemento.addEventListener('keydown', function(evento){
        var tecla = evento.keyCode;
        teclado.pressionadas[tecla] = true;

        // Disparar função associada à tecla, se existir
        if(teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]){
            teclado.disparadas[tecla] = true;
            teclado.funcoesDisparo[tecla]();
        }
    });

    // Limpar estado da tecla quando ela é solta
    elemento.addEventListener('keyup', function(evento){
        teclado.pressionadas[evento.keyCode] = false;
        teclado.disparadas[evento.keyCode] = false;
    });
}

// Métodos da classe Teclado
Teclado.prototype = {
    // Verificar se uma tecla está pressionada
    pressionada: function(tecla){
        return this.pressionadas[tecla];
    },

    // Associar uma função a ser chamada quando uma tecla é disparada
    disparou: function(tecla, callback){
        this.funcoesDisparo[tecla] = callback;
    }
}
