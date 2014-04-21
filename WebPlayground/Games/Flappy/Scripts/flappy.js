var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    this.game.stage.backgroundColor = '#71c5cf';

    game.load.image('bird', '../assets/bird.png');
    game.load.image('pipe', '../assets/pipe.png');
}

var bird;
var pipes;
var pipeTimer;

function create() {
    // GAME
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // BIRD
    // graphics
    bird = game.add.sprite(100, 245, 'bird');
    bird.anchor.setTo(-0.5, 0.5);
    // phyiscs
    game.physics.arcade.enable(bird);
    bird.body.gravity.y = 1000;
    // interaction
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);
    
    // PIPES 
    pipes = game.add.group();
    pipes.createMultiple(20, 'pipe');

    pipeTimer = game.time.events.loop(1500, addPipeColumn, this);
}

function update() {
    if (bird.inWorld == false) {
        restart();
    }

    if (bird.angle < 20) {
        bird.angle += 1;
    }
}

function restart() {
    game.time.events.remove(this.timer);

}

function jump() {
    bird.body.velocity.y = -350;
    
    var animation = game.add.tween(bird);    
    animation.to({ angle: -20 }, 100);
    animation.start();
}

function addPipeColumn() {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < 8; i++) {
        if (i != hole && i != hole + 1) {
            addPipe(400, i * 60 + 10);
        }
    }
}

function addPipe(x, y) {
    var pipe = pipes.getFirstExists(false);    
    if (pipe) {
        pipe.reset(x, y);

        game.physics.arcade.enable(pipe);                
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;

        pipe.events.onOutOfBounds.add(killPipe, this);
    }
}

function killPipe(pipe) {
    pipe.kill();
}