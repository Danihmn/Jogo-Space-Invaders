// Define um novo objeto de áudio para o som de explosão
var SOM_EXPLOSAO = new Audio();

// Define o caminho do arquivo de áudio
SOM_EXPLOSAO.src = 'SND/explosao.mp3';

// Define o volume do som de explosão
SOM_EXPLOSAO.volume = 0.4;

// Carrega o áudio
SOM_EXPLOSAO.load();

// Define a função construtora para o objeto Explosao
function Explosao(context, imagem, x, y){
    // Contexto do canvas onde a explosão será desenhada
    this.context = context;

    // Imagem que será utilizada para representar a explosão
    this.imagem = imagem;

    // Objeto Spritesheet para lidar com a animação da explosão
    this.spritesheet = new Spritesheet(context, imagem, 1 ,5);

    // Define o intervalo entre os quadros da animação da explosão
    this.spritesheet.intervalo = 75;

    // Posição inicial da explosão no canvas
    this.x = x;
    this.y = y;

    // Define o ponto inicial do som de explosão e reproduz o som
    SOM_EXPLOSAO.currentTime = 0.0;
    SOM_EXPLOSAO.play();

    // Referência à instância da explosão para ser acessada dentro da função de callback
    var explosao = this;

    // Função de callback para ser chamada quando a explosão terminar
    this.fimDaExplosao = null;

    // Define a função de callback para o fim do ciclo de animação
    this.spritesheet.fimDoCiclo = function(){
        // Remove a explosão da animação
        explosao.animacao.excluirSprite(explosao);

        // Chama a função de callback de fim de explosão, se existir
        if(explosao.fimDaExplosao) explosao.fimDaExplosao();
    }
}

// Adiciona métodos ao protótipo da Explosao
Explosao.prototype = {
    // Método para atualizar a explosão (não implementado aqui)
    atualizar: function(){

    },
    // Método para desenhar a explosão
    desenhar: function(){
        // Desenha a explosão usando o objeto Spritesheet
        this.spritesheet.desenhar(this.x, this.y);

        // Avança para o próximo quadro da animação
        this.spritesheet.proximoQuadro();
    }
}