function Entity(){
    // Position
    this.x = 0;
    this.y = 0;

    // Dimensions
    this.width = 0;
    this.height = 0;

    // Velocity (speed with direction)
    this.yVelocity = 0;
    this.xVelocity = 0;
}

Entity.prototype.update = function() {
    // TODO: Take parameter of time
    this.x += this.xVelocity;
    this.y += this.yVelocity;
};


// Everything will be white rectangle by default
// Useful for highlighting collision detection
Entity.prototype.draw = function(context){
    context.fillStyle = '#fff';
    context.fillRect(this.x,this.y,this.width, this.height);
};

// Basic bounding box collision detected
Entity.prototype.intersect = function(other) {
    return  this.y + this.height    > other.y &&
            this.y                  < other.y + other.height &&
            this.x + this.width     > other.x &&
            this.x                  < other.x + other.width;

};
