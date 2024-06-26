function Lemon(_x, _y){
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
        
        fill("yellow"); // Draw the lemon
        ellipse(-15,-45, 55, 45);
        fill("green"); // Draw the leaves
        ellipse(20, -45, 20, 15);
        rotate(0.7);
        ellipse(-10, -42, 20, 15);

        pop();
    }

    this.move = function() {
        this.y += this.ySpeed; // spin
    }

    this.spin = function(){
        this.angle += this.rSpeed; // spin 
    }
}