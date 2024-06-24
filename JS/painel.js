// Definição do construtor da classe Painel
function Painel(context, nave){
    this.context = context; // Contexto do canvas
    this.nave = nave; // Referência à nave
    this.spritesheet = new Spritesheet(context, nave.imagem, 3 ,2); // Spritesheet para representar as vidas da nave
    this.spritesheet.linha = 0; // Linha inicial da spritesheet
    this.spritesheet.coluna = 0; // Coluna inicial da spritesheet
    this.pontuacao = 0; // Pontuação inicial
}

// Adicionando métodos à classe Painel
Painel.prototype = {
    // Método para atualizar o painel (não utilizado neste exemplo)
    atualizar: function(){

    },
    // Método para desenhar o painel
    desenhar: function(){
        this.context.scale(0.5, 0.5); // Reduzir o tamanho do desenho
        var x = 20; // Posição X inicial das vidas da nave
        var y = 20; // Posição Y inicial das vidas da nave
        var ctx = this.context; // Referência ao contexto do canvas

        // Desenhar as vidas da nave
        for(var i=1; i<=this.nave.vidasExtras; i++){
            this.spritesheet.desenhar(x, y); // Desenhar a vida da nave
            x += 40;// Atualizar a posição X para a próxima vida
        }

        this.context.scale(2, 2); // Restaurar o tamanho do desenho
        ctx.save(); // Salvar o estado atual do contexto
        ctx.fillStyle = 'white'; // Cor do texto
        ctx.font = '18px sans-serif'; // Fonte do texto
        ctx.fillText(this.pontuacao, 100, 27); // Desenhar a pontuação
        ctx.restore(); // Restaurar o estado anterior do contexto
    }
}