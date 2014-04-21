var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    this.game.stage.backgroundColor = '#71c5cf';

    game.load.image('bird', '../assets/bird.png');
    game.load.image('pipe', '../assets/pipe.png');
}

var bird;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird on the screen
    bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(bird);

    // Add gravity to the bird to make it fall
    bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);     
}

function update() {  
    // If the bird is out of the world (too high or too low), call the 'restart_game' function
    if (bird.inWorld == false) {
        restart();
    }
}

// Make the bird jump 
function jump() {      
    bird.body.velocity.y = -350;
}

// Restart the game
function restart() {      
    this.game.state.start('main');
}