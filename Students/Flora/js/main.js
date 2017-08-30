var game=new Phaser.Game(610, 300, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update, render: render});
var hero;
var music1;
var square1;
function preload(){
    
    game.load.image('phaser','assets/images/phaser.png');
    game.load.image('monster1','assets/images/1.png');
    game.load.image('rockB','assets/images/rock.png');
    game.load.image('background','assets/images/background.png');
    game.load.image('greenRock','assets/images/green_rock.png');
    game.load.image('slime','assets/images/slime-monster.png');
    game.load.spritesheet('hero','assets/images/Imported piskel(1).png',84,100);
    game.load.image('square1','assets/images/square1.png');
    game.load.image('square2','assets/images/square2.png');
    game.load.image('square2','assets/images/graveyard2.png');
    game.load.image('square2','assets/images/graveyard1.png');
    game.load.image('square3','assets/images/square3.png');
    game.load.image('square4','assets/images/square4.png');
    game.load.image('brownMonster','assets/images/walkbrown1.png');
    //game.load.image('front','assets/images/front4.png');
    game.load.audio('music1',['assets/audio/epic loop.mp3']);
    game.load.spritesheet('scream1','assets/images/Scream1.png',140,180);
    
}

function create(){
    music1 = game.add.audio('music1');
    //music1.play();
    background = game.add.tileSprite(0,0,3072,1536,'background');
    //front=game.add.tileSprite(0,0,800,800,'front');
    monster1 = game.add.sprite(580,98,'monster1'); //monstro pendurado
    monster2 = game.add.sprite(940,225,'monster1');
    slime = game.add.sprite(495,276,'slime'); //monstro grande
    slime1 = game.add.sprite(1630,166,'slime');
    slime2 = game.add.sprite(1780,166,'slime');
    slime2.scale.setTo(0.15);
    slime1.scale.setTo(0.15);
    slime.scale.setTo(0.15);
    //front.scale.setTo(5);
    monster1.angle = 180;
    monster1.scale.setTo(0.05);
    monster2.scale.setTo(0.05);
    game.world.setBounds(0, 0, 3072, 1536);
    hero = game.add.sprite(10,220,'hero');
    scream1 = game.add.sprite(100,100,'scream1');
    square1 = game.add.sprite(100,228,'square1');
    square2 = game.add.sprite(100,200,'square2');
    square11 = game.add.sprite(2320,136,'square1');
    square22 = game.add.sprite(2350,136,'square2');
    square111 = game.add.sprite(1300,232,'square1');
    square1111 = game.add.sprite(1340,232,'square1');
    square222 = game.add.sprite(1320,232,'square2');
    hero.animations.add('walk',[0,1,2,3,4,5],8,false);
    hero.animations.add('jumpUp',[7],2,false);
    hero.animations.add('jumpDown',[8],2,false);
    scream1.animations.add('scream1',[1,2,3,4,0],8,false);
    scream1.scale.setTo(0.3);
    square1.scale.setTo(0.05);
    square2.scale.setTo(0.05);
    square11.scale.setTo(0.05);
    square22.scale.setTo(0.05);
    square111.scale.setTo(0.04);
    square222.scale.setTo(0.04);
    square1111.scale.setTo(0.04);
    //background.scale.setTo(0.2);
    hero.scale.setTo(0.5);
    hero.anchor.setTo(0.5);
    rockB = game.add.sprite(0,0,'rockB');
    rockB.visible = false;
    scream1.visible = false;
    rockB.scale.setTo(0.25);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(hero);
    game.physics.arcade.enable(slime);
    game.physics.arcade.enable(slime1);
    game.physics.arcade.enable(slime2);
    game.physics.arcade.enable(square1);
    game.physics.arcade.enable(square11);
    game.physics.arcade.enable(square111);
    game.physics.arcade.enable(square1111);
    game.physics.arcade.enable(monster1);
    game.physics.arcade.enable(monster2);
    game.physics.arcade.enable(square2);
    game.physics.arcade.enable(square22);
    game.physics.arcade.enable(square222);
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.arcade.enable(rockB);
    hero.body.gravity.y = 3400;
    
    createFloor();
    game.camera.follow(hero);
    //square1.body.enable=true;
    //square1.body.immovable = true;
    //square1.body.moves = false;
    
    
    
   
}





function update(){
    game.physics.arcade.overlap(hero,slime,null,kill);
    game.physics.arcade.overlap(hero,slime1,null,kill);
    game.physics.arcade.overlap(hero,slime2,null,kill);
    game.physics.arcade.overlap(hero,monster1,null,kill);
    game.physics.arcade.overlap(hero,monster2,null,kill);
    //game.physics.arcade.overlap(hero,square1,null,kill);
    //game.physics.arcade.overlap(hero,square2,null,kill);
    game.physics.arcade.overlap(hero,square11,null,kill);
    game.physics.arcade.overlap(hero,square111,null,kill);
    game.physics.arcade.overlap(hero,square1111,null,kill);
    game.physics.arcade.overlap(hero,square22,null,kill);
    game.physics.arcade.overlap(hero,square222,null,kill);
    game.physics.arcade.collide(hero,rockB);
    rockB.setAll('body.immovable',true);
    hero.animations.play('walk');
    
      hero.body.velocity.x = 300; 
        if(cursors.up.isDown && hero.body.touching.down){
            
                scream1.animations.play('scream1');
                scream1.visible = true;
            
            hero.body.velocity.y = -800;
            hero.animations.play('jumpUp'); 
            game.time.events.add(Phaser.Timer.SECOND /2, function(){
            scream1.visible = false;
                
            });
            
            
        }
        if(scream1.visible==true){
                scream1.y = hero.y-55;
                scream1.x = hero.x+15;
        }
    
}
function kill(s1,s2){
    s1.kill();
    s1.reset(10,220);
    //music1.restart();
    
}
function createFloor(){    
    rockB = game.add.group();
    rockB.enableBody = true;
    rockB.create(0,250,'rockB');
    rockB.create(45,250,'rockB');
    rockB.create(90,250,'rockB');
    rockB.create(135,250,'rockB');
    rockB.create(180,250,'rockB');
    rockB.create(225,250,'rockB');
    rockB.create(270,250,'rockB');
    rockB.create(315,250,'rockB');
    rockB.create(360,250,'rockB');
    rockB.create(405,250,'rockB');
    rockB.create(450,360,'rockB');
    rockB.create(495,360,'rockB');
    rockB.create(540,360,'rockB');
    rockB.create(585,360,'rockB');
    rockB.create(550,20,'rockB');

    rockB.create(550,180,'rockB');
    rockB.create(405,295,'rockB');
    rockB.create(405,340,'rockB');
    rockB.create(632,295,'rockB');
    rockB.create(632,340,'rockB');
    
    rockB.create(632,250,'rockB');
    rockB.create(677,250,'rockB');
    rockB.create(722,250,'rockB');
    rockB.create(767,160,'rockB');
    rockB.create(812,160,'rockB');
    rockB.create(920,250,'rockB');
    rockB.create(965,250,'rockB');
    rockB.create(1010,250,'rockB');
    rockB.create(1055,250,'rockB');
    rockB.create(1100,250,'rockB');
    rockB.create(1145,250,'rockB');
    rockB.create(1190,250,'rockB');
    rockB.create(1235,250,'rockB');
    rockB.create(1280,250,'rockB');
    
    rockB.create(1325,250,'rockB');
    rockB.create(1370,250,'rockB');
    rockB.create(1415,250,'rockB');
    rockB.create(1460,250,'rockB');
    rockB.create(1505,250,'rockB');
    
    rockB.create(1583,160,'rockB');
    rockB.create(1715,100,'rockB');
    rockB.create(1625,250,'rockB');
    rockB.create(1670,250,'rockB');
    rockB.create(1715,250,'rockB');
    rockB.create(1760,250,'rockB');
    rockB.create(1805,250,'rockB');
    
    rockB.create(1850,250,'rockB');
    rockB.create(1895,250,'rockB');
    rockB.create(1940,250,'rockB');
    rockB.create(1985,250,'rockB');
    rockB.create(2030,250,'rockB');
    rockB.create(2075,250,'rockB');
    rockB.create(2120,250,'rockB');
    rockB.create(2165,250,'rockB');
    rockB.create(2210,250,'rockB');
    rockB.create(2255,160,'rockB');
    rockB.create(2300,160,'rockB');
    rockB.create(2345,160,'rockB');
    rockB.create(2390,160,'rockB');
    rockB.create(2435,250,'rockB');
    rockB.create(2480,250,'rockB');
    rockB.create(2525,250,'rockB');
    rockB.create(2570,250,'rockB');
    rockB.create(2615,250,'rockB');
    rockB.create(2660,250,'rockB');
    rockB.create(2705,250,'rockB');
    rockB.create(2750,250,'rockB');
    rockB.create(2795,250,'rockB');
    rockB.create(2840,250,'rockB');
    rockB.create(2885,250,'rockB');
    rockB.create(2930,250,'rockB');
    rockB.create(2975,250,'rockB');
    rockB.create(3020,250,'rockB');
  
}


 
    




function render() {

   game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(hero, 32, 500);

}