var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var pinkG, yellowG, redG;
var pinkC, yellowC, redC;
var cycleBell;
var obstacleG, obstacle1, obstacle2, obstacle3;
var gameoverImg, gameover;
//var crashRed, crashYellow, crashPink;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  pinkC = loadAnimation("opponent1.png","opponent2.png");
  yellowC = loadAnimation("ygirl_m1.png","ygirl_m2.png");
  redC = loadAnimation("boy_m1.png","boy_m2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  cycleBell = loadSound("bell.mp3");
  
  gameoverImg = loadImage("gameOver.png");
  
  crashRed = loadAnimation("redOver.png");
  crashPink = loadAnimation("pinkOver.png");
  crashYellow = loadAnimation("yellowOver.png");
}

function setup(){
  
createCanvas(900,300);
  
//new groups
pinkG = new Group();
yellowG = new Group();
redG = new Group();
obstacleG = new Group();

// Moving background
path=createSprite(100,150);
path.addImage(pathImg);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
///mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.041;
   
//mainCyclist.setCollider("rectangle",0,0,1350,1400);
mainCyclist.setCollider("circle",0,0,650);
//mainCyclist.debug=true;
  
mainCyclist.addAnimation("riding", mainRacerImg1);
mainCyclist.addAnimation("crash", mainRacerImg2);
  
gameover = createSprite(450,150,20,20);
gameover.addImage(gameoverImg);
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,750,30);
  
  if (keyWentDown("space")){
    cycleBell.play();
  }
  
  if(gameState===PLAY){
  
   gameover.visible = false; 
  path.velocityX = -(2 + distance/500);
    
   mainCyclist.changeAnimation("riding", mainRacerImg1);
    
   mainCyclist.y = World.mouseY;
    
  distance = distance + Math.round(frameCount/400);
    
  var select_cyclist = Math.round(random(1,3));
  if (World.frameCount % 110 == 0) {
    if (select_cyclist == 1) {
      spawnpink();
    } else if (select_cyclist == 2) {
      spawnred();
    } else if (select_cyclist == 3) {
      spawnyellow();
    }
  }
  
  spawnObstacles();
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  } 
    
   //if (mainCyclist.isTouching(pinkG)){
     //pinkG.changeAnimation("crashp", crashPink)
   //} 
    
   if (mainCyclist.isTouching(obstacleG) || mainCyclist.isTouching(pinkG) || mainCyclist.isTouching(redG) || mainCyclist.isTouching(yellowG)){
     obstacleG.destroyEach();
     pinkG.destroyEach();
     redG.destroyEach();
     yellowG.destroyEach();
     gameState=END;
   } 
 }
  
  if (gameState===END){
    mainCyclist.changeAnimation("crash", mainRacerImg2);
    path.velocityX = 0;
    pinkG.destroyEach();
    redG.destroyEach();
    yellowG.destroyEach();
    
    gameover.visible = true;
    
    text("Press up arrow to restart the game.",290,210);
    
    restart();
  }

}

function spawnpink(){
  var pink = createSprite(910,Math.round(random(50,250)),15,15);
  pink.addAnimation("pinkCyclist", pinkC);
  //pink.addAnimation("crashp", crashPink);
  pink.velocityX=-(2 + distance/500);
  pink.scale = 0.04;
  pink.lifetime=475;
 
  pinkG.add(pink);
}

function spawnyellow(){
  var yellow = createSprite(910,Math.round(random(50,250)),15,15);
  yellow.addAnimation("yellowCyclist", yellowC);
  //yellow.addAnimation("crashy", crashYellow);
  yellow.velocityX=-(2 + distance/500);
  yellow.scale = 0.04;
  yellow.lifetime=475;
  yellowG.add(yellow);
}

function spawnred(){
  var red = createSprite(910,Math.round(random(50,250)),15,15);
  red.addAnimation("redCyclist", redC);
  //red.addAnimation("crashr", crashRed);
  red.velocityX=-(2 + distance/500);
  red.scale = 0.04;
  red.lifetime=475;
  redG.add(red);
}

function spawnObstacles(){
  if (frameCount % 250 === 0){
   var obstacle = createSprite(910,Math.round(random(50,250)),10,40);
   obstacle.velocityX=-(2 + distance/500);
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
             
    obstacle.scale = 0.055;
    obstacle.lifetime = 475;
    obstacleG.add(obstacle);
 }
}

function restart(){
  if (keyWentDown("up")){
    distance=0;
    gameState=PLAY;
  }
}
