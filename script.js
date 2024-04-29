/**
 * Project 3 Final Version - 2D Web Game
 * Name: Denise Godinez
 * A duck game where the objective is to get the duck or the player to 
 * eat as many grapes as they can while avoiding the lemons. Grapes
 * score points and lemons deduct points. 
 */

var gameState = "splash";
var player1; // the player or in this case the duck
var gameTimer; // set amount of time the game runs 
var splashGrape; // a grape to preview on the splash screen
var gameOverLemon; // a lemon to preview on the gameOver screen
var dropTimerG; // regulate grape drops 
var dropTimerL; // regulate lemon drops
var grapes = new Array(0); // an empty array called "grapes"
var lemons = new Array(0); // an empty array called "lemons"
var score = 0; // keep track of points (starting at 0)

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);
  gameTimer = new Timer(30000); // 30 second timer 
  dropTimerG = new Timer(1000); // drop every second 
  dropTimerL = new Timer(3000); // drop every 3 seconds
  splashGrape = new Grape(width/2, height/3); // grape that is seen on the splash screen
  gameOverLemon = new Lemon(width/2, height/3); // lemon that is seen on the gameOver screen

}

function draw() {
  background(200);

  switch(gameState){
    case "splash":
      splash(); // go to "splash" screen
      break;
    case "play":
      play(); // go to the "play" screen
      break;
    case "gameOver":
      gameOver(); // go to the "game over" screen 
      break;
    default: 
    console.log("no match found - check your mousePressed() function!");
  }

}

function splash() {
  // this is what you would see when the game starts
  background(170, 210, 230);
  textAlign(CENTER);
  textSize(30);
  fill("white");
  text("THE DUCK GAME!", 300, 250);
  textSize(20);
  fill("green");
  text("GOAL: EAT ALL THE GRAPES!!", 300, 275);
  fill("red");
  text("AVOID THE LEMONS!!", 300, 300);
  textSize(12);
  fill("white");
  text("(click the mouse to continue)", 300, 320);
  splashGrape.display(); // display a spinning grape 
  splashGrape.spin();
}

function play() {
  // this is what you see when the game is running 
  background(170, 210, 230); //light blue background
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);

  push();
  fill("green");
  ellipse(300,400,650,150); // grass
  fill("brown");

  rect(450, 300, 100, 50); // the lemonade stand
  rect(450, 240, 15,60);
  rect(535, 240, 15, 60);
  rect(440, 200, 120, 50);

  rect(60, 260, 20, 100); // tree
  fill("green");
  ellipse(40, 250, 50, 50); // leaves
  ellipse(70, 230, 60, 60);
  ellipse(100, 250, 50, 50);
  ellipse(70, 250, 50, 50);

  fill("white");
  noStroke();
  // first cloud
  ellipse(100, 120, 100, 40); // bottom of cloud 
  ellipse(65, 110, 40,40); // left circle on cloud
  ellipse(100, 100, 50,50); // middle circle on cloud
  ellipse(130, 110, 40,40); // right circle on cloud
  // second cloud
  ellipse(300, 70, 100, 40); // bottom of cloud
  ellipse(265, 60, 40, 40); // left circle of cloud
  ellipse(300, 50, 50, 50); // middle circle of cloud 
  ellipse(330, 60, 40, 40); // right circle of cloud 
  // third cloud
  ellipse(500, 120, 100, 40); // bottom of cloud
  ellipse(465, 110, 40, 40); // left circle of cloud 
  ellipse(500, 100, 50, 50); // middle circle of cloud
  ellipse(530, 110, 40,40); // right circle of cloud 

  textSize(18); // text for the lemonade stand 
  text("ICE FRESH", 500, 230);
  text("LEMONADE", 500, 330);

  pop();

  player1.display(); // show the player on the screen 
  
  textAlign(LEFT);
  text("Time Remaining: " + (gameTimer.time - Math.trunc(gameTimer.elapsedTime))/1000, 20, 60);
  // show elapsed time in top left corner 
  text("Score: " + score, 20, 40);
  if(gameTimer.isFinished()){
    gameState = "gameOver";
  }
  if(dropTimerG.isFinished()){
    let p = new Grape(random(width), -40);
    // new grape, anywhere across the width of the canvas, but 40 px above the canvas
    grapes.push(p); // add object 'p' to the 'grapes' Array 
    dropTimerG.start(); // restart timer for next drop
  }
  if(dropTimerL.isFinished()){
    let q = new Lemon(random(width), -40); 
    // new lemon, anywhere across the width of the canvas, but 40 above the canvas
    lemons.push(q);
    dropTimerL.start(); // restart timer for next drop
  }
  for(let i = 0; i < grapes.length; i++){
    // for each element of the array, represented by 'i', do the following: 
    grapes[i].display(); // draw it on the canvas
    grapes[i].move(); // make it drop
    grapes[i].spin(); // make it rotate 

    if(grapes[i].y > height){
      // grape went below the canvas 
      grapes.splice(i,1); // remove from array 
      // remove 1 element from "grapes" at index 'i'
    }
    let d = dist(grapes[i].x, grapes[i].y, player1.x, player1.y);
    if(d < 50){
      // if it's within 50 pixels, do something! 
      grapes.splice(i, 1); // remove the grape from the array
      score++; // add 1 point!!
    }
  }

  for(let i = 0; i < lemons.length; i++){
    // for each element of the array, represented by 'i', do the following: 
    lemons[i].display(); // draw it on the canvas
    lemons[i].move(); // make it drop
    lemons[i].spin(); // make it rotate 

    if(lemons[i].y > height){
      // lemon went below the canvas 
      lemons.splice(i,1); // remove from array 
      // remove 1 element from "lemons" at index 'i'
    }
    let e = dist(lemons[i].x, lemons[i].y, player1.x, player1.y);
    if(e < 50){
      // if it's within 50 pixels, do something! 
      lemons.splice(i, 1); // remove the lemon from the array
      score--; // remove 1 point!!
    }
  }
}

function gameOver() {
  // this is what you see when the game ends
  background(170, 210, 230); //light blue background
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(30);
  text("Game Over!", width / 2, 250);
  textSize(20);
  fill("white"); 
  text("Grapes Eaten: " + score, width/2, 280);
  gameOverLemon.display(); // display spinning lemon
  gameOverLemon.spin();
}

function mousePressed() {
  
  console.log("click!");

  if(gameState == "splash"){
    gameState = "play"; // go to the play() screen
    gameTimer.start(); // starts the timer
    dropTimerG.start(); // start the drop timer for grapes 
    dropTimerL.start(); // start the drop timer for the lemons
    score = 0; // reset score to 0 at start of game 
  } // go to "play"
  else if(gameState == "play"){
    // gameState = "gameOver";
  } // go to "gameOver"
  else if(gameState == "gameOver"){
    gameState = "splash";
  } // go to "splash"
  console.log(gameState);
  
}

function keyPressed(){
  switch(keyCode){
    case LEFT_ARROW :
      console.log("left");
      player1.x -= 30; // move left 30 px
      //player1.angle = PI + HALF_PI; // point left
      if (player1.x < 0){
        player1.x = width;
      } // wrap to right
      break;
    case RIGHT_ARROW :
      console.log("right");
      player1.x += 30; // move right 30 px
      //player1.angle = HALF_PI; // point right
      if (player1.x > width){
        player1.x = 0; 
      } // wrap to left
      break;
    default :
      console.log("use the arrow keys to move player1");
  }

}
