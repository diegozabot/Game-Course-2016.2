var game=new Phaser.Game(500, 340, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

var player;
var score=0;

function preload(){
    // carregamento assets
    game.load.image('forest','assets/images/forest.png');
    game.load.spritesheet('player','assets/images/chick.png',16,18);
    game.load.spritesheet('frutas','assets/images/frutas.png',32,32);
    game.load.image('wallH','assets/images/wallWoodH.png');
    game.load.image('wallV','assets/images/wallWoodV.png');
    
    game.load.audio('jump',['assets/audio/jump.mp3','assets/audio/jump.ogg']);
    game.load.audio('eat',['assets/audio/eat.mp3','assets/audio/eat.ogg']);
    game.load.audio('dead',['assets/audio/dead.mp3','assets/audio/dead.ogg']);
    

}

function create(){
    // audio
    aJump = game.add.audio('jump');
    aEat = game.add.audio('eat');
    aDead = game.add.audio('dead');
    
    // background e player
    game.add.image(0,0,'forest');
    player = game.add.sprite(game.world.centerX, game.world.centerY,'player');
    player.animations.add('walk',[0,1,2],10,false);
    player.anchor.setTo(0.5);
    player.scale.setTo(1.5);
    
    
    scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    // física
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    
    // movimento
    cursors = game.input.keyboard.createCursorKeys();
        
}

function update(){
   
    // movimento
    if(cursors){
        if(cursors.left.isDown) {
            player.body.velocity.x = -200; 
            player.scale.x=-1.5;
            player.animations.play('walk');
        }
        else if(cursors.right.isDown) {
            player.body.velocity.x = 200;
            player.scale.x=1.5;
            player.animations.play('walk');
        }
        else{
            player.body.velocity.x = 0;
            player.frame=0;
        }

    }
}
