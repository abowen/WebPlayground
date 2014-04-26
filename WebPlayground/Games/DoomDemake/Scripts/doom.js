﻿var game = new Phaser.Game(400, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.scale.maxWidth = 800;
    game.scale.maxHeight = 600;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.load.spritesheet('player', '../assets/player.png', 8, 8);
    game.load.spritesheet('shell', '../assets/shell.png', 2, 2);
    game.load.spritesheet('plasma', '../assets/plasma.png', 4, 4);
    
    game.load.tilemap('map', '../assets/maps/mapCSV_Group1_Map1.csv', null, Phaser.Tilemap.CSV);
    game.load.image('wall', '../assets/wall.png');
    game.load.image('tileset', '../assets/walls.png');
    game.load.image('phaserTiles', '../assets/phaserTiles.png');
}

var map;
var layer;
var tileImage;

var player;
var cursors;
var playerShots;
var playerShotsRemaining = 100;
var playerShotsRemainingText;
var playerShotTime = 0;

var playerLastDirection = [1, 0];
var playerSelectedWeapon;
var walls;

function create() {
    // MAP
    tileImage = game.add.tileSprite(50, 50, 150, 150, 'wall');
    map = game.add.tilemap('map', 8, 8);
    map.addTilesetImage('phaserTiles');
    layer = map.createLayer(0);
    layer.resizeWorld();
    
    // GAME
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#999999';
    game.world.setBounds(0, 0, 2000, 2000);

    // PLAYER    
    player = game.add.sprite(16,16, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    playerSelectedWeapon = createShell;


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
        playerShoots();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        playerSelectedWeapon = createShell;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
        playerSelectedWeapon = createPlasma;
    }
}

function render() {

}

function playerShoots() {
    if (game.time.totalElapsedSeconds() > playerShotTime + 1) {
        playerShotTime = game.time.totalElapsedSeconds();
        playerShotsRemaining--;

        var shot = playerSelectedWeapon(player.body.x, player.body.y);
        game.physics.arcade.enable(shot);
        shot.body.velocity.x = playerLastDirection[0] * (shot.speed || 100);
        shot.body.velocity.y = playerLastDirection[1] * (shot.speed || 100);
        playerShots.add(shot);
    }
}


function createShell(x, y)
{
    var bullet = game.add.sprite(x, y, 'shell');
    bullet.speed = 200;
    return bullet;
}

function createPlasma(x, y) {
    var bullet = game.add.sprite(x, y, 'plasma');
    bullet.animations.add('normal', [0, 1], 10, true);
    bullet.animations.play('normal');
    bullet.speed = 100;
    return bullet;
}