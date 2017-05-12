var game=new Phaser.Game(640, 480, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

var player;
var score=0;
laserTime= 0

function preload(){
    // carregamento assets
    game.load.image('forest','assets/images/background.png');
    game.load.spritesheet('player','assets/images/spaceship.png',32,32);
    game.load.image('wallH','assets/images/wallWoodH.png');
    game.load.image('wallV','assets/images/wallWoodV.png');
    game.load.spritesheet('laser','assets/images/laser.png',6,6);
    game.load.spritesheet('elaser','assets/images/elaser.png',6,6);
    game.load.image('alien','assets/images/alien.png');
    game.load.spritesheet('explosion','assets/images/explosion.png',32,32);
    game.load.audio('dead',['assets/audio/dead.mp3','assets/audio/dead.ogg']);
    
}

function create(){
    // audio
    aDead = game.add.audio('dead');
    
    // background e player
    game.add.image(0,0,'forest');
    enemies =game.add.group();
    enemies.createMultiple(9,'alien');
    timeEvent = game.time.events.loop(2200, addenemy);
    
    //game.add.image(game.world.centerX,0,'alien');
    player = game.add.sprite(game.world.centerX,400,'player');
    player.animations.add('walk',[0,1],10,true);
    player.anchor.setTo(0.5,0);
    player.scale.setTo(1.5);  
    
    //enemy fire
    efires = game.add.group();
    efires.enableBody = true;
    efires.physicsBodyType = Phaser.Physics.ARCADE;
    efires.createMultiple(20, 'elaser');
    efires.setAll('anchor.x', 0.5);
    efires.setAll('anchor.y', 1);
    efires.setAll('outOfBoundsKill', true);
    efires.setAll('checkWorldBounds', true);
    game.physics.arcade.enable(efires);
    
    scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    // física
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(enemies);
    game.physics.arcade.enable(efires);
    
    //tiro
    lasers = game.add.group();
    lasers.enableBody = true;
    lasers.physicsBodyType = Phaser.Physics.ARCADE;
    lasers.createMultiple(30, 'laser');
    lasers.setAll('anchor.x', 0.5);
    lasers.setAll('anchor.y', 1);
    lasers.setAll('outOfBoundsKill', true);
    lasers.setAll('checkWorldBounds', true);
    game.physics.arcade.enable(lasers);
    explosion = game.add.sprite(-50,-50,'explosion');
    explosion.animations.add('kaboom',[0,1,2,3,4,5,6],10,false);


    
    // movimento
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    

}

function update(){
   
    // movimento
    if(cursors){
        if(cursors.left.isDown) {
            player.body.velocity.x = -205; 
            player.scale.x=-1.5;
            player.animations.play('walk');
        }
        else if(cursors.right.isDown) {
            player.body.velocity.x = 205;
            player.scale.x=1.5;
            player.animations.play('walk');
        }
        else{
            player.body.velocity.x = 0;
            player.frame=0;
        }
        
        if(spacebar.isDown) {
            fire(); 
        }
    if (explosion.frame == 5){
        explosion.visibility = false;

    }
    }
    game.physics.arcade.overlap(lasers,enemies,null,aliendead);
    game.physics.arcade.overlap(efires,player,null,playerdead);
    timeEvent=game.time.events.loop(game.rnd.integerInRange(4000,5000),enemyfire);

}

function fire(){
    
    if(game.time.now > laserTime){
        
        var laser = lasers.getFirstDead();

        if (!laser) return;
        laser.anchor.setTo(0.5,1);
        laser.reset(player.x,player.y);
        laser.body.velocity.y=-210;
        laserTime= game.time.now + 525;
    }
}
function addenemy(){
    
    var enemy = enemies.getFirstDead();
    
    if (!enemy) return;
    enemy.reset(game.rnd.between(0,640), game.rnd.between(0,200));
    enemy.body.velocity.x = 125 * game.rnd.pick([-1,1]);
    enemy.anchor.setTo(0.5);
    enemy.body.bounce.setTo(1);
    enemy.body.collideWorldBounds = true;
}
function playerdead(s1,s2){
    explosion.visibility = true;
    explosion.x = s1.x;
    explosion.y = s2.y;
    explosion.anchor.setTo(0.5);
    explosion.animations.play('kaboom');
    s1.kill();
    s2.kill();
    create();
}
function aliendead(s1,s2){
    explosion.visibility = true;
    explosion.x = s1.x;
    explosion.y = s2.y;
    explosion.anchor.setTo(0.5);
    explosion.animations.play('kaboom');
    s1.kill();
    s2.kill();
    score+=10;
    scoreLabel.text="score: "+score;
}
function enemyfire(){
    enemy = enemies.getRandom();
    if(!enemy.alive) return;
    var efire = efires.getFirstDead();
    if (!efire) return;
    
    
    efire.reset(enemy.x, enemy.y);
    efire.body.velocity.y = 175;

}