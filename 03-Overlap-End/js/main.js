var game=new Phaser.Game(800, 400, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('player','assets/images/player.png');
    game.load.image('target','assets/images/target.png'); 
    game.load.image('button','assets/images/button.png'); 
}

var up = down = left = right = false;
function create(){
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    target = game.add.sprite(game.world.centerX, game.world.centerY,'target');
    player= game.add.sprite(0,0,'player');
    player.anchor.setTo(0.5);
    target.anchor.setTo(0.5);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player,target]);
    
    player.body.collideWorldBounds = true;
    
    buttons();
    

}

function update(){
    game.physics.arcade.overlap(player, target, null, endGame);

    player.body.velocity.setTo(0);

    if (cursors.up.isDown || up)
    {
        player.body.velocity.y=-300
    }
    else if (cursors.down.isDown || down)
    {
        player.body.velocity.y=300
    }

    if (cursors.left.isDown || left)
    {
        player.body.velocity.x=-300
    }
    else if (cursors.right.isDown || right)
    {
        player.body.velocity.x=300
    }

}

function endGame(a,b){
    a.kill();
    b.kill();
    console.log('win');
    text=game.add.text(game.world.centerX, game.world.centerY,'You win!',{font:'30px Verdana', fill:'#66f'});
    text.anchor.setTo(.5);
}
function buttons(){
    // buttons
    buttonUp = game.add.image(600,300,'button');
    buttonUp.anchor.setTo(.5);
    buttonUp.scale.setTo(.7);
    buttonUp.angle=-90;
    buttonUp.alpha=.5;
    buttonUp.inputEnabled = true
    buttonUp.events.onInputOver.add(function(){up=true;});
    buttonUp.events.onInputOut.add(function(){up=false;});
    buttonUp.events.onInputDown.add(function(){up=true;});
    buttonUp.events.onInputUp.add(function(){up=false;});
    
    buttonDown = game.add.image(600,400,'button');
    buttonDown.anchor.setTo(.5);
    buttonDown.scale.setTo(.7);
    buttonDown.angle=90;
    buttonDown.alpha=.5;
    buttonDown.inputEnabled = true
    buttonDown.events.onInputOver.add(function(){down=true;});
    buttonDown.events.onInputOut.add(function(){down=false;});
    buttonDown.events.onInputDown.add(function(){down=true;});
    buttonDown.events.onInputUp.add(function(){down=false;});
    
    buttonRight = game.add.image(700,400,'button');
    buttonRight.anchor.setTo(.5);
    buttonRight.scale.setTo(.7);
    buttonRight.angle=0;
    buttonRight.alpha=.5;
    buttonRight.inputEnabled = true
    buttonRight.events.onInputOver.add(function(){right=true;});
    buttonRight.events.onInputOut.add(function(){right=false;});
    buttonRight.events.onInputDown.add(function(){right=true;});
    buttonRight.events.onInputUp.add(function(){right=false;});
    
    buttonLeft = game.add.image(500,400,'button');
    buttonLeft.anchor.setTo(.5);
    buttonLeft.scale.setTo(.7);
    buttonLeft.angle=180;
    buttonLeft.alpha=.5;
    buttonLeft.inputEnabled = true
    buttonLeft.events.onInputOver.add(function(){left=true;});
    buttonLeft.events.onInputOut.add(function(){left=false;});
    buttonLeft.events.onInputDown.add(function(){left=true;});
    buttonLeft.events.onInputUp.add(function(){left=false;});
}