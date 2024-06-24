// Definição do construtor da classe Fundo
function Fundo(context, imagem){
    this.context = context; // Contexto do canvas
    this.imagem = imagem;   // Imagem de fundo
    this.velocidade = 0;    // Velocidade de movimento do fundo
    this.posicaoEmenda = 0; // Posição da emenda entre as imagens de fundo
}

// Adicionando métodos à classe Fundo
Fundo.prototype = {
    // Método para atualizar a posição do fundo
    atualizar: function(){

        // Atualizar a posição da emenda
        this.posicaoEmenda += this.velocidade;

        // Verificar se a emenda passou da posição
        if(this.posicaoEmenda > this.imagem.height)
            this.posicaoEmenda = 0; // Reposicionar a emenda
    },
    // Método para desenhar o fundo
    desenhar: function(){
        var img = this.imagem; // Referência à imagem

        // Desenhar a primeira cópia da imagem
        var posicaoY = this.posicaoEmenda - img.height;
        this.context.drawImage(img, 0, posicaoY, img.width, img.height);
        
        // Desenhar a segunda cópia da imagem
        posicaoY = this.posicaoEmenda;
        this.context.drawImage(img, 0, posicaoY, img.width, img.height);
    }
}