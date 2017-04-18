var game=new Phaser.Game(400, 300, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    game.load.image('player','assets/images/player.png');
    game.load.image('target','assets/images/target.png'); 
}

function create(){
    target = game.add.sprite(game.world.centerX-30, game.world.centerY,'target');
    player= game.add.sprite(game.world.centerX+30, game.world.centerY,'player');
    player.anchor.setTo(0.5);
    target.anchor.setTo(0.5);
}

function update(){

}
