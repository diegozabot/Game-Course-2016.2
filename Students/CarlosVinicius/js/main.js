var game=new Phaser.Game(428, 566, Phaser.AUTO, 'Final', {preload: preload, create: create, update: update});

var player;
var score=0;

function preload(){
    // carregamento assets
    game.load.image('fundo','assets/images/backa.png');
    game.load.image('linha','assets/images/ladoa.png');
    game.load.image('linha1','assets/images/ladoa1.png');
    game.load.image('cubo','assets/images/cubeb1.png');
    game.load.image('led','assets/images/led.png');
    game.load.spritesheet('morto','assets/images/morto.png',15,16);
    game.load.spritesheet('morto2','assets/images/morto.png',15,16);
    game.load.spritesheet('chico','assets/images/chico.png',27,26);
    game.load.spritesheet('azul','assets/images/azul.png',15,16);
    game.load.spritesheet('preto','assets/images/preto.png',15,16);
    game.load.spritesheet('branco','assets/images/branco.png',15,16);
    game.load.spritesheet('vermelho','assets/images/vermelho.png',15,16);
    
    game.load.audio('canto','assets/audio/canto.ogg');
    game.load.audio('morte','assets/audio/morte.ogg');
    
    
    
}

function create(){
   
    //audio
    aCanto = game.add.audio('canto');
    aMorte = game.add.audio('morte');
    
    // background e player
    fundo = game.add.sprite(0,0,'fundo');
    //fundo.scale.setTo(.7);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    
    
    
    
    //linha horizontal
    linha = game.add.sprite(game.world.centerX,240,'linha');
    linha.anchor.setTo(.5);
    linha.scale.setTo(.3);
    game.physics.arcade.enable(linha);
    
    //linha vertical
    linha1 = game.add.sprite(-600, game.world.centerY,'linha1');
    linha1.anchor.setTo(.5);
    linha1.scale.setTo(.3);
    game.physics.arcade.enable(linha1);
    
    //cubo
    cubo = game.add.sprite(game.world.centerX,game.world.centerY,'cubo');
    cubo.anchor.setTo(.5);
    cubo.scale.setTo(.3);
    game.physics.arcade.enable(cubo);
    
    //chico
    chico = game.add.sprite(284,200,'chico');
    chico.animations.add('andar',[0,1,2,3,4,5,6,7],8,false);
    chico.scale.setTo(1.3);
    
    //morto
    morto = game.add.sprite(284,180,'morto');
    morto.animations.add('andar',[4],8,false);
    game.physics.arcade.enable(morto);
    
    //morto2
    morto2 = game.add.sprite(288,180,'morto2');
    morto2.animations.add('andar',[4],8,false);
    game.physics.arcade.enable(morto2);
    
    //passaromorto
    //passaromorto = 
    
    
    //azul
   
    azul = game.add.sprite(game.world.centerX,-80,'azul');
    azul.angle=180;
    azul.anchor.setTo(.5);
    azul.animations.add('andar',[0,1,2,3,4,5,6,7],8,false);
    azul.scale.setTo(1.3);
    randomAzul();
    game.physics.arcade.enable(azul);
    
    
    
    //vermelho
    vermelho = game.add.sprite(game.world.centerX,480,'vermelho');
    vermelho.anchor.setTo(.5);
    vermelho.animations.add('andar',[0,1,2,3,4,5,6,7],8,false);
    vermelho.scale.setTo(1.3);
    randomVermelho();
    game.physics.arcade.enable(vermelho);
    
    
    
    //preto
    preto = game.add.sprite(20,game.world.centerY,'preto');
    preto.angle=90;
    preto.anchor.setTo(.5);
    preto.animations.add('andar',[0,1,2,3,4,5,6,7],8,false);
    preto.scale.setTo(1.3);
    randomPreto();
    game.physics.arcade.enable(preto);
    
    
    //branco
    branco = game.add.sprite(580,game.world.centerY,'branco');
    branco.angle=-90;
    branco.anchor.setTo(.5);
    branco.animations.add('andar',[0,1,2,3,4,5,6,7],8,false);
    branco.scale.setTo(1.3);
    randomBranco();
    game.physics.arcade.enable(branco);
    
    
      
    //movimento
    cursor = game.input.keyboard.createCursorKeys();
   
    scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    
  

}

    var vel = 1;


function update(){
    chico.animations.play('andar');
    azul.animations.play('andar');
    vermelho.animations.play('andar');
    preto.animations.play('andar');
    branco.animations.play('andar');
    
    
    azul.y+=vel ;
    vermelho.y-=vel;
    preto.x+=vel;
    branco.x-=vel;
    
    
        
    game.physics.arcade.overlap(linha,azul,null,dead);
    game.physics.arcade.overlap(cubo,azul,null,bateu);
    
    game.physics.arcade.overlap(linha,vermelho,null,dead1);
    game.physics.arcade.overlap(cubo,vermelho,null,bateu1);
    
    game.physics.arcade.overlap(linha1,preto,null,dead2);
    game.physics.arcade.overlap(cubo,preto,null,bateu2);
    
    game.physics.arcade.overlap(linha1,branco,null,dead3);
    game.physics.arcade.overlap(cubo,branco,null,bateu3);
    
    
    
    if(cursor.right.isDown){
        linha.x= -600;
        linha.y= -600;
        linha1.y= 283;
        linha1.x= 256;
        cubo.angle=90;
        
    }
     
    else if(cursor.left.isDown){
        linha.x = -600;
        linha.y = -600;
        linha1.y = game.world.centerY;
        linha1.x= 170;
        cubo.angle=-90;
    }
    else if(cursor.up.isDown){
        linha.x= 214;
        linha.y= 240;
        linha1.x= -600;
        linha1.y= -600;
        cubo.angle=0;
    }
    else if(cursor.down.isDown){
        linha.x = 214;
        linha.y = 327;
        linha1.x= -600;
        linha1.y= -600;
        cubo.angle=180;
    }
    

    
        }

function bateu(s1,s2){
    aMorte.play();
    morto.x =s2.x;
    morto.y =s2.y;
    game.add.tween(morto).to({y:600},1200,Phaser.Easing.Bounce.Out,true);
    //morto.body.velocity.y=0;
    //morto.body.gravity.y=800;
    novo(s2);
}

function bateu1(s1,s2){
    aMorte.play();
    morto.x =s2.x;
    morto.y =s2.y;
    game.add.tween(morto).to({y:600},1200,Phaser.Easing.Bounce.Out,true);
    randomVermelho();
}

function bateu2(s1,s2){
    aMorte.play();
    morto.x =s2.x;
    morto.y =s2.y;
    game.add.tween(morto).to({y:600},1200,Phaser.Easing.Bounce.Out,true);
    randomPreto();
}

function bateu3(s1,s2){
    aMorte.play();
    morto.x =s2.x;
    morto.y =s2.y;
    game.add.tween(morto).to({y:600},1200,Phaser.Easing.Bounce.Out,true);
    randomBranco();
}

 function dead(s1,s2){
    aCanto.play();
    novo(s2);
    score++;
    vel = (1+score/20);
    scoreLabel.text='Score: '+score;
    
 }
function novo(s){
    randomAzul();

}

function dead1(s1,s2){
    aCanto.play();
    randomVermelho();
    score++;
    vel = (1+score/20);
    scoreLabel.text='Score: '+score;
}

function dead2(){
    aCanto.play();
    randomPreto();
    score++;
    vel = (1+score/20);
    scoreLabel.text='Score: '+score;
   
}

function dead3(){
    aCanto.play();
    randomBranco();
    score++;
    vel = (1+score/20);
    scoreLabel.text='Score: '+score;
}



function randomAzul(){
    var position = [
        {x: game.world.centerX, y: -80},
        {x: game.world.centerX, y: -180},
        {x: game.world.centerX, y: -240},
        {x: game.world.centerX, y: -450}
        
    ];
    azul.position=game.rnd.pick(position);
}

function randomVermelho(){
    var position = [
        {x: game.world.centerX, y: 480},
        {x: game.world.centerX, y: 680},
        {x: game.world.centerX, y: 800},
        {x: game.world.centerX, y: 1200}
    ];
    vermelho.position=game.rnd.pick(position);
}


function randomPreto(){
    var position = [
        {x: 20, y:game.world.centerY},
        {x: -220, y:game.world.centerY},
        {x: -620, y:game.world.centerY},
        {x: -1020, y:game.world.centerY}
    ];
    preto.position=game.rnd.pick(position);
}


function randomBranco(){
    var position = [
        {x: 580, y:game.world.centerY},
        {x: 880, y:game.world.centerY},
        {x: 1080, y:game.world.centerY},
        {x: 1380, y:game.world.centerY}
    ];
    branco.position=game.rnd.pick(position);
}