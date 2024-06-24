//Carregar as imagens
var imgEspaco = new Image();
imgEspaco.src = 'IMG/fundo-espaco.png';

var imgEstrelas = new Image();
imgEstrelas.src = 'IMG/fundo-estrelas.png';

var imgNuvens = new Image();
imgNuvens.src = 'IMG/fundo-nuvens.png';

var carregadas = 0; //Variável para auxiliar quando for para o jogo iniciar
var total = 3; //Total de imagens que devem ser carregadas

imgEspaco.onload = carregando(); //Chama a função carregando quando a imagem carregar
imgEstrelas.onload = carregando(); //Chama a função carregando quando a imagem carregar
imgNuvens.onload = carregando(); //Chama a função carregando quando a imagem carregar

function carregando(){
    carregadas++; //Quando cada imagem carregar, adiciona 1 nas carregadas
    if(carregadas == total) iniciar(); //Quando todas as imagens carregarem, chama a função iniciar
}

function iniciar(){
    var canvas = document.getElementById("canvas"); //Pegando o elemento do canvas
    var context = canvas.getContext('2d'); //Pegando o contexto em 2d do jogo

    //Passo o context e a imagem para os objetos Fundo
    var fundoEspaco = new Fundo(context, imgEspaco); //Instância nova atribuindo o fundo do espaço
    var fundoEstrelas = new Fundo(context, imgEstrelas); //Instância nova atribuindo o fundo das estrelas
    var fundoNuvens = new Fundo(context, imgNuvens); //Instância nova atribuindo o fundo das nuvens

    //Cada um a uma velocidade diferente
    fundoEspaco.velocidade = 50;
    fundoEstrelas.velocidade = 10;
    fundoNuvens.velocidade = 2;

    //Nova instância de animação, que agora adicionará os fundos carregados
    var animacao = new Animacao(context);
    animacao.novoSprite(fundoEspaco);
    animacao.novoSprite(fundoEstrelas);
    animacao.novoSprite(fundoNuvens);
    animacao.ligar();
}