var game = new Phaser.Game(800, 550, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    this.game.stage.backgroundColor = '#71c5cf';

    game.load.image('bird', '../assets/bird.png');
    game.load.image('pipe', '../assets/pipe.png');
}

var bird;
var pipes;
var pipeTimer;
var score;
var scoreLabel;

function create() {
    // GAME
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // BIRD
    // graphics
    bird = game.add.sprite(100, 245, 'bird');
    bird.anchor.setTo(0.5, 0.5);
    // phyiscs
    game.physics.enable(bird, Phaser.Physics.ARCADE);
    bird.body.gravity.y = 1000;
    // interaction
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);
    
    // PIPES 
    pipes = game.add.group();    
    pipes.createMultiple(30, 'pipe');
    game.physics.enable(pipes, Phaser.Physics.ARCADE);

    pipeTimer = game.time.events.loop(1750, addPipeColumn, this);

    // SCORE
    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff" };
    scoreLabel = game.add.text(20, 20, "0", style);
}

function update() {
    // PHYSICS
    game.physics.arcade.collide(bird, pipes, resetScore, null, this);

    if (bird.inWorld == false) {
        restart();
    }

    if (bird.angle < 20) {
        bird.angle += 1;
    }
}

function restart() {
    game.time.events.remove(this.timer);
    bird.reset(100, 245);

}

function jump() {
    bird.body.velocity.y = -350;
    
    var animation = game.add.tween(bird);    
    animation.to({ angle: -20 }, 100);
    animation.start();
}

function addPipeColumn() {
    var pipeHeight = 8;
    var hole = Math.floor(Math.random() * pipeHeight - 2) + 1;

    for (var i = 0; i <= pipeHeight; i++) {
        if (i != hole && i != hole + 1) {
            addPipe(game.width, i * 60 + 10);
        }
    }
}

function addPipe(x, y) {
    var pipe = pipes.getFirstDead(false);    
    if (pipe) {
        pipe.reset(x, y);                
        game.physics.enable(pipe, Phaser.Physics.ARCADE);
        pipe.body.velocity.x = -200;
        pipe.body.immovable = true;        
        pipe.checkWorldBounds = true;

        pipe.events.onOutOfBounds.add(killPipe, this);
        pipes.add(pipe);
    }
    return pipe;
}

function killPipe(pipe) {
    pipe.kill();
    score++;
    scoreLabel.text = score;
}

function resetScore(bird, pipe) {
    score = 0;
    scoreLabel.text = score;
}