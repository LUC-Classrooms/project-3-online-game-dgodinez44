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
  background(170, 210, 230);
  textAlign(CENTER);
  textSize(30);
  fill("white");
  text("THE DUCK GAME!", 300, 250);
  textSize(16);
  text("GOAL: EAT ALL THE GRAPES!!", 300, 275);
  textSize(12);
  text("(click the mouse to continue)", 300, 300);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(170, 210, 230); //light blue background
  fill(0, 0, 200)
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

  textSize(18);
  text("ICE FRESH", 500, 230);
  text("LEMONADE", 500, 330);
  pop();

  player1.display();
  
  textAlign(LEFT);
  text("Time Remaining: " + (gameTimer.time - Math.trunc(gameTimer.elapsedTime))/1000, 20, 60);
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
  background(170, 210, 230); //light blue background
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(30);
  text("Game Over!", width / 2, height / 2);
  textSize(20);
  text("Grapes Eaten: " + score, width/2, 250);
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
