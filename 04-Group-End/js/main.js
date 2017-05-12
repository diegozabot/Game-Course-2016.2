var game=new Phaser.Game(800,400, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

var cherry = 0;
var up = down = left = right = false;
function preload(){
    game.load.spritesheet('frutas','assets/images/frutas.png',32,32);
    game.load.spritesheet('chick','assets/images/chick.png',16,18);
    game.load.image('button','assets/images/button.png');
    
}

function create(){
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    chick = game.add.sprite(50,50,'chick');
    chick.anchor.setTo(.5);
    chick.scale.setTo(1.5);
    chick.animations.add('walk',[0,1,2],10,false);
    
    frutas = game.add.group();
    
    for(i=0;i<110;i++){
        x=game.rnd.between(50,750);
        y=game.rnd.between(50,380); 
        if(i<10) elem=0;
        else elem=game.rnd.between(1,35);
        
        frutas.create(x,y,'frutas',elem);

    }
    
    cursors = game.input.keyboard.createCursorKeys();    
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(chick);
    chick.body.collideWorldBounds=true;
    chick.body.setSize(12,15,2,3);
    
    game.physics.enable(frutas);
    frutas.setAll('body.collideWorldBounds', true);
    
    frutas.setAll('body.mass',0);

    /*frutas.setAll('body.velocity.x',200);
    frutas.setAll('body.velocity.y',200);
    frutas.setAll('body.bounce.x',1);
    frutas.setAll('body.bounce.y',1);*/
     
    score = game.add.text(10, 10, 'Score: '+cherry,
                              {font:'14px Arial', fill:'#fff'});
    instruction = game.add.text(game.world.centerX,30, "Eat all cherries!",{font:'40px Arial', fill:'#fff'})
    instruction.anchor.setTo(.5);
    
    buttons();
}

function update(){
    game.physics.arcade.collide(chick, frutas, null, eat);
    game.physics.arcade.collide(frutas);
    
    chick.body.velocity.setTo(0);

    if (cursors.up.isDown || up)
    {
        chick.body.velocity.y=-200
        chick.animations.play('walk');
    }
    else if (cursors.down.isDown || down)
    {
        chick.body.velocity.y=200
        chick.animations.play('walk');
    }

    if (cursors.left.isDown || left)
    {
        chick.body.velocity.x=-200
        chick.scale.x=-1.5;
        chick.animations.play('walk');
    }
    else if (cursors.right.isDown || right)
    {
        chick.body.velocity.x=200;
        chick.scale.x=1.5;
        chick.animations.play('walk');
    }
    
    if(!cursors.right.isDown && !cursors.left.isDown && 
       !cursors.down.isDown && !cursors.up.isDown &&
       !up && !down && !left && !right)
        chick.frame=0;

}
function eat(s1,s2){
    if(s2.frame==0){
        s2.kill();

        cherry++;
        score.text = 'Score: '+cherry;
        if(cherry==10){
            s1.kill();
            gameOver=game.add.text(game.world.centerX,game.world.centerY, "Well Done!",
                              {font:'80px Arial', fill:'#fff'});
            gameOver.anchor.setTo(.5);
        }
        
    }
        

}
function buttons(){
    // buttons
    buttonUp = game.add.image(80,200,'button');
    buttonUp.anchor.setTo(.5);
    buttonUp.scale.setTo(.7);
    buttonUp.angle=-90;
    buttonUp.alpha=.1;
    buttonUp.inputEnabled = true
    buttonUp.events.onInputOver.add(function(){up=true;});
    buttonUp.events.onInputOut.add(function(){up=false;});
    buttonUp.events.onInputDown.add(function(){up=true;});
    buttonUp.events.onInputUp.add(function(){up=false;});
    
    buttonDown = game.add.image(80,330,'button');
    buttonDown.anchor.setTo(.5);
    buttonDown.scale.setTo(.7);
    buttonDown.angle=90;
    buttonDown.alpha=.1;
    buttonDown.inputEnabled = true
    buttonDown.events.onInputOver.add(function(){down=true;});
    buttonDown.events.onInputOut.add(function(){down=false;});
    buttonDown.events.onInputDown.add(function(){down=true;});
    buttonDown.events.onInputUp.add(function(){down=false;});
    
    buttonRight = game.add.image(720,330,'button');
    buttonRight.anchor.setTo(.5);
    buttonRight.scale.setTo(.7);
    buttonRight.angle=0;
    buttonRight.alpha=.1;
    buttonRight.inputEnabled = true
    buttonRight.events.onInputOver.add(function(){right=true;});
    buttonRight.events.onInputOut.add(function(){right=false;});
    buttonRight.events.onInputDown.add(function(){right=true;});
    buttonRight.events.onInputUp.add(function(){right=false;});
    
    buttonLeft = game.add.image(590,330,'button');
    buttonLeft.anchor.setTo(.5);
    buttonLeft.scale.setTo(.7);
    buttonLeft.angle=180;
    buttonLeft.alpha=.1;
    buttonLeft.inputEnabled = true
    buttonLeft.events.onInputOver.add(function(){left=true;});
    buttonLeft.events.onInputOut.add(function(){left=false;});
    buttonLeft.events.onInputDown.add(function(){left=true;});
    buttonLeft.events.onInputUp.add(function(){left=false;});
}