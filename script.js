/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Denise Godinez
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash";
var player1;

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);

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

}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {
  
  console.log("click!");

  if(gameState == "splash"){
    gameState = "play";
  } // go to "play"
  else if(gameState == "play"){
    gameState = "gameOver";
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
      player1.angle = 0; // no rotation
      if (player1.y < 0){
        player1.y = height;
      } // wrap to bottom 
      break;
    case DOWN_ARROW :
      console.log("down");
      player1.y += 30; // move down 30 px
      player1.angle = PI; // point down (rotate 180 degrees)
      if (player1.y > height){
        player1.y = 0;
      } // wrap to top
      break;
    case LEFT_ARROW :
      console.log("left");
      player1.x -= 30; // move left 30 px
      player1.angle = PI + HALF_PI; // point left
      if (player1.x < 0){
        player1.x = width;
      } // wrap to right
      break;
    case RIGHT_ARROW :
      console.log("right");
      player1.x += 30; // move right 30 px
      player1.angle = HALF_PI; // point right
      if (player1.x > width){
        player1.x = 0; 
      } // wrap to left
      break;
    default :
      console.log("use the arrow keys to move player1");
  }

}
