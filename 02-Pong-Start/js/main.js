var game = new Phaser.Game(640, 480, Phaser.AUTO, 'Pong', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('background','assets/images/background.png');
    
}

function create(){
    game.add.sprite(0,0,'background');
     
}
function update(){
    
}
