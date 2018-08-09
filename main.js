
var game = new Phaser.Game(896, 550, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    //load atlas
    game.load.tilemap('map','Assets/level11.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('puppy', 'Assets/puppy.png');
    game.load.spritesheet('hedgeSheet', 'Assets/hedge tiles 2.png', 32, 32);
        
    var player;
    var p2;
    var p3;
    var transformed; 
}
function create() {
//add player
   // game.physics.startSystem(Phaser.Physics.ARCADE);
    //player = game.add.sprite(100, 300, 'puppy');
    player = new mushroom(game, 'puppy', 0, 1, 100, 300);
    game.add.existing(player);
    p2 = game.add.sprite(550, 320, 'puppy');
    transformed = false;
    game.world.setBounds(0, 0, 800, 1100);
    
    
    
    map = game.add.tilemap('map');
    map.addTilesetImage('hedges 2', 'hedgeSheet');
    map.setCollisionByExclusion([]);
    mapLayer = map.createLayer('Tile Layer 1');
    mapLayer.resizeWorld();
    
    
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(p2, Phaser.Physics.ARCADE);
    //this.player.collideWorldBounds = true;
//    
    
}
function update() {
    //get user input
    game.physics.arcade.collide(player, mapLayer);
    
        if(player.alive == true ){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
                player.y -= 32;
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
                player.x += 32;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
                player.x-=32;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)){
                player.y+=32;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.W)){
                p2.y -= 32;
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
                p2.x += 32;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.A)){
                p2.x-=32;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.S)){
                p2.y+=32;
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
