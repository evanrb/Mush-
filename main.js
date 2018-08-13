
var game = new Phaser.Game(896, 480, Phaser.AUTO, 'game');//, '', { preload: preload, create: create, update: update });

var GamePlay = function(game){
    
};

GamePlay.prototype.preload = function() {
    //load atlas
    game.load.tilemap('map','Assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('RED', 'Assets/Red.png', 32, 56);
    game.load.spritesheet('BLUE', 'Assets/Blue.png',32, 64 );
    game.load.spritesheet('hedgeSheet', 'Assets/hedge tiles 2.png', 32, 32);
    game.load.image('background', 'Assets/level1-background.png');
    game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
        
    var flies;
    var back;
    var player;
    var p2;
    var p3;
    var transformed; 
//    var shadowTexture;
//    var lightSprite;
//    var LIGHT_RADIUS;
//    var lights;
};
GamePlay.prototype.create = function() {
    
   // Set stage background color
    this.game.stage.backgroundColor = 0x78453A;
    back = game.add.sprite(0,0, 'background');
    
    flyLocations = [
        [48, 144, 368, 560, 912, 1232, 1264]
        [112, 80, 240, 784]
        [144, 432, 1552]
        [208, 80, 240, 368, 688]
        [304, 208, 1264, 1392]
        [336, 688]
        [368, 1040]
        [400, 80]
        [464, 592, 656]
        [560, 144]
        [592, 496]
        [624, 368]
        [656, 48, 112, 1264]
        [688, 240, 592, 944]
        [720, 368]
        [752, 48, 176]
        [784, 1136, 1552]
        [816, 112, 240, 752, 848]
    ];

    flies = this.game.add.goup();
    
//add player
   // game.physics.startSystem(Phaser.Physics.ARCADE);
    //player = game.add.sprite(100, 300, 'puppy');
    player = new mushroom(game, 'RED', 1, 48, 48);
    player.anchor.x = .5;
    player.anchor.y = .5;
    game.add.existing(player);
    //p2 = game.add.sprite(550, 320, 'puppy');
    p2 = new mushroom(game, 'BLUE', 2, 848, 48);
    p2.anchor.x = .5;
    p2.anchor.y = .75;
    game.add.existing(p2);
    transformed = false;
    game.world.setBounds(0, 0, 896, 1600);
  
    map = game.add.tilemap('map');
    map.addTilesetImage('hedges 2', 'hedgeSheet');
    map.setCollisionByExclusion([]);
    mapLayer = map.createLayer('Tile Layer 1');
    mapLayer.resizeWorld();
    
    game.physics.enable(map, Phaser.Physics.ARCADE);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(p2, Phaser.Physics.ARCADE);
    
    p2.body.setSize(32, 32, 0, 32);
    //this.player.collideWorldBounds = true;
    
    
    // The radius of the circle of light
    this.P1_LIGHT_RADIUS = 70;
    this.p2_LIGHT_RADIUS = 100;
    this.LIGHT_RADIUS = 0;
    
    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Create the lights
    this.lights = this.game.add.group();
    
      
    var playerLight = this.lights.add(player);
    this.lights.add(p2);
     
    
};
GamePlay.prototype.update = function() {
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
                p3.y -= 32;
            }
            if ((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(game.input.keyboard.isDown(Phaser.Keyboard.D))) {
                p3.x += 32;
            }
            if((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(game.input.keyboard.isDown(Phaser.Keyboard.A))){
                p3.x-=32;
            }
            if((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(game.input.keyboard.isDown(Phaser.Keyboard.S))){
                p3.y+=32;
            }
            
        }
    this.updateShadowTexture();
        
    
    if(game.physics.arcade.collide(player, p2) && transformed == false){//player.x == p2.x && player.y == p2.y && transformed == false){
        p3 = game.add.sprite(player.x, player.y, 'puppy');
        transformed = true;
        player.destroy();
        p2.destroy();
    }
};
GamePlay.prototype.render = function(){
    //game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
    game.debug.body(p2);
    game.debug.body(map);
};
GamePlay.prototype.updateShadowTexture = function(){
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    //console.log(this.shadowTexture);

    // Iterate through each of the lights and draw the glow
    this.lights.forEach(function(light) {
        // Randomly change the radius each frame
       // console.log(light);
        if(light.player === 1){
            //var radius = this.P1_LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
            this.LIGHT_RADIUS = this.P1_LIGHT_RADIUS;
        }else(
            //var radius = this.p2_LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
            this.LIGHT_RADIUS = this.p2_LIGHT_RADIUS
        )
        
        var radius = this.LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
        // Draw circle of light with a soft edge
        var gradient =
            this.shadowTexture.context.createRadialGradient(
                light.x, light.y,this.LIGHT_RADIUS * 0.75,
                light.x, light.y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(light.x, light.y, radius, 0, Math.PI*2);
        this.shadowTexture.context.fill();
    }, this);

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
    
};
game.state.add('game', GamePlay, true);
