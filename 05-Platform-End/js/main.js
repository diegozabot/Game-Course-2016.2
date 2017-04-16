var game=new Phaser.Game(500, 340, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

var player;
var score=0;

function preload(){
    
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
    
    aJump = game.add.audio('jump');
    aEat = game.add.audio('eat');
    aDead = game.add.audio('dead');
    
    game.add.image(0,0,'forest');
    player = game.add.sprite(game.world.centerX, game.world.centerY,'player');
    player.animations.add('walk',[0,1,2],10,false);
    player.anchor.setTo(0.5);
    player.scale.setTo(1.5);
    
    cherry = game.add.sprite(0,0,'frutas');
    cherry.anchor.setTo(0.5);
    
    scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(cherry);
    player.body.gravity.y = 2000;
    
    createWorld();
    
    cursors = game.input.keyboard.createCursorKeys();
    
    randomCherry();
   
    //enemies
    enemies = game.add.group()
    
    enemies.createMultiple(10, 'frutas',27);
    game.physics.enable(enemies);
    timerEvent=game.time.events.loop(2200, addEnemy);
    
}

function update(){
    game.physics.arcade.collide(player,walls);
    game.physics.arcade.overlap(player,cherry,null,eat);
    game.physics.arcade.collide(enemies,walls);
    game.physics.arcade.overlap(enemies,player,null, kill);
    
    if(!player.inWorld && player.position.y>340)
        create();
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


        if(cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -800;
            aJump.play();
        }
    }
}
function addEnemy(){
    var enemy = enemies.getFirstDead();
    if (!enemy) {
        return;
    }
    enemy.anchor.setTo(.5,1);
    enemy.reset(game.world.centerX,0);
    enemy.body.gravity.y=500;
    enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
    enemy.body.bounce.x=1;
    
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
}
function kill(s1,s2){
    aDead.play();
    player.angle=-90;
    enemies.setAll('body.velocity.x',0);
    player.body.velocity.x=0;
    cursors=false;
    game.time.events.remove(timerEvent);
    player.body=null;
}
function eat(s1,s2){
    randomCherry();
    score++;
    scoreLabel.text='score: '+score;
    aEat.play();
}
function randomCherry(){
    var position = [
        {x: 170, y: 80}, {x: 330, y: 80}, // Top row
        {x: 60, y: 160}, {x: 440, y: 160}, // Middle row
        {x: 170, y: 300}, {x: 330, y: 300} // Bottom row
    ];
    for (var i = 0; i < position.length; i++) {
        if (position[i].x == cherry.x) {
            position.splice(i, 1);
        }
    }
    cherry.position = game.rnd.pick(position);
}
function createWorld(){
    walls = game.add.group();
    //walls.enableBody=true;
    
    // wall top
    walls.create(0,0, 'wallH');
    walls.create(300,0, 'wallH');
    // wall bottom
    walls.create(0,320, 'wallH');
    walls.create(300,320, 'wallH');
    // wall lateral
    walls.create(150,100, 'wallH');
    walls.create(150,240, 'wallH');
    walls.create(-100,180, 'wallH');
    walls.create(400,180, 'wallH');
    // wall vertical
    walls.create(0,0, 'wallV');
    walls.create(480,0, 'wallV');
    
    game.physics.enable(walls);
 
    walls.setAll('body.immovable',true);
}