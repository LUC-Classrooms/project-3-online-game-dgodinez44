/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Denise Godinez
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash";
var player1;
var gameTimer;
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops 
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0)

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);
  gameTimer = new Timer(30000); // 30 second timer 
  dropTimer = new Timer(1000); // drop every second 
  testBox = new Box(width/2, height/3); 

}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)

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
    console.log("no match found - check your mousePressed() function!")
  }

}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
  // player1.x = mouseX // this is if I want player1 to follow the mouse 
  // I will be using the arrow keys instead
  player1.display();
  
  textAlign(LEFT);
  text("Time Remaining: " + (gameTimer.time - Math.trunc(gameTimer.elapsedTime))/1000, 40, 100);
  // show elapsed time in top left corner 
  text("Score: " + score, 20, 40);
  if(gameTimer.isFinished()){
    gameState = "gameOver";
  }
  if(dropTimer.isFinished()){
    let p = new Box(random(width), -40);
    // new box, anywhere across the width of the canvas, but 40 px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array 
    dropTimer.start(); // restart timer for next drop
  }
  for(let i = 0; i < presents.length; i++){
    // for each element of the array, represented by 'i', do the following: 
    presents[i].display(); // draw it on the canvas
    presents[i].move(); // make it drop
    presents[i].spin(); // make it rotate 

    if(presents[i].y > height){
      // present went below the canvas 
      presents.splice(i,1); // remove from array 
      // remove 1 element from "presents" at index 'i'
      score--; // take away 1 point
    }
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if(d < 50){
      // if it's within 50 pixels, do something! 
      presents.splice(i, 1); // remove the present from the array
      score++; // add 1 point!!
    }
  }

}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your final score: " + score, width/2, height * 2/3);
}

function mousePressed() {
  
  console.log("click!");

  if(gameState == "splash"){
    gameState = "play"; // go to the play() screen
    gameTimer.start(); // starts the timer
    dropTimer.start(); // start the drop timer for presents 
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
    case UP_ARROW :
      console.log("up");
      player1.y -= 30; // move up 30 px
      //player1.angle = 0; // no rotation
      if (player1.y < 0){
        player1.y = height;
      } // wrap to bottom 
      break;
    case DOWN_ARROW :
      console.log("down");
      player1.y += 30; // move down 30 px
      //player1.angle = PI; // point down (rotate 180 degrees)
      if (player1.y > height){
        player1.y = 0;
      } // wrap to top
      break;
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
