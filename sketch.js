var PLAY = 1;
var END = 0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var backGround,groundImage,invisibleGround;
var h1,h2,hi,health;
var gameOver,over;
var eat,eats;
var gos,hs;
function preload(){
    monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyy = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 groundImage = loadImage("cartoon-jungle-background-tropical-landscape-260nw-538339654.webp")
  hi = loadImage("heart.png")
 
  gameOver=loadImage("game.png")
  eats=loadSound("147296__orginaljun__haphap.mp3")
  gos = loadSound("527606__tyeewhyee__tyeewhyee-game-over.mp3")
  hs =loadSound("get.wav")
}



function setup() {
  createCanvas(displayWidth,displayHeight);
   backGround = createSprite(10,100,900,10)
  backGround.addImage("moving",groundImage)
  backGround.scale  =10;
  backGround.velocityX = -4;
  backGround.x = backGround.width/2;
  console.log(backGround.x)
  
  over =createSprite(200,300,20,20)
  over.addImage("img",gameOver)
  over.scale = 0.5;
  monkey = createSprite(50,315,50,50)
  monkey.addAnimation("monkey",monkey_running)
  monkey.addAnimation("monkeyy",monkeyy)
  monkey.scale =0.10
 // monkey.debug = true
  monkey.setCollider("rectangle",0,0,80,500,45)
 invisibleGround = createSprite(400,390,900,10)
  invisibleGround.visible = false;
  
  h1 =createSprite(80,20,10,10);
  h1.addImage("heart1",hi)
  h1.scale = 0.100;
  h2 =createSprite(20,20,10,10);
  h2.addImage("heart2",hi)
  h2.scale = 0.100;
  foodGroup = new Group();
  obstacleGroup = new Group();
  score = 0
  health = 2
}


function draw() {
 // background ("red")
  if (gameState === PLAY){
  if(backGround.x<0){
    backGround.x = backGround.width/2;
    }
  if(keyDown("space")&&monkey.y >= 330) {
        monkey.velocityY = -20;
    }
     switch(score){
      case 10:monkey.scale=0.12
        break;
      case 20:monkey.scale =0.16
        break;
      case 30:monkey.scale =0.20
        break;
      case 40:monkey.scale =0.24
        break;
      case 50:monkey.scale =0.28
        break;

  }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6
   
    camera.position.x = monkey.x;
    camera.position.y = monkey.y;


    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score= score+2;
      eats.play();
}
  over.visible = false
    spawnBananas();
  spawnObstacles();
    monkeyLifetime();
   if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.10;
     health = health-1
     score = 0
     hs.play();
     obstacleGroup.destroyEach();
   }   
      
  }
  if(gameState === END){
    backGround.velocityX=0
    foodGroup .setVelocityXEach(0)
    obstacleGroup.destroyEach();
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.destroy();
  over.visible = true
    
  }
  if(mousePressedOver(over)){
    gameState=PLAY;
  }
  monkey.collide(invisibleGround)
  
  drawSprites(); 
  stroke ("black")
  textSize (20)
  fill("black")
  survivalTime = Math.ceil(frameRate()/60)
  text("survivalTime:" + score,100,50)
  
}
function spawnBananas(){
  if (frameCount%80===0){
  var banana = createSprite(400,200,20,20)
  banana.addImage("banana",bananaImage)
  banana.scale=0.15
  banana.velocityX=-(4+score/3)
  banana.lifetime = 100
    banana.y =Math.round(random(0,250))
    foodGroup.add(banana);
    
     
    }
  
}
function spawnObstacles(){
  if(frameCount%300 ===0){
    var obstacle = createSprite(400,380,30,30)
    obstacle.addImage("obs",obstaceImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -(4+score/15)
    obstacle.lifetime = 100
    obstacleGroup.add(obstacle)
  }
}
function monkeyLifetime(){
  if(health===2){
    h1.visible=true
    h2.visible=true
     
   

  
  }
   if(health===1){
    h1.visible=false
    h2.visible=true
     monkey.scale=0.10
    
    
    
  }
   if(health===0){
    h1.visible=false
    h2.visible=false
     gameState=END;
     monkey.velocityY = 0
     gos.play();
  
   }
  
   }


