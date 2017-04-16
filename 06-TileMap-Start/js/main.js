var game=new Phaser.Game(320, 320, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

function preload(){
    //fase1
    //carregar o mapa e o tileset
    
    //fase3
    //carregar o spritesheet do player
    game.load.spritesheet('player','assets/images/player.png', 16, 32);
}

function create(){
    //fase2
    //carregar os niveis do mapa
    
    //fase3
    //animações do player
    player = game.add.sprite(8,16,'player');
    player.anchor.setTo(0.5);
    player.frame=4;
    player.animations.add('walkD',[0,1,2,3]);
    player.animations.add('walkR',[4,5,6,7]);
    player.animations.add('walkU',[8,9,10,11]);
    player.animations.add('walkL',[12,13,14,15]);
    
    //fase4
    //cursor e física
    cursors = game.input.keyboard.createCursorKeys();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player);
    
    //fase5
    //colisões entre elementos do mapa
    

}

vel=128;

function update(){
    
    //fase4
    //movimento do player
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
    //colisão entre player e level1

}
