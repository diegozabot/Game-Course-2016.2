var game=new Phaser.Game(400, 300, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('player','assets/images/player.png');
    game.load.image('target','assets/images/target.png'); 
}

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

    if (cursors.up.isDown)
    {
        player.body.velocity.y=-300
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y=300
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x=-300
    }
    else if (cursors.right.isDown)
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
    buttonUp = game.add.image(560,260,'button');
    buttonUp.anchor.setTo(.5);
    buttonUp.scale.setTo(.7);
    buttonUp.angle=-90;
    buttonUp.alpha=.5;
    buttonUp.inputEnabled = true
    buttonUp.events.onInputOver.add(function(){up=true;});
    buttonUp.events.onInputOut.add(function(){up=false;});
    
    buttonDown = game.add.image(560,400,'button');
    buttonDown.anchor.setTo(.5);
    buttonDown.scale.setTo(.7);
    buttonDown.angle=90;
    buttonDown.alpha=.5;
    buttonDown.inputEnabled = true
    buttonDown.events.onInputOver.add(function(){down=true;});
    buttonDown.events.onInputOut.add(function(){down=false;});
}