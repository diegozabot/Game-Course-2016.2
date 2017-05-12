var game = new Phaser.Game(800, 400, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});


var perguntas;

function preload(){
    game.load.image('space1','assets/images/space1.png');
    game.load.image('space','assets/images/space.png');
    game.load.image('trono','assets/images/trono1.png');
    game.load.image('fala','assets/images/fala.png');
    game.load.audio('audio','assets/audio/HeavenSings.mp3');
    this.load.spritesheet('astro','assets/images/astronaught.png',154, 235);  
    this.load.spritesheet('robo0','assets/images/bot01.png',128, 96);
    this.load.spritesheet('robo1','assets/images/bot02.png',96, 128);
    this.load.spritesheet('robo2','assets/images/bot03.png',96, 128);
    this.load.spritesheet('robo3','assets/images/bot04.png',96, 128);
    this.load.spritesheet('robo4','assets/images/bot05.png',128, 96);
    this.load.spritesheet('predio1','assets/images/predio1.png');
    this.load.spritesheet('predio2','assets/images/predio2.png');
    this.load.spritesheet('predio3','assets/images/predio3.png');
    
}
var condic = 0;
var state = 0;
var z=0;
var flagSpace=0;
var flagsn=0;
var robo = [];
var z;
var Pop = 30;
var Felic = 10;
var Fundos = 300;
var Score = 0;
var prediox = [];
var resp = [];
var contador = 0;


function create(){

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    space = game.add.sprite(0,0,'space1');
    
    music = game.add.audio('audio');
    music.play('',0,1,true);

    predio1 = game.add.sprite(160,200,'predio1');
    predio1.scale.setTo(.3);
    predio2 = game.add.sprite(300,180,'predio2');
    predio2.scale.setTo(.3);
    predio3 = game.add.sprite(500,200,'predio3');
    predio3.scale.setTo(.3);    
    predio4 = game.add.sprite(40,240,'predio1');
    predio4.scale.setTo(.3);
    predio4.visible = false;
    predio5 = game.add.sprite(680,260,'predio3');
    predio5.scale.setTo(.3);
    predio5.visible = false;
    predio6 = game.add.sprite(410,180,'predio2');
    predio6.scale.setTo(.3);
    predio6.visible = false;
    
    
    box = game.add.sprite(100,50,'fala');
    box.scale.setTo(1.9,1.3);
    
    //texto robot
    boxRobo = game.add.sprite(450,180,'fala');
    boxRobo.scale.setTo(1.1,.8);
    boxRobo.alpha=0;
    boxTiny = game.add.sprite(705,285,'fala');
    boxTiny.scale.setTo(.2);
    boxTiny.alpha=0;    
    formatacao = {font:'16px Arial', fill:'#000000'};
    textRobo = game.add.text(490, 200, '', formatacao);
    textRobo.alpha=0;
    formatacao = {font:'19px CanalteC', fill:'#FF3300'};
    textTiny = game.add.text(719, 290, 'S | N', formatacao);
    textTiny.alpha=0;
    
    trono = game.add.sprite(game.world.centerX,400,'trono');
    trono.scale.setTo(.5);
    trono.anchor.setTo(.5,1);
    
    astro = game.add.sprite(game.world.centerX,390,'astro');
    astro.scale.setTo(.5);
    astro.anchor.setTo(.5,1);

    for(i=0;i<5;i++){
        robo[i]= game.add.sprite(850,390,'robo' + i);
        robo[i].anchor.setTo(0.5,1);
        robo[i].scale.setTo(.8);

        robo[i].animations.add('move',[0,1,2],10, true);
    }

    formatacao = {font:'16px Arial', fill:'#000000'};
    intro = game.add.text(150, 90, '', formatacao);
    
    formatacao = {font:'18px Action is', fill:'#ffff00'};
    pop = game.add.text(30, 20, 'População: ' + Pop, formatacao);
    
    formatacao = {font:'18px Action is', fill:'#ffff00'};
    felic = game.add.text(30, 50, 'Felicidade: ' + Felic, formatacao);
    
    formatacao = {font:'18px Action is', fill:'#ffff00'};
    fundos = game.add.text(30, 80, 'Fundos: ' + Fundos, formatacao);
    
    createPergs();
    
    prediox = [predio4,predio5,predio6];
    pre = game.rnd.between(0, 2);
    
    resp = ['Yer sir','Você quem manda...','Nem me importo mesmo...','Com todo prazer!','É minha obrigação, né'];
    alea = game.rnd.between(0, 4);
    
}

function update(){
    
    if(state == 0){
        intro.text='Você finalmente conseguiu colonizar a lua, parabéns.\nAgora é seu dever gerenciar essa terra assolada e fazê-la habitável. \nVocê terá que cordernar uma equipe de robos inuteis \ne que serão um pé no saco durante esse período todo. \nResponda S ou N às petições que virão. \nAperte espaço para iniciar.';

        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && flagSpace==0){  
            flagSpace=1;
            entraRobo();
            
            //tween
            fadeBox=game.add.tween(box);
            fadeBox.to({alpha:0},1000,'Linear',true);
            fadeText=game.add.tween(intro);
            fadeText.to({alpha:0},1000,'Linear',true); 
        }
     }
    
    if(state==1){
         if(game.input.keyboard.isDown(Phaser.Keyboard.S) && flagsn==0){
            //o que tem que fazer com S
             saiRobo(); 
             condic = 1;
         }    
         else if(game.input.keyboard.isDown(Phaser.Keyboard.N) && flagsn==0){
             //o que tem que fazer com N
             saiRobo();
             condic = 2;             
         }
    }
    
    pop.text = 'População: ' + Pop;
    felic.text = 'Felicidade: ' + Felic;
    fundos.text = 'Fundos: ' + Fundos; 
    
            if(condic == 1){
                respondeSim ();    
            }
    
            else if(condic == 2){
                respondeNao ();    
            }
    
    if(Pop <= 0 || Fundos <=0){
        endgame();
    }
    
    condic = 0;
}

function createPergs (){

perguntas = [
      ['Vocês humanos não se cansam de \nnos usar para satisfazer seus feitiches \nde exploração do espaço','Posso convidar mais gente \npra viver conosco? Eles consomem \nmuito, mas são boas pessoas','Podemos ir assistir aquele filme \nem que a Skynet assume o controle \ne aniquila, genocida e destroi \ntoda a humanidade?','Aquele planeta azul e verde é bastante \narrogante. Deviamos bombardea-lo \nqualquer dia dessses.','Você vai ficar sentado aí o dia inteiro?'],
      ['Podemos contratar musicos para \nanimar essa colônia?','Você gosta de pipoca? \nPipoca quente na manteiga?','Você acha que estamos sozinhos \nno universo?','Precisamos reforçar as estruturas das \nnossas torres para melhor proteção. \nPosso fazer isso?','Queremos que a comida tenha \nmais óleo. Estamos vivendo em \ncondições sub-robóticas.'],
      ['Você acha que temos poder de decidir \nsair daqui e ir embora para fazermos\no que quisermos das nossas vidas?','Posso ser o cozinheiro dessa colônia? \nSei fazer qualquer comida à óleo','A mafia dos robôs está exigindo 200 \nde Fundos ou ela irá destruir parte \nda colônia. \nAceita a proposta?','Preciso trocar parte das minhas peças. \nIsso vai custar 100 de Fundos, \ntudo bem?','Posso me aposentar algumas décadas \nmais cedo? Não quero ter que trabalhar \naté os 650 anos'],
      ['Tem um bando de bandidos querendo \ninvadir nossa colonia. Devemos pegar \nnas armas e nos defender?','Você me acha um lunatico? \nhaha boa piada, não?','Você quer fazer as pazes com \nas extremófilas de marte? \nOuvi dizer que elas são bem \ninconstantes','Uma tempestade solar está \nse aproximando. Vamos investir em \ninfraestrutura pra proteger a população \nem troca de uma grande quantia?','Quero construir novas casas para \nessa colonia. \nTenho permissão?'],
      ['Um cometa ameaça cair em nossa \ncolonia. Devemos nos desesperar \ne correr de um lado pro outro \nesperando nosso fim?','Quero ser o engenheiro-chefe \nda colônia, agora!!!','Posso destruir aqueles alienigenas \nverdes que ficam na nossa redoma \nensolarada tomando sol e agua \no dia inteiro?','Você é um bom líder. \nAceita uma recompensa?','Você gostou do jogo?'],
    ];
    
respostaS = [
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
    ];
    
respostaN = [
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
    ];
    
} 
function entraRobo(){
    contador++;
    robos = game.rnd.between(0, 4);
    quest = game.rnd.between(0, 4);

    fala = perguntas[robos][quest];
    acaoS = respostaS[robos][quest];
    acaoN = respostaN[robos][quest];

    z = robo[robos];
    z.scale.setTo(.8,.8);
    z.play('move');
    entrada = game.add.tween(z);
    entrada.to({ x: 560 }, 3000, 'Linear', true);
    entrada.onComplete.add(acaoEntrada, this);
}
function saiRobo(){
    flagsn=1;
    textRobo.text = resp[alea];
    
    //tween
    brfade=game.add.tween(boxRobo);
    brfade.to({alpha:0},500,'Linear',true,500);
    trfade=game.add.tween(textRobo);
    trfade.to({alpha:0},500,'Linear',true,500);
    
    brfade=game.add.tween(boxTiny);
    brfade.to({alpha:0},500,'Linear',true,500);
    trfade=game.add.tween(textTiny);
    trfade.to({alpha:0},500,'Linear',true,500);
   
    saida = game.add.tween(z);
    z.scale.setTo(-.8,.8);
    z.play('move');
    saida.to({ x: 850 }, 3000, 'Linear', true);
    saida.onComplete.add(acaoSaida, this);
}

function acaoEntrada(){
        textRobo.text = fala;
        //perguntas[robos][quest] = -1; 
        
    //tween
    brfade=game.add.tween(boxRobo);
    brfade.to({alpha:1},500,'Linear',true);
    trfade=game.add.tween(textRobo);
    trfade.to({alpha:1},500,'Linear',true);
    
    brfade=game.add.tween(boxTiny);
    brfade.to({alpha:1},500,'Linear',true);
    trfade=game.add.tween(textTiny);
    trfade.to({alpha:1},500,'Linear',true);

    z.animations.stop();
    z.frame=0;
    state=1;
    flagsn=0;
    
}

function acaoSaida(){
    if(contador == 10){
        endgame();
    }
    entraRobo();
    state=1;
}

function respondeSim (){
    if(acaoS == 0){}               
    else if(acaoS == 1){
        Pop += 30 
        Fundos -= 50;     
    }       
    else if(acaoS == 2)
        felic += 3;    
    else if(acaoS == 3)
        felic += 3;    
    else if(acaoS == 4){}
    else if(acaoS == 5){
        felic += 3
        Fundos -= 30;    
    }
    else if(acaoS == 6)
        Felic += 5;    
    else if(acaoS == 7){}        
    else if(acaoS == 8){
        Pop += 10; 
        Fundos -= 30;    
    }        
    else if(acaoS == 9){
        Felic += 5;
        Pop += 5;    
    }        
    else if(acaoS == 10)
        Felic += 3;    
    else if(acaoS == 11)
        Felic += 3;    
    else if(acaoS == 12)
        Fundos -= 200;
    else if(acaoS == 13)
        Fundos -= 100;    
    else if(acaoS == 14)
        Felic += 10;    
    else if(acaoS == 15)
        Fundos -= 50;   
    else if(acaoS == 16)
        Felic += 5;
     else if(acaoS == 17){
        Pop += 20;
        Felic += 3;    
     }        
    else if(acaoS == 18)
        Fundos -= 130;
    else if(acaoS == 19){
        Fundos -= 100;
        Pop += 50;
        prediox[pre].visible = true;
    }            
    else if(acaoS == 20){
        Felic -= 5;
        Pop -= 20;    
    }        
    else if(acaoS == 21)
        Felic += 3;    
    else if(acaoS == 22)
        Pop -= 30;
    else if(acaoS == 23)
        Fundos += 50;    
    else if(acaoS == 24){
        Felic += 10;
        Pop += 30;
        Fundos += 100;
    }
}

function respondeNao (){
    if(acaoN == 0)
        Felic -= 3;   
    else if(acaoN == 1){}            
    else if(acaoN == 2){}            
    else if(acaoN == 3){}            
    else if(acaoN == 4)
        Felic += 2;
    else if(acaoN == 5)
        Felic -= 3;    
    else if(acaoN == 6){}            
    else if(acaoN == 7)
        Felic += 3;    
    else if(acaoN == 8){
        Pop -= 10;
        Felic -= 3;    
    }        
    else if(acaoN == 9)
        Felic -= 3;    
    else if(acaoN == 10)
        Felic -= 7;    
    else if(acaoN == 11){}
    else if(acaoN == 12)
        Pop -= 40;
    else if(acaoN == 13)
        Felic -= 10;    
    else if(acaoN == 14)
        Felic -= 10;    
    else if(acaoN == 15)
        Pop -= 20;    
    else if(acaoN == 16){}        
     else if(acaoN == 17){
         Felic -= 3;
         Fundos -= 20;
     }           
    else if(acaoN == 18)
        Pop -= 40;
    else if(acaoN == 19)
        Felic -= 5;    
    else if(acaoN == 20)
        x4p0;    
    else if(acaoN == 21)
        Felic -= 3;    
    else if(acaoN == 22)
        Felic += 3;
    else if(acaoN == 23){}           
    else if(acaoN == 24)
        textRobo.text = 'Jogou errado, jogue de novo!!!';
}

function endgame(){
    espaco = game.add.sprite(0,0,'space');
    espaco.alpha = 0;
    brfade=game.add.tween(espaco);
    brfade.to({alpha:1},2000,'Linear',true);
    
    if(Pop <= 0){
        texto=game.add.text(250, game.world.centerY - 100, 'Perdeu porque não tem mais população pra cuidar', {font:'20px Arial', fill:'#ffffff'});
    }
    else if(Fundos <=0){
        texto=game.add.text(game.world.centerX, game.world.centerY - 100, 'Perdeu por falta de dinheiro', {font:'20px Arial', fill:'#ffffff'});
    }
    else {}

    texto=game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER!', {font:'80px Arial', fill:'#ffffff'});
    texto.anchor.setTo(.5); 
    Score = Pop * 10 + Felic * 60 + Fundos * 30;
    texto=game.add.text(game.world.centerX, game.world.centerY + 100, 'Score: ' + Score, {font:'60px Arial', fill:'#ffffff'});
    texto.anchor.setTo(.5);
    
    brfade.onComplete.add(function(){
        game.paused = true;    
    });
    
}