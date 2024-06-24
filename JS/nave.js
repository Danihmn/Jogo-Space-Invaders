// Definição do construtor da classe Nave
function Nave(context, teclado, imagem, imgExplosao){
    this.context = context;             // Contexto do canvas
    this.teclado = teclado;             // Objeto para controle do teclado
    this.imagem = imagem;               // Imagem da nave
    this.x = 0;                         // Posição X da nave
    this.y = 0;                         // Posição Y da nave
    this.velocidade = 0;                // Velocidade de movimento da nave
    this.spritesheet = new Spritesheet(context, imagem, 3, 2); // Objeto de spritesheet para animação
    this.spritesheet.linha = 0;         // Linha inicial da spritesheet
    this.spritesheet.intervalo = 100;   // Intervalo entre os quadros da animação
    this.imgExplosao = imgExplosao;     // Imagem de explosão
    this.acabaramVidas = null;          // Função chamada quando as vidas extras acabam
    this.vidasExtras = 3;               // Vidas extras iniciais
}

// Adicionando métodos à classe Nave
Nave.prototype = {
    // Método para atualizar a posição da nave
    atualizar: function(){
        var incremento = this.velocidade * this.animacao.decorrido / 1000;

        // Movimento para a esquerda
        if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
            this.x -= incremento;

        // Movimento para a direita
        if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36)
            this.x += incremento;

        // Movimento para cima
        if(this.teclado.pressionada(SETA_CIMA) && this.y > 0)
            this.y -= incremento;

        // Movimento para baixo
        if(this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48)
            this.y += incremento;
    },
    // Método para desenhar a nave
    desenhar: function(){
        if(this.teclado.pressionada(SETA_ESQUERDA))
            this.spritesheet.linha = 1;
        else if(this.teclado.pressionada(SETA_DIREITA))
            this.spritesheet.linha = 2;
        else
            this.spritesheet.linha = 0;

        // Desenhar a nave com base na spritesheet
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },
    // Método para fazer a nave atirar
    atirar: function(){
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    // Método que retorna os retângulos de colisão da nave
    retangulosColisao: function(){
        // Valores ajustados para os retângulos de colisão
        var rets = [
            {x: this.x + 2, y: this.y + 19, largura: 9, altura: 13},
            {x: this.x + 13, y: this.y + 3, largura: 10, altura: 33},
            {x: this.x + 25, y: this.y + 19, largura: 9, altura: 13}
        ];
        return rets;
    },
    // Método para posicionar a nave no centro da tela
    posicionar: function(){
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 18;
        this.y = canvas.height - 48;
    },
    // Método chamado quando a nave colide com outro objeto
    colidiuCom: function(outro){
        // Se colidiu com um Ovini...
        if(outro instanceof Ovni){
            // Remover a nave e o ovni
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);

            // Criar explosões nas posições da nave e do ovni
            var exp1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            var exp2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y);

            // Adicionar as explosões à animação
            this.animacao.novoSprite(exp1);
            this.animacao.novoSprite(exp2);

            // Referência à nave para acesso dentro do escopo de função
            var nave = this;
            // Função chamada quando a explosão da nave terminar
            exp1.fimDaExplosao = function(){
                // Reduzir a quantidade de vidas extras da nave
                nave.vidasExtras--;

                // Se as vidas extras acabarem, chamar a função 'acabaramVidas'
                if(nave.vidasExtras < 0){
                    if(nave.acabaramVidas) nave.acabaramVidas();
                }else{
                    // Caso contrário, adicionar a nave de volta à animação e reposicioná-la
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);
                    nave.posicionar();
                }
            }
        }
    }
}