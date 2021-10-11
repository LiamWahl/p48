var player, playerImage, playerImage2;
var sceneImage;
var backgroundImage
var monster1, monster1Image;
var monster2, monsterImage2;
var arrow, arrowImage;
var arrow2, arrowImage2;
var monsterGroup;
var gameState = "play";
var score = 0;
var lives = 3;
var restart, restartImg;


function preload(){
  sceneImage = loadImage("scene1.jpg");
  playerImage = loadImage("player1-removebg-preview.png");
  playerImage2 = loadImage("player2-removebg-preview (1).png");
  arrowImage = loadImage("arrow-removebg-preview.png");
  arrowImage2 = loadImage("arrow2-removebg-preview.png");
  monster1Image = loadImage("monster-removebg-preview.png");
  monsterImage2 = loadImage("monster2-removebg-preview.png");
  backgroundImage = loadImage("background.jfif");
  restartImg = loadImage("restart-removebg-preview.png");
}



function setup() {
  createCanvas(1000, 400);

  player = createSprite(500,310)
  player.addImage(playerImage);
  player.scale = .2;

  monsterGroup = createGroup();
  arrowGroup = createGroup();
  arrow2Group = createGroup();

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    restart.scale = .5;
    restart.visible = false; 

    //replay = createButton('Replay');
    //replay.position(900,50);
    
    
}

function draw() {
  background(backgroundImage);
  fill("lime");
  textSize(20);
  text("Score : " + score, 50,70);
  text("Lives : " + lives, 50,50);
 

  if (gameState === "play"){

  if(keyIsDown(RIGHT_ARROW)){
    player.addImage(playerImage);
  }

  if(keyIsDown(LEFT_ARROW)){
    player.addImage(playerImage2);
  }


  if(keyWentUp(RIGHT_ARROW)){
    rightArrow();
    
  }

  if(keyWentUp(LEFT_ARROW)){
    leftArrow();
    
  }
  spawnMonster();

  
  if(monsterGroup.collide(player)){
    gameState = "reset";

  }

  

   if(monsterGroup.isTouching(arrowGroup)){
 
    monsterGroup[0].destroy();
    arrowGroup[0].destroy();
    score = score + 100;
   }

  
   if(monsterGroup.isTouching(arrow2Group)){
    
    monsterGroup[0].destroy();
    arrow2Group[0].destroy();
    score = score + 100;
      }

      if(lives === 0){
        gameState = "end";
        player.remove();
    
      }

      drawSprites();
  
}

if (gameState === "reset"){
 // player.remove();
 fill("yellow");
 textSize(40);
 text ("LIFE LOST", 450,200);
  monsterGroup[0].destroy();
  
  lives = lives - 1;
  gameState = "play";
  }
  
}

if (gameState === "end"){
  background(0);
  fill("red");
  stroke("maroon");
  textSize(40);
  text("You Failed", width/2-100, height/2);

 restart.visible = true;
 //if (mousePressedOver(restart)){
 // gameState = "play";

//}


}


  // function desTroy(weap,targ){
  //  monsterGroup[i].destroy(i);
  //  arrow.destroy(); 
  // }

  function reset(){
    lives = lives - 1;
    gameState = "play";  
    
    
  }

 function rightArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage2);
  //arrow.x = 520;
  arrow.y=player.y + 10;
  arrow.x = player.x+30;
 // arrow.velocityX = 4;
 // arrow.lifetime = 100;
  arrow.scale = 0.1;
  arrow.velocityX= 10;

  arrowGroup.add(arrow);
}

function leftArrow() {
  var arrow2= createSprite(100, 100, 60, 10);
  arrow2.addImage(arrowImage);
  //arrow.x = 520;
  arrow2.y=player.y +10;
  arrow2.x = player.x-30;
 // arrow.velocityX = 4;
 // arrow.lifetime = 100;
  arrow2.scale = 0.1;
  arrow2.velocityX= -10

  arrow2Group.add(arrow2);

}



function spawnMonster() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   
    var rand = Math.round(random(1,2));
    if (rand === 1){
      monster = createSprite(width,320,40,10);
      monster.addImage(monster1Image);
      monster.velocityX = -3;
     
    }
    else if (rand === 2){
      monster = createSprite(0,320,40,10);
      monster.addImage(monsterImage2);
      monster.velocityX = 3; 
      
    }
   
    monster.scale = 0.6;
    monster.y = player.y+5;
    //monster1.velocityX = -3;
    monsterGroup.add(monster);
    
    
    
    }
}






