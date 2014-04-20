var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('player', '../assets/player.png', 8, 8);
}


var player;
var cursors;

function create() {
    // GAME    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#999999';

    // PLAYER    
    player = game.add.sprite(8, 8, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('right', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5, 6], 10, true);
    player.animations.add('left', [7, 8, 9], 10, true);
    player.animations.add('up', [10, 11, 12, 13], 10, true);

    // INPUT
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    // COLLISION
    //game.physics.arcade.collide(player, platforms);

    // MOVEMENT
    var velocity = 50;
    //  LEFT
    if (cursors.left.isDown) {
        player.body.velocity.x = -velocity;
        player.body.velocity.y = 0;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = velocity;
        player.body.velocity.y = 0;
        player.animations.play('right');
    }
    else if (cursors.up.isDown) {
        player.body.velocity.x = 0;
        player.body.velocity.y = -velocity;
        player.animations.play('up');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.x = 0;
        player.body.velocity.y = velocity;
        player.animations.play('down');
    }
    else {                
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.stop();
    }
}
