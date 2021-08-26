var SpaceImg,Space;
var Rocket,RocketImg;
var ObstaclesGroup ,Obstacle1, Obstacle2,Obstacle3,Obstacle1Img,Obstacle2Img,Obstacle3Img;
var invisibleBlockGroup, invisibleBlock;
var gameover ,gameoverImg;
var gameState = "play"
var score;

function preload(){
SpaceImg = loadImage("space.png")    
RocketImg = loadImage("rocket1.png");
Obstacle1Img = loadImage("obstacle.png");
Obstacle2Img = loadImage("obstacle1.png");
Obstacle3Img = loadImage("obstacle2.png");
gameoverImg = loadImage("gameOver.png")
spaceSound = loadSound("spaceSound.mp3")
}

function setup() {
createCanvas(600,600);
spaceSound.loop();
Space = createSprite(300,300);
Space.addImage("space",SpaceImg);
Space.velocityY = 1;
Space.x = Space.width/2;

Rocket = createSprite(200,200,50,50);
Rocket.scale=0.5;
Rocket.addImage("rocket",RocketImg);

gameover = createSprite(300,100);
gameover.addImage(gameoverImg);
gameover.scale=0.5;
 
ObstacleGroup = new Group();
invisibleBlockGroup = new Group();

score = 0;

}

function draw() {
    background(0);
    text("score:"+ score,500,50);

    
if (gameState == "play"){

    gameover.visible = false;
    score.visible = true;

    Space.velocityY = -(4+3* score/100)
    score = score + Math.round(getFrameRate()/60);

    if(Space.x < 0){
        Space.x = Space.width/2;
    }

 if (keyDown("LEFT_ARROW")){
     Rocket.x = Rocket.x -3;
 }
 if (keyDown("RIGHT_ARROW")){
     Rocket.x = Rocket.x +3;
 }
 if(keyDown("space")){
     Rocket.velocityY = -10;
 }
 Rocket.velocityY = Rocket.velocityY + 0.8;

 

 
 spawnObstacles();

 if (ObstacleGroup.isTouching(Rocket)){
    Rocket.velocityY=0;
    gameState ="end"
}
if(invisibleBlockGroup.isTouching(Rocket)|| Rocket.y>600){
    Rocket.destroy();
    gameState ="end"
}

drawSprites();

}
if (gameState === "end"){
  gameover.visible = true;
    score=0;
}



}

function spawnObstacles(){
    if (frameCount % 600 === 0) {
        var Obstacle1 = createSprite(200,-50);
        var Obstacle2 = createSprite(200,30);
        var Obstacle3 = createSprite(200,70);
        var invisibleBlock = createSprite(200,50);
        invisibleBlock.width=Obstacle1.width;
        invisibleBlock.width=Obstacle2.width;
        invisibleBlock.width=Obstacle3.width;
        invisibleBlock.height = 2;
 
        Obstacle1.x = Math.round(random(120,400));
        Obstacle2.x = Math.round(random(120,400));
        Obstacle3.x = Math.round(random(120,400));
        invisibleBlock.x = Obstacle1.x;
        invisibleBlock.x = Obstacle2.x;
        invisibleBlock.x = Obstacle3.x;
 
        Obstacle1.addImage(Obstacle1Img);
        Obstacle2.addImage(Obstacle2Img);
        Obstacle3.addImage(Obstacle3Img);
 
        Obstacle1.velocityY = 1;
        Obstacle2.velocityY = 1;
        Obstacle3.velocityY = 1;
        invisibleBlock.velocityY = 1;
 
        Obstacle1.lifetime=800;
        Obstacle2.lifetime=800;
        Obstacle3.lifetime=800;
 
        ObstaclesGroup.add(Obstacle1);
        ObstaclesGroup.add(Obstacle2);
        ObstaclesGroup.add(Obstacle3);

        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);
    }
     
 } 
