function Grape(_x, _y){
  this.x = _x;
  this.y = _y;

  this.xSpeed = 0;
  this.ySpeed = random(1, 2); // 1 - 2 (falling)
  this.rSpeed = random(-.02, .02); // rotation speed

  this.angle = 0;

  this.display = function(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    // Draw the stem
    stroke(100, 80, 50);
    strokeWeight(5);
    
    line(0, -40, 0, 0);
    line(0, -50, 10, -70);
    line(0, -50, -10, -70);

    // Draw grapes
    fill(128, 0, 128); // Purple color
    noStroke();
    ellipse(-15, -45, 20, 20); // First grape at top
    ellipse(0, -45, 20, 20);    // Second grape at top
    ellipse(15, -45, 20, 20);   // Third grape at top
    ellipse(-5, -25, 20, 20);   // First grape in middle
    ellipse(5, -25, 20, 20);    // Second grape in middle
    ellipse(0, -5, 20, 20);     // Grape at bottom

    pop();
  }

  this.move = function() {
    this.y += this.ySpeed; // spin
  }

  this.spin = function() {
    this.angle += this.rSpeed; // spin
  }

}