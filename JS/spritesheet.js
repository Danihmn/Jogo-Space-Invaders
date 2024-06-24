// Definição do construtor da classe Spritesheet
function Spritesheet(context, imagem, linhas, colunas){
    this.context = context;         // Contexto do canvas
    this.imagem = imagem;           // Imagem da spritesheet
    this.numLinhas = linhas;        // Número de linhas na spritesheet
    this.numColunas = colunas;      // Número de colunas na spritesheet
    this.intervalo = 0;             // Intervalo entre os quadros da animação
    this.linha = 0;                 // Linha atual da spritesheet
    this.coluna = 0;                // Coluna atual da spritesheet
    this.fimDoCiclo = null;         // Função chamada quando um ciclo de animação é concluído
}

// Adicionando métodos à classe Spritesheet
Spritesheet.prototype = {
    // Método para avançar para o próximo quadro da animação
    proximoQuadro: function(){
        // Momento atual
        var agora = new Date().getTime();

        // Se ainda não tenho último tempo medido
        if(!this.ultimoTempo) this.ultimoTempo = agora;

        // Já é hora de mudar de coluna?
        if(agora - this.ultimoTempo < this.intervalo) return;

        // Avançar para a próxima coluna
        if(this.coluna < this.numColunas - 1){
            this.coluna++;
        }
        else{ 
            this.coluna = 0; // Voltar para a primeira coluna

            // Se houver uma função de fim de ciclo, chamá-la
            if(this.fimDoCiclo) this.fimDoCiclo(); // Avisar que acabou um ciclo
        }

        this.ultimoTempo = agora; // Guardar o momento da mudança de coluna
    },
    // Método para desenhar o quadro atual da spritesheet
    desenhar: function(x, y){
        var largura = this.imagem.width / this.numColunas;   // Largura de cada quadro
        var altura = this.imagem.height / this.numLinhas;    // Altura de cada quadro

        // Desenhar o quadro atual da spritesheet na posição especificada
        this.context.drawImage(
            this.imagem,
            largura * this.coluna,       // Posição X do quadro
            altura * this.linha,         // Posição Y do quadro
            largura,                     // Largura do quadro
            altura,                      // Altura do quadro
            x,                           // Posição X para desenhar no canvas
            y,                           // Posição Y para desenhar no canvas
            largura,                     // Largura de desenho no canvas
            altura                       // Altura de desenho no canvas
        );
    }
}
