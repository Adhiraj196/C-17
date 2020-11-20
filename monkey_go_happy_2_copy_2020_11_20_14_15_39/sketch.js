var PLAY=1;
var END;
var gameState=PLAY;

var monkey , monkeyrunning;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var gameover,gameoverImage
var background, backgroundImage,ground2;
var obstaclesGroup;
var counter=0;


function preload(){
    
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
  monkeyrunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  gameoverImage = loadImage("glitch-game-background_23-2148090006.jpg")

}



function setup() {
  background = createSprite(0,0,400,400);
  background.addImage(backgroundImage)
  background.scale = 1.2     
  
  
    ground2= createSprite(20,370,1000,20);
 
  ground2.visible = false;

  
 monkey = createSprite(50,318,20,50);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.11 ;

    gameover = createSprite(200,220);
  gameover.addImage(gameoverImage);
  gameover.scale=2
  gameover.visible = false;
  
 obstaclesGroup =createGroup();
bananaGroup=createGroup();
  
  score=0
}


function draw() {
  
  if(gameState===PLAY){
 
    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     }
  
    
     monkey.velocityY = monkey.velocityY + 0.8
  
  
  if( obstaclesGroup.isTouching(monkey)){ 
    
   obstaclesGroup.destroyEach();
    counter=counter+1;
 
  
    console.log(counter+" "+frameCount);
    monkey.scale=0.10;
    if(counter===2){
      gameState=END;
        
      console.log(counter+" "+frameCount);
    }
   }
   
    
    
  
    if(bananaGroup.isTouching(monkey)){
      
      score = score + 2;
      bananaGroup.destroyEach();
 
      switch(score){
        case 10:monkey.scale=0.12;
                break;
        case 20:monkey.scale=0.14;
                break;
        case 30:monkey.scale=0.16;
                break;
        case 40:monkey.scale=0.18;
                break;
        case 50:monkey.scale=0.20;
                break;
          default: break;
      }
    }
  }
  
  
  else if(gameState===END){
    counter=0
      gameover.visible = true;
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    background.velocityX=0
     obstaclesGroup.velocityX=0
   bananaGroup.velocityX=0
   
  }  
  

  
  monkey.collide(ground2);
  
  banana();
  Obstacles();
  
  drawSprites();
  
   stroke("yellow");
  textSize(20);
  fill("yellow")
  text("score: "+ score, 130,50);
          

}

function Obstacles(){
 if (frameCount % 300 === 0){
   var obstacles = createSprite(400,325,10,40);
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
  
   obstaclesGroup.add(obstacles);
   
 }
}
function banana(){
  if (frameCount % 80 === 0){
   var banana = createSprite(400,165,10,40);
    banana.y = Math.round(random(50,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    
    bananaGroup.add(banana);
    
}
}




