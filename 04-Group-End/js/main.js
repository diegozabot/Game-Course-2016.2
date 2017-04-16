var game=new Phaser.Game(640,480, Phaser.AUTO, 'Example', {preload: preload, create: create, update: update});

var cherry = 0;
function preload(){
    game.load.spritesheet('frutas','assets/images/frutas.png',32,32);
    game.load.spritesheet('chick','assets/images/chick.png',16,18);
    
}

function create(){
    chick = game.add.sprite(50,50,'chick');
    chick.anchor.setTo(.5);
    chick.scale.setTo(1.5);
    chick.animations.add('walk',[0,1,2],10,false);
    
    frutas = game.add.group();
    
    for(i=0;i<110;i++){
        x=game.rnd.between(50,600);
        y=game.rnd.between(50,440); 
        if(i<10) elem=0;
        else elem=game.rnd.between(1,35);
        
        frutas.create(x,y,'frutas',elem);

    }
    
    cursors = game.input.keyboard.createCursorKeys();    
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(chick);
    chick.body.collideWorldBounds=true;
    
    game.physics.enable(frutas);
    frutas.setAll('body.collideWorldBounds', true);
    
    frutas.setAll('body.mass',0);

    /*frutas.setAll('body.velocity.x',200);
    frutas.setAll('body.velocity.y',200);
    frutas.setAll('body.bounce.x',1);
    frutas.setAll('body.bounce.y',1);*/
     
    score = game.add.text(10, 10, 'Score: '+cherry,
                              {font:'14px Arial', fill:'#fff'});
    instruction = game.add.text(game.world.centerX,30, "Eat all cherries!",{font:'40px Arial', fill:'#fff'})
    instruction.anchor.setTo(.5);
}

function update(){
    game.physics.arcade.collide(chick, frutas, null, eat);
    game.physics.arcade.collide(frutas);
    
    chick.body.velocity.setTo(0);

    if (cursors.up.isDown)
    {
        chick.body.velocity.y=-200
        chick.animations.play('walk');
    }
    else if (cursors.down.isDown)
    {
        chick.body.velocity.y=200
        chick.animations.play('walk');
    }

    if (cursors.left.isDown)
    {
        chick.body.velocity.x=-200
        chick.scale.x=-1.5;
        chick.animations.play('walk');
    }
    else if (cursors.right.isDown)
    {
        chick.body.velocity.x=200;
        chick.scale.x=1.5;
        chick.animations.play('walk');
    }
    
    if(!cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown)
        chick.frame=0;

}
function eat(s1,s2){
    if(s2.frame==0){
        s2.kill();

        cherry++;
        score.text = 'Score: '+cherry;
        if(cherry==10){
            s1.kill();
            gameOver=game.add.text(game.world.centerX,game.world.centerY, "Well Done!",
                              {font:'80px Arial', fill:'#fff'});
            gameOver.anchor.setTo(.5);
        }
        
    }
        

}
