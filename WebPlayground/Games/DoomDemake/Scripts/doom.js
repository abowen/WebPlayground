var game = new Phaser.Game(400, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.scale.maxWidth = 800;
    game.scale.maxHeight = 600;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.load.spritesheet('player', '../assets/player.png', 8, 8);
    game.load.spritesheet('shell', '../assets/shell.png', 2, 2);
}


var player;
var cursors;
var playerShots;
var playerLastShotTime = 0;
var playerLastVelocity;

function create() {
    // GAME    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#999999';
    game.world.setBounds(0, 0, 2000, 2000);

    // PLAYER    
    player = game.add.sprite(200, 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('right', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5, 6], 10, true);
    player.animations.add('left', [7, 8, 9], 10, true);
    player.animations.add('up', [10, 11, 12, 13], 10, true);

    // PLAYER BULLETS
    playerShots = game.add.group();

    // INPUT
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    // COLLISION
    //game.physics.arcade.collide(player, platforms);

    // MOVEMENT
    var velocity = 50;    
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

    //game.camera.x = player.x;
    //game.camera.y = player.y;

    if ((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
        && (game.time.totalElapsedSeconds() > playerLastShotTime + 1)) {
        createPlayerBullet();
    }
}

function createPlayerBullet() {
    playerLastShotTime = game.time.totalElapsedSeconds();
    var playerShell = game.add.sprite(player.body.center.x, player.body.center.y, 'shell');
    game.physics.arcade.enable(playerShell);
    //playerShell.body.velocity.x = player.body.facing;
    playerShots.add(playerShell);
}