//goo.gl/fAw6lB

var game=new Phaser.Game(500, 500, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});


            //var cat_a1;
var gatos;
var score=0;
var ponto=0;
var muda = 0;
var walls;
var level;


function preload(){

//cenário    

game.load.image('ceu','assets/images/ceuNoite.png');
game.load.image('cidade','assets/images/cidade2.png');

//contorno    
game.load.image('wallV','assets/images/metalV.png');//veja se gosta destas plataformas
game.load.image('wallH','assets/images/metalH.png');
//game.load.image('wallV','assets/images/barraV100.png');
//game.load.image('wallH','assets/images/barraH100.png');


//personagem cat_a1
        //game.load.spritesheet('cat_a1','assets/images/cat_move.png', 64, 64,256);//???????????
    
//personagem gatos 96 sprites de 31x 32 - 8 tipos de gatos
game.load.spritesheet('gatos','assets/images/gatos.png', 31.5, 32,96);
    
//medalhas
game.load.image('medal', 'assets/images/pizza3.png'); //game.load.image('medal', 'assets/images/medal/flat_medal1.png');
 
game.load.audio('jump',['assets/audio/jump.mp3','assets/audio/jump.ogg']);
game.load.audio('eat',['assets/audio/eat.mp3','assets/audio/eat.ogg']);
    
}

function create(){
    
    aJump = game.add.audio('jump');
    aEat = game.add.audio('eat');
    
    
    ceu=game.add.tileSprite(0,0,500,500,'ceu');
    cidade=game.add.tileSprite(0,0,500,500,'cidade');
    
    medal= game.add.sprite(450,80,'medal');
    medal.scale.setTo(.5);
    medal.anchor.setTo(.5);
                       
    level=0; //<<<<<<<mudar facilita
    loadLevel();
    //medal = game.add.group();
    
    
    
    texto=game.add.text(game.world.centerX, 20, ' Use as teclas de direção para mover o gato e pegar as pizzas.', {font:'15px Arial', fill:'#ffffff'});
    texto.anchor.setTo(.5);
    
    
    //scoreLabel = game.add.text(30, 30, 'score:', { font: '18px Arial', fill: '#ffffff' });
    
    
    //criação do gato
     
    gatos = game.add.sprite(100, 350, 'gatos'); 
    gatos.scale.setTo(1);
    gatos.anchor.setTo(.5);
    
    //gatos.animations.add('walkL', [15,16,17], 7, false);
    
    
    //L- left / R- Right / P-Idle / gatos de 1-8
    gato1L =[12,13,14];//Branco duas Listras
    //gato1R =[24,25,26];//Branco duas Listras
    //gato1P =[(13,25)];//Branco duas Listras
    
    gato2L =[15,16,17];//Marrom sem Listras
    //gato2R =[27,28,29];//Marrom sem Listras
    //gato2P =[16,28];//Marrom sem Listras
    
    gato3L =[18,19,20];//Branco sem Listras
    //gato3R =[30,31,32];//Branco sem Listras
    //gato3P =[19,31];//Branco sem Listras
    
    gato4L =[21,22,23];//Amarelo duas Listras
    //gato4R =[33,34,35];//Amarelo duas Listras
    //gato4P =[22,34];//Amarelo duas Listras
    
    gato5L =[60,61,62];//Preto olhos azuis
    //gato5R =[72,73,74];//Preto olhos azuis
    //gato5P =[61,73];//Preto olhos azuis
    
    gato6L =[63,64,65];//Amarelo sem Listras
    //gato6R =[75,76,77];//Amarelo sem Listras
    //gato6P =[64,76];//Amarelo sem Listras
    
    gato7L =[66,67,68];//Marrom duas Listras
    //gato7R =[78,79,80];//Marrom duas Listras
    //gato7R =[78,79,80];//Marrom duas Listras
    
    gato8L =[69,70,71];//Preto olhos verdes
    //gato8R =[81,82,83];//Preto olhos verdes
    //gato8P =[70,82];//Preto olhos verdes
    
    gatos.animations.add('walkL', gato1L, 9, false);
    //gatos.animations.add('walkR', gato1R, 9, false);
    //gatos.animations.add('idle',gato1P , 9, false);
        
    game.physics.startSystem(Phaser.Physics.Arcade);
    game.physics.arcade.enable(gatos);
    gatos.body.collideWorldBounds = true;
    gatos.body.gravity.y = 2000;
    game.physics.arcade.enable(medal);
    
    
    cursors = game.input.keyboard.createCursorKeys();
    
}


function update(){
    game.physics.arcade.collide(gatos,walls);
    game.physics.arcade.overlap(gatos, medal,null, colect);
    
    console.log(level);
    //cidade.tilePosition.x-=.2;
    ceu.tilePosition.x+=.2;
    
    
    
    movimentos();
    gatos.animations.play('walk');//<<<<<<
    
    
}

function movimentos(){
   

    
    
    if(cursors){
        if(cursors.left.isDown)    {
            gatos.body.velocity.x = -110; // MUDAR
            gatos.animations.play('walkL');
            gatos.scale.x = 1;
            
        }
        else if(cursors.right.isDown){
            gatos.body.velocity.x = 110; // MUDAR
            gatos.animations.play('walkL');
            gatos.scale.x = -1;
        }
        else
        {
            gatos.body.velocity.x = 0;
            
        }
        if(cursors.up.isDown && gatos.body.touching.down){
            gatos.body.velocity.y = -600
            aJump.play();
        }
        //suicidio
         /*   if(cursors.down.isDown){
                
                gameOver();
                                                
            }*/
            
    }
    
}
function colect(s1,s2){
    
    aEat.play();
    score++;
    loadLevel();
}

function loadLevel(){
    level++;
    if(level==1){
       
        
        walls = game.add.group();
        //walls.enableBody=true;

        // wall top
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');

        // walls obstaculos ESCADA
        walls.create(0,350, 'wallH');
        walls.create(50,370, 'wallH');
        walls.create(100,390, 'wallH');
        walls.create(150,410, 'wallH');
        walls.create(200,430, 'wallH');
        walls.create(250,445, 'wallH');//<adicionar os carros


        //walls obstaculos rampa direita
        walls.create(400,400, 'wallH');
        walls.create(310,330, 'wallH');
        walls.create(190,270, 'wallH');
        walls.create(90,220, 'wallH');
        walls.create(230,150, 'wallH');
        walls.create(400,100, 'wallH');

       
        game.physics.enable(walls);
     
        walls.setAll('body.immovable',true);
    }
    else if(level==2){
        medal.position.setTo(150,70);
        
        walls.removeAll(true);
        
        // wall top
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');

        // walls obstaculos ESCADA



        //walls obstaculos rampa direita
        walls.create(400,410, 'wallH');//<<<<<
        walls.create(310,330, 'wallH');
        walls.create(190,270, 'wallH');
        walls.create(90,220, 'wallH');
        walls.create(230,150, 'wallH');
        walls.create(100,100, 'wallH');
        
        
        

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);
    }
    else if(level == 3){
        medal.position.setTo(460,400);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
         //walls obstaculos rampa direita
        
        
        walls.create(200,410, 'wallH');
        walls.create(100,350, 'wallH');
        walls.create(160,270, 'wallH');
        walls.create(200,210, 'wallH');
        
        //walls.create(230,150, 'wallH');
        walls.create(240,150, 'wallH');//correção
        
        walls.create(350,250, 'wallH');
        
        walls.create(230,150, 'wallV');
        walls.create(400,100, 'wallV');
        walls.create(400,300, 'wallV');
        walls.create(400,410, 'wallV');

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);

    }
    else if(level == 4){
        medal.position.setTo(20,450);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        //walls obstaculos rampa direita
        walls.create(400,410, 'wallV');
        walls.create(150,410, 'wallV');
        walls.create(230,410, 'wallV');
        walls.create(50,410, 'wallV');
        
        

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);

    }
    else if(level == 5){
        medal.position.setTo(120,450);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        //walls obstaculos rampa direita
        
        
        walls.create(90,410, 'wallH');
        walls.create(190,320, 'wallV');
        walls.create(190,320, 'wallH');
        walls.create(10,330, 'wallH');
        walls.create(90,410, 'wallV');
                

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);

    }
    else if(level == 6){
        medal.position.setTo(450,200);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        
        //walls obstaculos rampa direita
        walls.create(400,410, 'wallV');
        
        walls.create(400,410, 'wallH');
        walls.create(300,350, 'wallH');
        walls.create(390,290, 'wallH');
     

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);

    }
    else if(level == 7){
        medal.position.setTo(150,230);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        
        //walls obstaculos rampa direita
        walls.create(400,410, 'wallV');
        walls.create(250,400, 'wallH');
        walls.create(310,330, 'wallV');
        walls.create(210,330, 'wallH');
        walls.create(190,270, 'wallV');
     

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);

    }
    else if(level == 8){
                
        medal.position.setTo(450,457);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        
        //walls obstaculos rampa direita
        walls.create(400,400, 'wallV');
        walls.create(310,360, 'wallH');
        walls.create(260,420, 'wallH');
        walls.create(150,470, 'wallH');
        walls.create(150,300, 'wallV');
        walls.create(250,200, 'wallV');
        walls.create(150,300, 'wallH');
        
     

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);
        
            
    }
    else if(level == 9){
        
        
        medal.position.setTo(1000,457);
        
        walls.removeAll(true);
        
        walls.create(0,0, 'wallH');
        walls.create(100,0, 'wallH');
        walls.create(200,0, 'wallH');
        walls.create(300,0, 'wallH');
        walls.create(400,0, 'wallH');


        //wall bottom
        walls.create(0,490, 'wallH');
        walls.create(100,490, 'wallH');
        walls.create(200,490, 'wallH');
        walls.create(300,490, 'wallH');
        walls.create(400,490, 'wallH');

        // wall vertical right
        walls.create(0,0, 'wallV');
        walls.create(490,0, 'wallV');
        walls.create(490,100, 'wallV');
        walls.create(490,200, 'wallV');
        walls.create(490,300, 'wallV');
        walls.create(490,400, 'wallV');

        // wall vertical left
        walls.create(0,0, 'wallV');
        walls.create(0,100, 'wallV');
        walls.create(0,200, 'wallV');
        walls.create(0,300, 'wallV');
        walls.create(0,400, 'wallV');
        
        scoreLabel = game.add.text(30, 50, 'Fim do jogo!  Parabéns você venceu os ' +score + ' desafios!', { font: '18px Arial', fill: '#ffffff' });
        //scoreLabel = game.add.text(30, 50, 'Fim do jogo!  Parabéns você venceu! ' +score + ' pontos', { font: '18px Arial', fill: '#ffffff' });
       

        game.physics.enable(walls);

        walls.setAll('body.immovable',true);
        

    }
    
    scoreLabel = game.add.text(30, 30, ' Pizzas: '+ score, { font: '18px Arial', fill: '#ffffff' });
    
}
//ele ta gerando uma nova janela, apagando
/*function gameOver(){
    scoreLabel=game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER!', {font:'40px Arial', fill:'#000000'});
    scoreLabel.anchor.setTo(0.5);
    
}*/
