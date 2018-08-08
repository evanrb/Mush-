
var game = new Phaser.Game(800, 550, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    //load atlas
    game.load.tilemap('map','Assets/embeddedSampleMaze.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('puppy', 'Assets/puppy.png');
    game.load.spritesheet('hedge', 'Assets/hedgeTiles.png', 32, 32);
        
    var player;
    var p2;
    var p3;
    var transformed; 
}
function create() {
//add player
   // game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(100, 300, 'puppy');
    p2 = game.add.sprite(500, 300, 'puppy');
    transformed = false;
    game.world.setBounds(0, 0, 800, 1100);
    
    
    
    map = game.add.tilemap('map');
    map.addTilesetImage('hedges', 'hedge');
    mapLayer = map.createLayer('Tile Layer 1');
    mapLayer.resizeWorld();
    
    game.physics.enable(game.player);
    game.physics.enable(game.p2);
    game.player.collideWorldBounds = true;
//    
    
}
function update() {
    //get user input
        if(player.alive == true){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
                player.y -= 10;
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
                player.x += 10;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
                player.x-=10;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)){
                player.y+=10;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.W)){
                p2.y -= 10;
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
                p2.x += 10;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.A)){
                p2.x-=10;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.S)){
                p2.y+=10;
            }
        }else{
            if((game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(game.input.keyboard.isDown(Phaser.Keyboard.W))){
                p3.y -= 10;
            }
            if ((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(game.input.keyboard.isDown(Phaser.Keyboard.D))) {
                p3.x += 10;
            }
            if((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(game.input.keyboard.isDown(Phaser.Keyboard.A))){
                p3.x-=10;
            }
            if((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(game.input.keyboard.isDown(Phaser.Keyboard.S))){
                p3.y+=10;
            }
            
        }
        
    
    if(player.x == p2.x && player.y == p2.y && transformed == false){
        p3 = game.add.sprite(player.x, player.y, 'puppy');
        transformed = true;
        player.destroy();
        p2.destroy();
    }
}
