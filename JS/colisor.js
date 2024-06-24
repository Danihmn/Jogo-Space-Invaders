// Definindo a função construtora Colisor
function Colisor(){
    // Array para armazenar os sprites
    this.sprites = [];
    // Função de callback ao ocorrer uma colisão
    this.aoColidir = null;
    // Array para armazenar os sprites a serem excluídos
    this.spritesExcluir = [];
}

// Adicionando métodos ao protótipo da função Colisor
Colisor.prototype = {
    // Método para adicionar um novo sprite ao colisor
    novoSprite: function(sprite){
        this.sprites.push(sprite); // Adiciona o sprite ao array de sprites
        sprite.colisor = this; // Define a propriedade colisor do sprite como esta instância do colisor
    },
    // Método para processar as colisões entre os sprites
    processar: function(){
        var jaTestados = new Object(); // Objeto para controlar quais pares de sprites já foram testados
        for (var i in this.sprites){
            for( j in this.sprites){
                if(i == j) continue; // Evita testar um sprite contra si mesmo

                var id1 = this.stringUnica(this.sprites[i]); // Gera uma chave única para o sprite 1
                var id2 = this.stringUnica(this.sprites[j]); // Gera uma chave única para o sprite 2

                // Verifica se já testou a colisão entre esses sprites
                if (!jaTestados[id1]) jaTestados[id1] = [];
                if (!jaTestados[id2]) jaTestados[id2] = [];
                if (!(jaTestados[id1].indexOf(id2) >= 0 || jaTestados[id2].indexOf(id1) >= 0)){
                    this.testarColisao(this.sprites[i], this.sprites[j]); // Testa a colisão entre os sprites
                    jaTestados[id1].push(id2); // Registra que essa colisão foi testada
                    jaTestados[id2].push(id1); // Registra que essa colisão foi testada
                }
            }
        }
        this.processarExclusoes(); // Processa a exclusão dos sprites marcados para exclusão
    },
    // Método para testar a colisão entre dois sprites
    testarColisao: function(sprite1, sprite2){
        var rets1 = sprite1.retangulosColisao(); // Obtém os retângulos de colisão do sprite1
        var rets2 = sprite2.retangulosColisao(); // Obtém os retângulos de colisão do sprite2

        colisoes:
        for(var i in rets1){
            for(var j in rets2){
                // Verifica se os retângulos colidem
                if(this.retangulosColidem(rets1[i], rets2[j])){
                    sprite1.colidiuCom(sprite2); // Chama o método colidiuCom no sprite1
                    sprite2.colidiuCom(sprite1); // Chama o método colidiuCom no sprite2
                    if(this.aoColidir)
                        this.aoColidir(sprite1, sprite2); // Chama a função de callback ao colidir, se existir
                    break colisoes; // Sai do loop quando encontra a primeira colisão
                }
            }
        }
    },
    // Método para verificar se dois retângulos colidem
    retangulosColidem: function(ret1, ret2){
        return (ret1.x + ret1.largura) > ret2.x &&
               ret1.x < (ret2.x + ret2.largura) &&
               (ret1.y + ret1.altura) > ret2.y &&
               ret1.y < (ret2.y + ret2.altura);
    },
    // Método para gerar uma string única representando os retângulos de colisão do sprite
    stringUnica: function(sprite){
        var str = '';
        var retangulos = sprite.retangulosColisao(); // Obtém os retângulos de colisão do sprite

        for(var i in retangulos){
            // Concatena as coordenadas e dimensões dos retângulos em uma string
            str += 'x:' + retangulos[i].x + ',' +
                   'y:' + retangulos[i].y + ',' +
                   'l:' + retangulos[i].largura + ',' +
                   'a:' + retangulos[i].altura + '\n';
        }
        return str; // Retorna a string única representando os retângulos de colisão
    },
    // Método para marcar um sprite para exclusão
    excluirSprite: function(sprite){
        this.spritesExcluir.push(sprite); // Adiciona o sprite ao array de sprites a serem excluídos
    },
    // Método para processar a exclusão dos sprites marcados para exclusão
    processarExclusoes: function(){
        var novoArray = [];
        for(var i in this.sprites){
            if(this.spritesExcluir.indexOf(this.sprites[i]) == -1)
                novoArray.push(this.sprites[i]); // Adiciona o sprite ao novo array, se não estiver marcado para exclusão
        }
        this.spritesExcluir = []; // Limpa o array de sprites a serem excluídos
        this.sprites = novoArray; // Atualiza o array de sprites
    }
}