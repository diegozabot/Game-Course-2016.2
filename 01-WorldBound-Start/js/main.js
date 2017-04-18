var game=new Phaser.Game(635, 545, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('phaser','assets/images/phaser.png');
}

function create(){
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    game.add.sprite(0,0,'phaser');
}

function update(){
    
}