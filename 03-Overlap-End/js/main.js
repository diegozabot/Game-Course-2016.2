var game=new Phaser.Game(400, 300, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('player','assets/images/player.png');
    game.load.image('target','assets/images/target.png'); 
}

function create(){
    target = game.add.sprite(game.world.centerX, game.world.centerY,'target');
    player= game.add.sprite(0,0,'player');
    player.anchor.setTo(0.5);
    target.anchor.setTo(0.5);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player,target]);
    
    player.body.collideWorldBounds = true;

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