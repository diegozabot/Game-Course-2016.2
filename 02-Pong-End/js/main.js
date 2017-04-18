var game=new Phaser.Game(640, 480, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('background','assets/images/background.png');
    game.load.image('ball','assets/images/ball.png');
    game.load.image('paddle','assets/images/paddle.png');
    game.load.image('button','assets/images/button.png');
    
    game.load.audio('aBallBounce',['assets/audio/ballBounce.m4a','assets/audio/ballBounce.ogg']);
    game.load.audio('aBallHit',['assets/audio/ballHit.m4a','assets/audio/ballHit.ogg']);
    game.load.audio('aBallMissed',['assets/audio/ballMissed.m4a','assets/audio/ballMissed.ogg']);
}

var p1score = p2score = 0;
var up=false, down=false;
function create(){
    game.add.image(0,0,'background');
    ball = game.add.sprite(game.world.centerX,game.world.centerY,'ball');
    paddle1 = game.add.sprite(50,game.world.centerY,'paddle');
    paddle2 = game.add.sprite(590,game.world.centerY,'paddle');
    ball.anchor.setTo(.5);
    ball.scale.setTo(1.5);
    paddle1.anchor.setTo(.5);
    paddle1.scale.setTo(1.5);
    paddle2.anchor.setTo(.5);
    paddle2.scale.setTo(1.5);
    
    // buttons
    buttons();
    
    aBallBounce = game.add.audio('aBallBounce');
    aBallHit = game.add.audio('aBallHit');
    aBallMissed = game.add.audio('aBallMissed');
    
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([ball, paddle1, paddle2]);
    
    //ball.body.velocity.setTo(100,200);
    game.physics.arcade.velocityFromAngle(30,300,ball.body.velocity);
    
    ball.body.collideWorldBounds=true;
    ball.body.bounce.setTo(1);
    
    paddle1.body.collideWorldBounds=true;
    paddle2.body.collideWorldBounds=true;
    
    paddle1.body.immovable = true;
    paddle2.body.immovable = true;
    
    
    ball.body.onWorldBounds = new Phaser.Signal();
    ball.body.onWorldBounds.add(ressalto);
    
    p1up = game.input.keyboard.addKey(Phaser.Keyboard.A);
    p1down = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    p2up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    p2down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    
        
    p1text= game.add.text(200, 50, p1score, {font:'80px Arial', fill:'#ffffff'});
    p2text= game.add.text(440, 50, p2score, {font:'80px Arial', fill:'#ffffff'});
    p1text.anchor.set(.5);
    p2text.anchor.set(.5);
}

function update(){
    
    if(p1up.isDown || up)
        paddle1.body.velocity.y=-600;
    else if(p1down.isDown||down)
        paddle1.body.velocity.y=600;
    else
        paddle1.body.velocity.y=0;
    
    if(p2up.isDown)
        paddle2.body.velocity.y=-600;
    else if(p2down.isDown)
        paddle2.body.velocity.y=600;
    else
        paddle2.body.velocity.y=0;
    
    // basic IA
    paddle2.body.velocity.y=0;
    if(Math.random()>.6) {
        if((ball.y-paddle2.y)>0)
            paddle2.body.velocity.y=600;
        else
            paddle2.body.velocity.y=-600;
    }
    
    game.physics.arcade.collide(ball, paddle1, process, collision);
    game.physics.arcade.collide(ball, paddle2, process, collision);

        
}
function collision(ball, paddle){
    aBallHit.play();
}
function process(ball,paddle){
    var returnAngle;
    //console.log(paddle.height);
    var segmentHit = Math.floor((ball.y - paddle.y)/4);
    //console.log(segmentHit);
    if (segmentHit >= 4) {
        segmentHit = 4;
    } else if (segmentHit <= -4) {
        segmentHit = -4;
    }

    if (paddle.x < game.world.width * 0.5) {
        returnAngle = segmentHit * 15;
        game.physics.arcade.velocityFromAngle(returnAngle, 300, ball.body.velocity);
    } else {
        returnAngle = 180 - (segmentHit * 15);
        
        game.physics.arcade.velocityFromAngle(returnAngle, 300, ball.body.velocity);
    }
}
function ressalto(sprite, up, down, left, right){
    if(up || down)
        aBallBounce.play();
    else if(left){
        p2score++;
        p2text.text=p2score;
        ball.position.setTo(game.world.centerX,game.world.centerY);
        game.physics.arcade.velocityFromAngle(30,300,ball.body.velocity);
        aBallMissed.play();
    }
    else if(right){
        p1score++;
        p1text.text=p1score;
        ball.position.setTo(game.world.centerX,game.world.centerY);
        game.physics.arcade.velocityFromAngle(150,300,ball.body.velocity);
        aBallMissed.play();
    }
}
function buttons(){
    // buttons
    buttonUp = game.add.image(560,260,'button');
    buttonUp.anchor.setTo(.5);
    buttonUp.scale.setTo(.7);
    buttonUp.angle=-90;
    buttonUp.alpha=.5;
    buttonUp.inputEnabled = true
    buttonUp.events.onInputOver.add(function(){up=true;});
    buttonUp.events.onInputOut.add(function(){up=false;});
    buttonUp.events.onInputDown.add(function(){up=true;});
    buttonUp.events.onInputUp.add(function(){up=false;});
    
    buttonDown = game.add.image(560,400,'button');
    buttonDown.anchor.setTo(.5);
    buttonDown.scale.setTo(.7);
    buttonDown.angle=90;
    buttonDown.alpha=.5;
    buttonDown.inputEnabled = true
    buttonDown.events.onInputOver.add(function(){down=true;});
    buttonDown.events.onInputOut.add(function(){down=false;});
    buttonDown.events.onInputDown.add(function(){down=true;});
    buttonDown.events.onInputUp.add(function(){down=false;});
}