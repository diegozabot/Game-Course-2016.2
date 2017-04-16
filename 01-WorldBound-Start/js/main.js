var game=new Phaser.Game(635, 545, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('phaser','assets/images/phaser.png');
}

function create(){
    game.add.sprite(0,0,'phaser');
}

function update(){
    
}