//Canvas e Context
var canvas = document.getElementById('canvas'); // Obtém o elemento canvas do HTML
var context = canvas.getContext('2d'); // Obtém o contexto 2D para desenhar no canvas

//Variáveis principais
var imagens, animacao, teclado, colisor, nave, criadorInimigos; // Declaração das variáveis principais do jogo
var totalImagens = 0, carregadas = 0; // Contadores para acompanhar o carregamento das imagens
var musicaAcao; // Variável para armazenar a música de ação do jogo

//Começa carregando as imagens
carregarImagens(); // Chama a função para carregar as imagens do jogo
carregarMusicas(); // Chama a função para carregar as músicas do jogo

//Função para carregar as imagens do jogo
function carregarImagens(){
    //Objeto contendo os nomes das imagens e seus caminhos
    imagens = {
        espaco: 'fundo-espaco.png',
        estrelas: 'fundo-estrelas.png',
        nuvens: 'fundo-nuvens.png',
        nave: 'nave-spritesheet.png',
        ovni: 'ovni.png',
        explosao: 'explosao.png'
    };

    //Carregar cada imagem
    for(var i in imagens){
        var img = new Image(); // Cria um novo objeto de imagem
        img.src = 'IMG/' + imagens[i]; // Define o caminho da imagem
        img.onload = carregando; // Define a função a ser chamada quando a imagem é carregada
        totalImagens++; // Incrementa o contador de imagens totais

        imagens[i] = img; //Substitui o nome pela imagem carregada
    }
}

//Função chamada quando uma imagem é carregada
function carregando(){
    context.save(); // Salva o estado atual do contexto de desenho

    //Desenha o fundo e a barra de carregamento
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height); // Desenha o fundo do espaço
    context.fillStyle = 'white'; // Define a cor do texto como branca
    context.strokeStyle = 'black'; // Define a cor da borda do texto como preta
    context.font = '50px sans-serif'; // Define a fonte do texto
    context.fillText("Carregando...", 100, 200); // Desenha o texto "Carregando..."
    context.strokeText("Carregando..", 100, 200); // Desenha a borda do texto "Carregando.."

    //Atualiza a barra de carregamento
    carregadas++; // Incrementa o contador de imagens carregadas
    var tamanhoTotal = 300; // Define o tamanho total da barra de carregamento
    var tamanho = carregadas / totalImagens * tamanhoTotal; // Calcula o tamanho atual da barra de carregamento
    context.fillStyle = 'yellow'; // Define a cor da barra de carregamento como amarela
    context.fillRect(100, 250, tamanho, 50); // Desenha a barra de carregamento
    context.restore(); // Restaura o estado anterior do contexto de desenho

    //Verifica se todas as imagens foram carregadas
    if(carregadas == totalImagens){
        iniciarObjetos(); // Inicia os objetos do jogo após o carregamento completo das imagens
        mostrarLinkJogar(); // Mostra o link para iniciar o jogo
    }
}

//Função para inicializar os objetos do jogo
function iniciarObjetos(){
    //Cria os principais objetos do jogo
    animacao = new Animacao(context); // Cria a animação
    teclado = new Teclado(document); // Cria o controle do teclado
    colisor = new Colisor(); // Cria o colisor de objetos
    espaco = new Fundo(context, imagens.espaco); // Cria o fundo do espaço
    estrelas = new Fundo(context, imagens.estrelas); // Cria o fundo das estrelas
    nuvens = new Fundo(context, imagens.nuvens); // Cria o fundo das nuvens
    nave = new Nave(context, teclado, imagens.nave, imagens.explosao); // Cria a nave do jogador
    painel = new Painel(context, nave); // Cria o painel de pontuação

    //Adiciona os objetos à animação e ao colisor
    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(painel);
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);
    animacao.novoProcessamento(colisor);

    configuracoesIniciais(); //Configurações iniciais do jogo
}

//Configurações iniciais do jogo
function configuracoesIniciais(){
    //Configura a velocidade dos fundos e da nave
    espaco.velocidade = 60;
    estrelas.velocidade = 150;
    nuvens.velocidade = 50;
    nave.posicionar();
    nave.velocidade = 200;

    criacaoInimigos(); //Criação de inimigos

    //Função chamada quando as vidas da nave acabam
    nave.acabaramVidas = function(){
        animacao.desligar();
        gameOver(); // Chama a função de fim de jogo
    }

    //Função chamada quando ocorre uma colisão entre objetos
    colisor.aoColidir = function(o1, o2){
        //Se ocorrer colisão entre tiro e ovni, adiciona pontos ao painel
        if((o1 instanceof Tiro && o2 instanceof Ovni) || (o1 instanceof Ovni && o2 instanceof Tiro))
            painel.pontuacao +=10;
    }
}

//Função para criar inimigos
function criacaoInimigos(){
    criadorInimigos = {
        ultimoOvni: new Date().getTime(), // Armazena o tempo do último ovni criado

        //Função para processar a criação de inimigos
        processar: function(){
            var agora = new Date().getTime(); // Obtém o tempo atual
            var decorrido = agora - this.ultimoOvni; // Calcula o tempo decorrido desde o último ovni criado

            //Cria um novo ovni se o tempo decorrido for maior que 1 segundo
            if(decorrido > 1000){
                novoOvni();
                this.ultimoOvni = agora; // Atualiza o tempo do último ovni criado
            }
        }
    };
    animacao.novoProcessamento(criadorInimigos); // Adiciona o processamento de criação de inimigos à animação
}

//Função para criar um novo ovni
function novoOvni(){
    var imgOvni = imagens.ovni; //Obtém a imagem do ovni
    var ovni = new Ovni(context, imgOvni, imagens.explosao); //Cria um novo objeto de ovni

    ovni.velocidade = Math.floor(500 + Math.random() * (1000 - 500 + 1)); //Define a velocidade do ovni

    //Define a posição inicial do ovni
    ovni.x = Math.floor(Math.random() * (canvas.width - imgOvni.width + 1));
    ovni.y = -imgOvni.height;

    animacao.novoSprite(ovni); // Adiciona o ovni à animação
    colisor.novoSprite(ovni); // Adiciona o ovni ao colisor
}

//Função para pausar o jogo
function pausarJogo(){
    if(animacao.ligado){
        animacao.desligar(); // Pausa a animação
        ativarTiro(false); // Desativa a capacidade de atirar

        //Escreve "Pausado" na tela
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.font = '50px sans-serif';
        context.fillText("Pausado", 160, 200);
        context.strokeText("Pausado", 160, 200);
        context.restore();
    }else{
        criadorInimigos.ultimoOvni = new Date().getTime(); // Atualiza o tempo do último ovni criado
        animacao.ligar(); // Continua a animação
        ativarTiro(true); // Ativa a capacidade de atirar
    }
}

//Função para ativar ou desativar a capacidade de atirar
function ativarTiro(atirar){
    if(atirar){
        teclado.disparou(ESPACO, function(){
            nave.atirar();
        });
    }
    else
        teclado.disparou(ESPACO, null);
}

//Função para carregar a música de ação do jogo
function carregarMusicas(){
    musicaAcao = new Audio(); // Cria um novo objeto de áudio
    musicaAcao.src = 'snd/musica-acao.mp3'; // Define o caminho da música
    musicaAcao.load(); // Carrega a música
    musicaAcao.volume = 0.8; // Define o volume da música
    musicaAcao.loop = true; // Define que a música deve ser repetida em loop
 };

 //Função para mostrar o link de jogar
 function mostrarLinkJogar(){
    document.getElementById('link_jogar').style.display = 'block'; // Mostra o link de jogar
 }

 //Função para iniciar o jogo
 function iniciarJogo(){
    criacaoInimigos.ultimoOvni = new Date().getTime(); // Atualiza o tempo do último ovni criado

    ativarTiro(true); //Ativa a capacidade de atirar

    //Configura a pausa do jogo
    teclado.disparou(ENTER, pausarJogo);
    document.getElementById('link_jogar').style.display = 'none'; // Esconde o link de jogar
    
    //Reinicia a pontuação, inicia a música e a animação
    painel.pontuacao = 0;
    musicaAcao.play();
    animacao.ligar();
 }   

 //Função chamada quando o jogo acaba
 function gameOver(){
    ativarTiro(false); //Desativa a capacidade de atirar

    teclado.disparou(ENTER, null); //Desativa a pausa do jogo

    //Pausa e rebobina a música
    musicaAcao.pause();
    musicaAcao.currentTime = 0.0;
    
    //Desenha o fundo e o texto de "Game Over"
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);
    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '70px sans-serif';
    context.fillText("GAME OVER", 40, 200);
    context.strokeText("GAME OVER", 40, 200);
    context.restore();

    mostrarLinkJogar(); //Mostra o link de jogar novamente

    //Restaura as condições da nave, removendo todos os inimigos
    nave.vidasExtras = 3;
    nave.posicionar();
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);
    removerInimigos();
 }

 //Função para remover todos os inimigos da animação
 function removerInimigos(){
    for(var i in animacao.sprites){
        if(animacao.sprites[i] instanceof Ovni)
        animacao.excluirSprite(animacao.sprites[i]);
    }
}