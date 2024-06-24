// Definição do som de tiro
var SOM_TIRO = new Audio();
SOM_TIRO.src = 'SND/tiro.mp3'; // Caminho do arquivo de áudio
SOM_TIRO.volume = 0.2;          // Volume do som
SOM_TIRO.load();                // Carregar o som

// Definição da classe Tiro
function Tiro(context, nave){
    this.context = context;         // Contexto do canvas
    this.nave = nave;               // Nave que disparou o tiro

    // Posicionar o tiro no bico da nave
    this.largura = 3;               // Largura do tiro
    this.altura = 10;               // Altura do tiro
    this.x = nave.x + 18;           // Posição X do tiro (no centro da nave)
    this.y = nave.y - this.altura;  // Posição Y do tiro (acima da nave)
    this.velocidade = 400;          // Velocidade do tiro
    this.cor = 'red';               // Cor do tiro

    // Iniciar o som do tiro
    SOM_TIRO.currentTime = 0.0;     // Reiniciar o áudio
    SOM_TIRO.play();                // Tocar o som do tiro
}

// Adicionando métodos à classe Tiro
Tiro.prototype = {
    // Método para atualizar a posição do tiro
    atualizar: function(){
        this.y -= this.velocidade * this.animacao.decorrido / 1000; // Movimentar o tiro para cima

        // Se o tiro saiu da tela, removê-lo da animação e do colisor
        if(this.y < -this.altura){
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    // Método para desenhar o tiro
    desenhar: function(){
        var ctx = this.context; // Referência ao contexto do canvas
        ctx.save();             // Salvar o estado atual do contexto
        ctx.fillStyle = this.cor; // Definir a cor de preenchimento do tiro
        ctx.fillRect(this.x, this.y, this.largura, this.altura); // Desenhar o retângulo do tiro
        ctx.restore();          // Restaurar o estado anterior do contexto
    },
    // Método que retorna os retângulos de colisão do tiro
    retangulosColisao: function(){
        return [{
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura
        }];
    },
    // Método chamado quando o tiro colide com outro objeto (não utilizado neste exemplo)
    colidiuCom: function(outro){

    }
}
