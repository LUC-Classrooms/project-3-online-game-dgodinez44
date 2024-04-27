function Player(tempX, tempY) {
  // properties
  this.x = tempX;
  this.y = tempY;
  this.diam = 50;
  this.angle = 0;

  this.display = function () {
    push(); // create a drawing layer
    translate(this.x, this.y); // move origin point
    rotate(this.angle); // player can rotate
    
    // Head
    strokeWeight(1); // Adjust strokeWeight to keep the stroke thickness the same
    fill("yellow");
    ellipse(-25, 0, 40, 30);

    // Body
    ellipse(10, 20, 55, 35);

    // Eye
    fill("black");
    ellipse(-32.5, -5, 5, 7.5);

    // Wing
    noFill();
    rotate(PI / -2);
    arc(-20, 5, 15, 40, 0, PI);

    // Beak
    fill("orange");
    triangle(0, -55, 5, -45, -5, -45);
    ellipse(1, -47.5, 4, 1.5);

    // Tail
    triangle(-20, 47.5, -15, 37.5, -25, 37.5);

    // Left leg
    line(-35, 0, -45, 0);
    line(-45, 0, -50, -5);
    line(-45, 0, -52.5, 0);
    line(-45, 0, -50, 5);

    // Right leg
    line(-35, 22.5, -45, 22.5);
    line(-45, 22.5, -50, 17.5);
    line(-45, 22.5, -52.5, 22.5);
    line(-45, 22.5, -50, 27.5);

    pop(); // dispose of this layer

  }


  this.move = function () {
//folow the mouse for now
    this.x = mouseX;
    this.y = mouseY;

  }
}