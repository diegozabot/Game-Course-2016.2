var game=new Phaser.Game(635, 545, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('phaser','assets/images/phaser.png');
    game.load.image('ball','assets/images/ball.png');
    
    game.load.audio('aBallBounce',['assets/audio/ballBounce.m4a','assets/audio/ballBounce.ogg']);
}

function create(){
    game.add.sprite(0,0,'phaser');
    ball = game.add.sprite(100,100,'ball');
    
    aBallBounce = game.add.audio('aBallBounce');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(ball);
    
    //ball.body.velocity.setTo(100,200);
    game.physics.arcade.velocityFromAngle(30,300,ball.body.velocity);
    
    ball.body.collideWorldBounds=true;
    ball.body.bounce.setTo(1);
    
    ball.body.onWorldBounds = new Phaser.Signal();
    ball.body.onWorldBounds.add(ressalto);
}

function update(){
    
}

function ressalto(sprite, up, down, left, right){
    if(up)
        console.log('Ressalto UP');
    if(down)
        console.log('Ressalto DOWN');
    if(left)
        console.log('Ressalto LEFT');
    if(right)
        console.log('Ressalto RIGHT');
    
    aBallBounce.play();
}