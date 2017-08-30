//*kunai só apertando x uma vez!
//*tirar deslizamento
//*implementar morte ninja e/ou game over
//*dano touch
//*implementar morte dos zumbis
//*audio
//*implementar numero de kunai?
//*implementar tempo necessário pra matar?
//implementar toque
//*implementar + zumbis + aparições
//*implementar inicio
//*corrigir bugs
//*buttons*loader*demonscene*weapons(asteroids)


var game=new Phaser.Game(1000, 571, Phaser.AUTO, 'jogo', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('background','assets/images/background.png');    
    game.load.spritesheet('ground','assets/images/ground.png');       
    game.load.spritesheet('plataform', 'assets/images/plataform.png'); 
    game.load.spritesheet('ninja' ,'assets/images/ninja.png', 536, 489, 42); //495
    game.load.spritesheet('zumbi' ,'assets/images/zumbi.png', 536, 491, 42); //495
    game.load.spritesheet('porta' ,'assets/images/porta.png', 280, 464, 2);     
    game.load.spritesheet('frutas','assets/images/frutas.png',32,32);
    game.load.spritesheet('kunai','assets/images/Kunai.png');
    game.load.spritesheet('gun','assets/images/gun.png');
    game.load.spritesheet('fire','assets/images/fire.png', 172, 139, 5);
    game.load.spritesheet('jelly','assets/images/jelly.png', 346, 329);
    
     game.load.audio('comer', 'assets/audio/comer.mp3');
     game.load.audio('end', 'assets/audio/end.mp3');
     game.load.audio('gritos', 'assets/audio/gritos.mp3');
     game.load.audio('kunai', 'assets/audio/kunai.mp3');
     game.load.audio('kunai_drop', 'assets/audio/kunai_drop.mp3');
     game.load.audio('menu', 'assets/audio/menu.mp3');
     game.load.audio('morrer', 'assets/audio/morrer.mp3');
     game.load.audio('playing', 'assets/audio/playing.mp3');
     game.load.audio('pulo', 'assets/audio/pulo.mp3');
     game.load.audio('shot', 'assets/audio/shot.mp3');
     game.load.audio('spray', 'assets/audio/spray.mp3');
     game.load.audio('zumbi', 'assets/audio/zumbi.mp3');
     game.load.audio('zumbi_die', 'assets/audio/zumbi_die.mp3');
     game.load.audio('zumbi_eat', 'assets/audio/zumbi_eat.mp3');
        
}


function create(){
    game.camera.flash(0xffffff, 50);
    ninjavivo=true;
    score=0;
    life=100;
    
    over= game.add.text(game.world.centerX, game.world.centerY, '         ', { font: '36px Arial', fill: '#ffffff' }); //score
    over.fixedToCamera = true;
    
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL; 
    game.scale.pageAlignHorizontally= true;
    game.scale.pageAlignVertically= true;  
    
    game.stage.backgroundColor = '#1A1D1E';
    
    game.add.audio('comer');
    game.add.audio('end');
    game.add.audio('gritos');
    game.add.audio('kunai');
    game.add.audio('kunai_drop');
    game.add.audio('menu');
    game.add.audio('morrer');
    game.add.audio('playing');
    game.add.audio('pulo');
    game.add.audio('shot');
    game.add.audio('spray');
    game.add.audio('zumbi');
    game.add.audio('zumbi_die');
    game.add.audio('zumbi_eat');    
//    music= game.add.audio('music', 0.7, true, true);      
//    music.play();    
// **audio.play('asdasasd');
//    efeito= game.add.audio('efeito');
//  nome, volume, repetição,
    
    background= game.add.tileSprite(-500,-100, 2000,1143,'background');
    game.world.setBounds(-500, -580, 2000, 1143); 
    
       
    candy= game.add.group();        //grupo das frutas
    candy.scale.setTo(1.3);
    
    
    porta1 = game.add.sprite(-500,305, 'porta');    //add portas
    porta1.scale.setTo(.5);
    porta2 = game.add.sprite(1360,305, 'porta');  
    porta2.scale.setTo(.5);
    
    
    plataform= game.add.sprite(210,219,'plataform');  //add plataformas
    plataform.scale.setTo(.45);    
    plat= game.add.image(210, 210, 'plataform');
    plat.scale.setTo(.45);
   
    
    ground= game.add.sprite(-505,510,'ground');     //add solo
    game.add.sprite(-505,503,'ground');    
    
    jelly1= game.add.sprite(260,175,'jelly');   //add geléias monstro
    jelly1.anchor.setTo(.5);
    jelly2= game.add.sprite(725,175,'jelly');
    jelly2.anchor.setTo(.5);
    jelly1.scale.setTo(.25);
    jelly2.scale.setTo(.25); 
    
    
    //animação jelly
    anim1 = jelly1.animations.add('anim', [11, 11, 17, 11, 11, 11, 17, 11, 11, 11, 17, 11, 17],1.1, true);
    anim2 =jelly2.animations.add('anim', [11, 17, 11, 11, 17, 11, 17, 11, 11, 11, 17], 1.2, true);
    anim1.play();
    anim2.play();
      
    ninja= game.add.sprite(game.world.centerX,300,'ninja');      //add ninja
    ninja.anchor.setTo(.5);
    ninja.scale.setTo(.3);    
    ninja.animations.add('anim', [1, 2, 3, 42, 43, 44, 45 , 46, 47], 7 , false); 
    ninja.animations.add('run', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, false);
    ninja.animations.add('jump', [4, 5, 6, 7, 8, 9, 10, 11, 12, 13] , 10, false); 
    ninja.animations.add('atack', [32, 33, 34, 35, 36, 37, 38, 39, 40] , 9, false); 
    //ninja.animations.add('die', [25, 26, 27, 28, 29, 30, 31] , 7, false);    zumbi frame 8
    
    ninja.animations.play('anim');
    
    
    
    
    porta1.animations.add('porta', [1, 0], 1, false);   //animação das portas
    porta2.animations.add('porta', [1, 0], 1, false);

  
    game.physics.startSystem(Phaser.Physics.ARCADE);    //física     
    game.physics.arcade.enable(ninja);
    ninja.body.gravity.y=2000;
    ninja.body.collideWorldBounds= true;
    
    game.physics.arcade.enable(jelly1);
    game.physics.arcade.enable(jelly2);
    jelly1.body.immovable=true;
    jelly2.body.immovable=true;
    
    kunai= game.add.sprite(180,-1000,'kunai');    
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);      
    
    /*
    enemies= game.add.group();        //grupo zumbis
    enemies.createMultiple(10, 'zumbi');
    game.physics.arcade.enable(enemies);
    enemis.setAll('body.gravity.y',2000);
    */
    
  
           
    zumbi= game.add.sprite(-2000,-2000,'zumbi');      //add zumbis
    zumbi.anchor.setTo(.5);
    zumbi.scale.setTo(.3);
    game.physics.arcade.enable(zumbi);
    zumbi.body.gravity.y=2000;
    zumbi.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    walk1= zumbi.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
    
    zumbi2= game.add.sprite(-2500,-2500,'zumbi');      
    zumbi2.anchor.setTo(.5);
    zumbi2.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi2);
    zumbi2.body.gravity.y=2000;
    zumbi2.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    walk2= zumbi2.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi2.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
    
    zumbi3= game.add.sprite(-2500,-2500,'zumbi');      
    zumbi3.anchor.setTo(.5);
    zumbi3.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi3);
    zumbi3.body.gravity.y=2000;
    zumbi3.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    walk3= zumbi3.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi3.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
    
    zumbi4= game.add.sprite(-2500,-2500,'zumbi');      
    zumbi4.anchor.setTo(.5);
    zumbi4.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi4);
    zumbi4.body.gravity.y=2000;
    zumbi4.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    walk4= zumbi4.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi4.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
  
    
                                                 
    gun1= game.add.sprite(-730,-150,'gun');    //add armas
    gun2= game.add.sprite(1728,-150,'gun');
    gun2.scale.x=-1;
    
    fire= game.add.sprite(-1000,-1000, 'fire');
    fire.scale.setTo(.5);
    game.physics.arcade.enable(fire);  
    fire.animations.add('fire', [0, 1, 2, 3, 4] , 5, true); 

    game.physics.arcade.enable(plataform);         
    plataform.body.immovable= true;
    
    game.physics.arcade.enable(ground);         
    ground.body.immovable= true;
    
      
    cursors= game.input.keyboard.createCursorKeys();    //cursor
    
    addCandy();     //dropa "candy"
    openDoor();     //dropa "zumbi"
    
    game.time.events.loop(92400, addCandy); //92400
    game.time.events.loop(8800, openDoor); // 17600 
    game.time.events.loop(17600, openDoor1); // 35200
    game.time.events.loop(13200, tiro); //13200
        
    game.camera.follow(ninja, Phaser.Camera.FOLLOW_PLATFORMER);       //camera segue ninja
    
    scoreLabel = game.add.text(40, 40, 'Score: 0 ', { font: '26px Arial', fill: '#00cc66' }); //score
    scoreLabel.fixedToCamera = true;
    lifeLabel = game.add.text(860, 40, 'Life: 100 ', { font: '26px Arial', fill: '#00cc66' }); //vida
    lifeLabel.fixedToCamera = true;
    
//    kunais = game.add.text(200, 40, 'x 20 ', { font: '24px Arial', fill: '#00cc66' });
//    kunais.fixedToCamera = true;
    
    
}


function update(){
    
 
    
    // colisão
    game.physics.arcade.collide(ninja, ground); 
  //  game.physics.arcade.collide(ninja, enemies);     
    game.physics.arcade.collide(zumbi, ground);   
    game.physics.arcade.collide(zumbi2, ground);  
    game.physics.arcade.collide(zumbi3, ground);   
    game.physics.arcade.collide(zumbi4, ground); 
    game.physics.arcade.overlap(ninja, jelly1, null, dano); 
    game.physics.arcade.overlap(ninja, jelly2, null, dano); 
//    game.physics.arcade.overlap(ninja, zumbi, null, danoTouZu); 
//    game.physics.arcade.overlap(ninja, zumbi2, null, danoTouZu); 
    game.physics.arcade.collide(ninja, plataform); 
    game.physics.arcade.collide(candy); 
    game.physics.arcade.collide(candy, plataform); 
    game.physics.arcade.overlap(ninja, fire, null, fired);
    game.physics.arcade.overlap(zumbi, kunai, null, eMorreu);
    game.physics.arcade.overlap(zumbi2, kunai, null, eMorreu2);
    game.physics.arcade.overlap(zumbi3, kunai, null, eMorreu3);
    game.physics.arcade.overlap(zumbi4, kunai, null, eMorreu4);
  //  game.physics.arcade.overlap(enemy, kunai, null, eMorreu4);
    game.physics.arcade.overlap(ninja, candy, null, eat);   //collide ou overlap?
    
          
//if(ninjavivo){  ***************************************************
   if(cursors){       
    if(game.input.keyboard.isDown(Phaser.Keyboard.X)){  //atira kunai //||ninja.animations.currentAnim=='atack'
//        flag2=1;
        ninja.animations.play('atack');
        jogaKunai();
    }else        
       if(!ninja.body.touching.down) {   //animação de pulo
            ninja.animations.play('jump');
            if(cursors.left.isDown&&background.x<=-1){
                ninja.body.velocity.x= -750;
                 ninja.scale.x=-0.3;
            }else{
                if(cursors.right.isDown&&background.x>-1000){ //ir para direita
                    ninja.body.velocity.x= 750; 
                    ninja.scale.x=0.3;
                }
            }       
       }else
        if(cursors.left.isDown&&background.x<=-1){  //ir para esquerda
            ninja.body.velocity.x= -750;
            ninja.scale.x=-0.3;
            ninja.animations.play('run');
        }else if(cursors.right.isDown&&background.x>-1000){ //ir para direita
                ninja.body.velocity.x= 750; 
                ninja.scale.x=0.3;
                ninja.animations.play('run');
            }else {
                //if(ninja.animations.currentAnim!='atack')
                //if (ninja.animations.isFinished){
                    ninja.body.velocity.x=0;
                    ninja.animations.play('anim');  
              //  }
            }        
        if(cursors.up.isDown&&ninja.body.touching.down){
            ninja.body.velocity.y= -1350;   //1270           
        } 
//    else
//          if(cursors.down.isDown&&ninja.body.touching.down)
//                ninja.frame= 24;
 
    }//else{              
//               ninja.animations.play('anim');
//            }
            
    if((zumbi.y-ninja.y)<=1){           //zumbis seguindo ninja
        if(ninja.x>(zumbi.x+57)){
            zumbi.body.velocity.x=70;
            zumbi.scale.x=.3;
            zumbi.animations.play('walk');
        }else
            if(ninja.x<(zumbi.x-57)){
                zumbi.body.velocity.x=-70;
                zumbi.scale.x=-.3;
                zumbi.animations.play('walk');
            }else{
                zumbi.body.velocity.x=0;
                zumbi.animations.play('atack'); 
                if(zumbi.animations.currentAnim.frame==3) danoZumbi();
            }
    }else{
        zumbi.body.velocity.x=0;
        zumbi.animations.play('parado'); 
    }
       
    
    if((zumbi2.y-ninja.y)<=1){
        if(ninja.x>(zumbi2.x+57)){
            zumbi2.body.velocity.x=70;
            zumbi2.scale.x=.3;
            zumbi2.animations.play('walk');
        }else
            if(ninja.x<(zumbi2.x-57)){
                zumbi2.body.velocity.x=-70;
                zumbi2.scale.x=-.3;
                zumbi2.animations.play('walk');
            }else{
                zumbi2.body.velocity.x=0;
                zumbi2.animations.play('atack'); 
                if(zumbi2.animations.currentAnim.frame==3) danoZumbi();
            }
    }else{
        zumbi2.body.velocity.x=0;
        zumbi2.animations.play('parado'); 
    }
    
     if((zumbi3.y-ninja.y)<=1){
        if(ninja.x>(zumbi3.x+57)){
            zumbi3.body.velocity.x=70;
            zumbi3.scale.x=.3;
            zumbi3.animations.play('walk');
        }else
            if(ninja.x<(zumbi3.x-57)){
                zumbi3.body.velocity.x=-70;
                zumbi3.scale.x=-.3;
                zumbi3.animations.play('walk');
            }else{
                zumbi3.body.velocity.x=0;
                zumbi3.animations.play('atack'); 
                if(zumbi3.animations.currentAnim.frame==3) danoZumbi();
            }
    }else{
        zumbi3.body.velocity.x=0;
        zumbi3.animations.play('parado'); 
    }
    
    
     if((zumbi4.y-ninja.y)<=1){
        if(ninja.x>(zumbi4.x+57)){
            zumbi4.body.velocity.x=70;
            zumbi4.scale.x=.3;
            zumbi4.animations.play('walk');
        }else
            if(ninja.x<(zumbi4.x-57)){
                zumbi4.body.velocity.x=-70;
                zumbi4.scale.x=-.3;
                zumbi4.animations.play('walk');
            }else{
                zumbi4.body.velocity.x=0;
                zumbi4.animations.play('atack'); 
                if(zumbi4.animations.currentAnim.frame==3) danoZumbi();
            }
    }else{
        zumbi4.body.velocity.x=0;
        zumbi4.animations.play('parado'); 
    }
        
//   if(!ninja.body.touching.down)    //********************************************
//        //ninja.frame=9;
//    if(flag2==1){
//        ninja.animations.play('atack');
//        jogaKunai();
//    }
    
  //  if()

    if(!life) morre();
    
   
//  }else{
//      game.stage.backgroundColor = '#000000';***********************************************
//  }
    
}


score=0;
life=100;
flag= 0;
flag1=0;
flag2=0;
flag3=0;
ninjavivo = true;

function addCandy(){
    candy= game.add.sprite(485,100, 'frutas', 36);    //190, 100
    game.physics.arcade.enable(candy);
    candy.body.gravity.y=2000;
}


function eat(){
    candy.kill();
    life+=50;
    if (life>=150) life=150;
    lifeLabel.text= 'Life: '+Math.floor(life) + ' ';    
}

function openDoor(){
   /* enemy = enemies.getFirstDead();
    if (!enemy) return;
     if(enemies.isAlive){
        enemies.forEach(moveEnemy);
    }
    
    enemy.scale.setTo(.3);
    enemy.anchor.setTo(.5);
    enemy.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    enemy.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    enemy.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false);
    */
   
    if(flag==0)
    {
        porta1.animations.play('porta');
        addZumbi1();
        flag=1;
    }
    else
    {
        porta2.animations.play('porta'); 
        addZumbi2();
        flag=0;
    }
}

function openDoor1(){
    if(flag3==0)
    {
        porta1.animations.play('porta');
        addZumbi3();
        flag3=1;
    }
    else
    {
        porta2.animations.play('porta'); 
        addZumbi4();
        flag3=0;
    }
}


function tiro(){
    if(flag1==0)
    {   
        fire.scale.x=0.5;
        fire.x=-430;
        fire.y=100;  
        fire.body.velocity.x=800;
        fire.animations.play('fire'); 
        flag1=1;
    }
    else
    {
        fire.scale.x=-0.5;
        fire.x=1431;
        fire.y=100;  
        fire.body.velocity.x=-800; //500
        fire.animations.play('fire'); 
        flag1=0;
    }
}

function jogaKunai(){
    if(ninja.scale.x>0){    
        if(ninja.animations.currentAnim.frame==34){
            kunai.body.velocity.x=2000;
            kunai.angle= 90;
            kunai.x=ninja.x+60;
            kunai.y=ninja.y+20;
           
        }
    }else{
       if(ninja.animations.currentAnim.frame==34){
            kunai.body.velocity.x=-2000;
            kunai.angle= -90;
            kunai.x=ninja.x-60;
            kunai.y=ninja.y+20;            
      }         
    }
}

function fired(){
    fire.kill();
    game.camera.shake(0.01, 500);
    game.camera.flash(0xffffff, 500);
    life-=50;
    if (life<=0){
        life=0;
        //ninja.animations.frame=25;              //pararjogo
        //ninja.frame=25;                     //animação
    }
    lifeLabel.text= 'Life '+Math.floor(life)+ ' ';
    fire= game.add.sprite(-1000,-1000, 'fire');
    fire.scale.setTo(.5);
    game.physics.arcade.enable(fire); 
    fire.animations.add('fire', [0, 1, 2, 3, 4] , 5, true); 
}

function dano(){
    if(ninjavivo){
        life-=.02;
        game.camera.shake(0.01, 500);
        game.camera.flash(0xffffff, 500);
        if (life<=0){
            life=0;
            //ninja.animations.frame=25;              //pararjogo
            //ninja.frame=25;                     //animação
        }
        lifeLabel.text= 'Life: ' +Math.floor(life)+ ' ';  
    }
}

function danoZumbi(){
     if(ninjavivo){
        life-=2;
        game.camera.shake(0.01, 500);
        game.camera.flash(0xffffff, 500);
        if (life<=0){
            life=0;
            //ninja.animations.frame=25;              //pararjogo
            //ninja.frame=25;                     //animação
        }
        lifeLabel.text= 'Life: ' +Math.floor(life)+ ' '; 
    }
}

function addZumbi1(){
   // zumbi= enemies.create(-450,1150,'zumbi');
//    zumbi.animations.add('parado', [21, 22, 24, 25], 3 , false);     
//    zumbi.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
//    zumbi.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
    zumbi.x=-430;
    zumbi.y=250;
//    enemy.x=-430;
//    enemy.y=250;
}

function addZumbi2(){
    zumbi2.x=1430;
    zumbi2.y=250;
//    enemy.x=1430;
//    enemy.y=250;
}

function addZumbi3(){
    zumbi3.x=1430;
    zumbi3.y=250;
}

function addZumbi4(){
    zumbi4.x=1430;
    zumbi4.y=250;
}


function eMorreu(){
    zumbi.kill();
    kunai.kill();    
    score++;
    scoreLabel.text= 'Score: '+score+ ' ';
    
    kunai= game.add.sprite(180,-1000,'kunai');    //***************numero de kunais
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);  
    
    zumbi= game.add.sprite(-2000,-2000,'zumbi');      //ninja
    zumbi.anchor.setTo(.5);
    zumbi.scale.setTo(.3);
    game.physics.arcade.enable(zumbi);
    zumbi.body.gravity.y=2000;
    zumbi.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    zumbi.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false); 
 
}

function eMorreu2(){
    kunai.kill();
    zumbi2.kill();    
    score++;
    scoreLabel.text= 'Score: ' +score+ ' ';
    
    kunai= game.add.sprite(180,-1000,'kunai');    //***************numero de kunais
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);  
    
    zumbi2= game.add.sprite(-2500,-2500,'zumbi');      //ninja
    zumbi2.anchor.setTo(.5);
    zumbi2.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi2);
    zumbi2.body.gravity.y=2000;
    zumbi2.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    zumbi2.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi2.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false);
}

function eMorreu3(){
    kunai.kill();
    zumbi3.kill();    
    score++;
    scoreLabel.text= 'Score: ' +score+ ' ';
    
    kunai= game.add.sprite(180,-1000,'kunai');    //***************numero de kunais
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);  
    
    zumbi3= game.add.sprite(-2500,-2500,'zumbi');      //ninja
    zumbi3.anchor.setTo(.5);
    zumbi3.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi3);
    zumbi3.body.gravity.y=2000;
    zumbi3.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    zumbi3.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi3.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false);
}

function eMorreu4(){
    kunai.kill();
    zumbi4.kill();    
    score++;
    scoreLabel.text= 'Score: ' +score+ ' ';
    
    kunai= game.add.sprite(180,-1000,'kunai');    //***************numero de kunais
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);  
    
    zumbi4= game.add.sprite(-2500,-2500,'zumbi');      //ninja
    zumbi4.anchor.setTo(.5);
    zumbi4.scale.setTo(-.3,.3);
    game.physics.arcade.enable(zumbi4);
    zumbi4.body.gravity.y=2000;
    zumbi4.animations.add('parado', [21, 22, 24, 25], 3 , false);     
    zumbi4.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 10, false);
    zumbi4.animations.add('atack', [0, 1, 2 ,3 ,4 ,5 ,6 ,7] , 7, false);
}

/*
function eMorreu4(){
    kunai.kill();
    enemy.kill();    
    score++;
    scoreLabel.text= 'Score: ' +score+ ' ';
    
    kunai= game.add.sprite(180,-1000,'kunai');    //***************numero de kunais
    kunai.anchor.setTo(.5);
    kunai.angle= 90;
    kunai.scale.setTo(.35);
    game.physics.arcade.enable(kunai);  
    
  
}
*/

/*
function danoTouZu(s1, s2){
    if( (s2.animations.currentAnim==walk1) || (s2.animations.currentAnim==walk2)  ){
        life-=0.02;
        s2.frame=2;
        game.camera.shake(0.01, 500);
        game.camera.flash(0xffffff, 500);
        if (life<=0){
            life=0;
            //ninja.animations.frame=25;              //pararjogo
            //ninja.frame=25;                     //animação
        }
        lifeLabel.text= 'Life: ' +Math.floor(life)+ ' '; 
    }
}*/

function morre(){
    ninja.animations.stop();
    zumbi.animations.stop();
    zumbi2.animations.stop();
    zumbi.body.velocity.x=0;    
    zumbi2.body.velocity.x=0;    
    zumbi3.animations.stop();
    zumbi3.animations.stop();
    zumbi4.body.velocity.x=0;
    zumbi4.body.velocity.x=0;
    
    ninja.body.velocity.x=0;
    fire.kill();
    cursors=false;
    ninjavivo=false;
    ninja.frame=25;
    game.camera.fade(0x000000, 8000);
    game.camera.onFadeComplete.add(create);
    over= game.add.text(game.world.centerX, 300, 'GAME OVER', { font: '66px Arial', fill: '#ba3a3a' }); //score
    over.anchor.setTo(.5);
    over.fixedToCamera = true;
        
}
/*
function moveEnemy(){
     if((enemy.y-ninja.y)<=1){
        if(ninja.x>(enemy.x+57)){
            enemy.body.velocity.x=70;
            enemy.scale.x=.3;
            enemy.animations.play('walk');
        }else
            if(ninja.x<(enemy.x-57)){
                enemy.body.velocity.x=-70;
                enemy.scale.x=-.3;
                enemy.animations.play('walk');
            }else{
                enemy.body.velocity.x=0;
                enemy.animations.play('atack'); 
                if(enemy.animations.currentAnim.frame==3) danoZumbi();
            }
    }else{
        enemy.body.velocity.x=0;
        enemy.animations.play('parado'); 
    }
}
*/
