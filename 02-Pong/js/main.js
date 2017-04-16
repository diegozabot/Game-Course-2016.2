var game=new Phaser.Game(640, 480, Phaser.AUTO, 'Pong', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('background','assets/images/background.png');
    game.load.image('ball','assets/images/ball.png');
    game.load.image('paddle','assets/images/paddle.png');
    
    game.load.audio('ballHit',['assets/audio/ballHit.m4a', 'assets/audio/ballHit.ogg']);
    game.load.audio('ballBounce',['assets/audio/ballBounce.m4a', 'assets/audio/ballBounce.ogg']);
    game.load.audio('ballMissed',['assets/audio/ballMissed.m4a', 'assets/audio/ballMissed.ogg']);


}

function create(){
    game.add.sprite(0,0,'background');
    bola = game.add.sprite(game.world.centerX,game.world.centerY,'ball');
    pEsq = game.add.sprite(50,game.world.centerY,'paddle');
    pDir = game.add.sprite(590,game.world.centerY,'paddle');
    
    ballHit = game.add.audio('ballHit');
    ballBounce = game.add.audio('ballBounce');
    ballMissed = game.add.audio('ballMissed');
    
    bola.anchor.setTo(.5);
    pEsq.anchor.setTo(.5);
    pDir.anchor.setTo(.5);
    
    //let´s start some physics, ARCADE
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //quem esta influençado pela fisica
    game.physics.enable([bola,pEsq]);
 
    //evento quando o objeto sai dos limites do mundo
        //bola.checkWorldBounds = true;
    //colisão com os limites do mundo
    bola.body.collideWorldBounds = true;
    pEsq.body.collideWorldBounds = true;
    //não recebe forças
    pEsq.body.immovable = true;
    //depois da colisão a velocidade fica a mesma
    bola.body.bounce.setTo(1);
    
    game.physics.arcade.velocityFromAngle(30, 300, bola.body.velocity);
    

    //bola.checkWorldBounds = true;
    //bola.events.onOutOfBounds.add(outBounds, this);
     
}
function update(){
    p1up = game.input.keyboard.addKey(Phaser.Keyboard.A);
    p1down = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    
    if (p1up.isDown)
        pEsq.body.velocity.y = -600;
    else if(p1down.isDown)
        pEsq.body.velocity.y = 600;
    else
        pEsq.body.velocity.y = 0;

    
    game.physics.arcade.collide(bola, pEsq, null, bounce, this);
    
    if(bola.body.blocked.left){
        console.log('score');
        ballMissed.play();
        bola.position.setTo(game.world.centerX,game.world.centerY);
    }


}
function outBounds(){
    console.log('out');
}
function bounce(){
    ballHit.play();
}