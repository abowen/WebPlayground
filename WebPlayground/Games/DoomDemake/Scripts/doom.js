var game = new Phaser.Game(400, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.scale.maxWidth = 800;
    game.scale.maxHeight = 600;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.load.spritesheet('player', '../assets/player.png', 8, 8);
    game.load.spritesheet('shell', '../assets/shell.png', 2, 2);
    game.load.spritesheet('plasma', '../assets/plasma.png', 4, 4);
    
    game.load.tilemap('map', '../assets/maps/level01.csv', null, Phaser.Tilemap.CSV);    
    game.load.image('wall', '../assets/wall.png');
    game.load.image('tileset', '../assets/walls.png');
}

var map;
var layer;
var tileImage;

var player;
var cursors;
var playerShots;
var playerShotTime = 0;
var playerLastDirection = [1, 0];
var walls;

function create() {
    // MAP
    tileImage = game.add.tileSprite(50, 50, 150, 150, 'wall');
    map = game.add.tilemap('map', 8, 8);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    
    // GAME
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#999999';
    game.world.setBounds(0, 0, 2000, 2000);

    // PLAYER    
    player = game.add.sprite(200, 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    game.camera.follow(player);

    //  Our two animations, walking left and right.
    player.animations.add('right', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5, 6], 10, true);
    player.animations.add('left', [7, 8, 9], 10, true);
    player.animations.add('up', [10, 11, 12, 13], 10, true);   

    // PLAYER BULLETS
    playerShots = game.add.group();

    // INPUT
    cursors = game.input.keyboard.createCursorKeys();

    // WALLS
    walls = game.add.group();
    walls.enableBody = true;
    var wall = game.add.sprite(100, 100, 'plasma');
    game.physics.arcade.enable(wall);
    wall.body.immovable = true;

    wall.animations.add('normal', [0, 1], 10, true);
    wall.animations.play('normal');
        
    walls.add(wall);

    // INFO
    // player.fixedToCamera = true;
}

function update() {
    // PHYSICS
    //game.physics.arcade.overlap(player, walls, function (internalPlayer, internalWall) {
    //    internalWall.kill();
    //    internalPlayer.kill();
    //}, null, this);
    //game.physics.arcade.collide(player, walls);

    // MOVEMENT
    var velocity = 50;
    if (cursors.left.isDown) {
        player.body.velocity.x = -velocity;
        player.body.velocity.y = 0;
        player.animations.play('left');
       playerLastDirection =  [-1, 0];
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = velocity;
        player.body.velocity.y = 0;
        player.animations.play('right');
       playerLastDirection =  [1, 0];
    }
    else if (cursors.up.isDown) {
        player.body.velocity.x = 0;
        player.body.velocity.y = -velocity;
        player.animations.play('up');
        playerLastDirection =  [0, -1];
    }
    else if (cursors.down.isDown) {
        player.body.velocity.x = 0;
        player.body.velocity.y = velocity;
        player.animations.play('down');
        playerLastDirection =  [0, 1];        
    }
    else {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.stop();
    }    

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        createPlayerBullet();
    }
}

function render() {

}

function createPlayerBullet() {
    if (game.time.totalElapsedSeconds() > playerShotTime + 1) {
        playerShotTime = game.time.totalElapsedSeconds();

        var playerShell = game.add.sprite(player.body.center.x, player.body.center.y, 'shell');
        game.physics.arcade.enable(playerShell);
        playerShell.body.velocity.x = playerLastDirection[0] * 100;
        playerShell.body.velocity.y = playerLastDirection[1] * 100;

        playerShots.add(playerShell);
    }
}