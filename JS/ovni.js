// Definição do construtor da classe Ovni
function Ovni(context, imagem, imgExplosao){
    this.context = context;             // Contexto do canvas
    this.imagem = imagem;               // Imagem do ovni
    this.x = 0;                         // Posição X do ovni
    this.y = 0;                         // Posição Y do ovni
    this.velocidade = 0;                // Velocidade de movimento do ovni
    this.imgExplosao = imgExplosao;     // Imagem de explosão do ovni
}

// Adicionando métodos à classe Ovni
Ovni.prototype = {
    // Método para atualizar a posição do ovni
    atualizar: function(){
        // Atualizar a posição do ovni com base na velocidade
        this.y += this.velocidade * this.animacao.decorrido / 1000;

        // Se o ovni saiu da tela, removê-lo da animação e do colisor
        if(this.y > this.context.canvas.height){
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    // Método para desenhar o ovni
    desenhar:function(){
        var ctx = this.context; // Referência ao contexto do canvas
        var img = this.imagem;  // Referência à imagem do ovni

        // Desenhar o ovni na posição especificada
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    },
    // Método que retorna os retângulos de colisão do ovni
    retangulosColisao: function(){
        // Definir os retângulos de colisão ajustados para o ovni
        var rets = [
            {x: this.x + 20, y: this.y + 1, largura:25, altura:10},
            {x: this.x + 2, y: this.y + 11, largura:60, altura:12},
            {x: this.x + 20, y: this.y + 23, largura:25, altura:7},
        ];
        return rets;
    },
    // Método chamado quando o ovni colide com outro objeto
    colidiuCom: function(outro){
        // Se colidiu com um tiro...
        if(outro instanceof Tiro){
            // Remover o ovni e o tiro da animação e do colisor
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);

            // Criar uma explosão na posição do ovni
            var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            this.animacao.novoSprite(explosao);
        }
    }
}