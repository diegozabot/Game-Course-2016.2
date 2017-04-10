var game=new Phaser.Game(320, 320, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

function preload(){
    //fase1
    game.load.tilemap('map','assets/images/map.json', null, Phaser.Tilemap.TILED_JSON); 
    game.load.image('overworld','assets/images/overworld.png');
    
    //fase3
    game.load.spritesheet('player','assets/images/player.png', 16, 32);
}

function create(){
    //fase2
    var map = game.add.tilemap('map');
    map.addTilesetImage('overworld');
    background=map.createLayer('background');
    level1=map.createLayer('level1');
    
    //fase3
    player = game.add.sprite(8,16,'player');
    player.anchor.setTo(0.5);
    player.frame=4;
    player.animations.add('walkD',[0,1,2,3]);
    player.animations.add('walkR',[4,5,6,7]);
    player.animations.add('walkU',[8,9,10,11]);
    player.animations.add('walkL',[12,13,14,15]);
    
    //fase4
    cursors = game.input.keyboard.createCursorKeys();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player);
    
    //fase5
    map.setCollisionBetween(204,206,true,'level1');
    
    map.setCollisionBetween(7,11,true,'level1');
    map.setCollisionBetween(47,51,true,'level1');
    map.setCollisionBetween(87,91,true,'level1');
    map.setCollisionBetween(127,128,true,'level1');
    map.setCollisionBetween(130,131,true,'level1');

}

vel=128;
function update(){
    
    //fase4
    player.body.velocity.setTo(0);
 

    if (cursors.up.isDown)
    {
        player.animations.play('walkU',16,false);
        player.body.velocity.y=-vel;
    }
    else if (cursors.down.isDown)
    {
        player.animations.play('walkD',16,false);
        player.body.velocity.y=vel;
    } else if (cursors.left.isDown)
    {
        player.animations.play('walkL',16,false);
        player.body.velocity.x=-vel;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('walkR',16,false);
        player.body.velocity.x=vel;
    }
    else   player.frame=0;
    
    //fase5
    game.physics.arcade.collide(player, level1, function(){
        console.log();
    });
}
