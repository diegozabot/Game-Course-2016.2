var game=new Phaser.Game(640,480, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    // full screen centered
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true; 
    
}

function create(){

}

function update(){

}
