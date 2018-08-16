
var game = new Phaser.Game(896, 480, Phaser.AUTO, 'game');//, '', { preload: preload, create: create, update: update });

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        console.log('MainMenu: preload');
    },
    create: function() {
        console.log('MainMenu: create');
        game.stage.backgroundColor = "#000000";
        game.add.text(52, 200, 'Press ENTER to change states.', { fontSize: '26px', fill: '#FFF', align: "center" });
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('GamePlay');
        }
    }
}

var GamePlay = function(game){
    
};

GamePlay.prototype.preload = function() {
    //load atlas
    game.load.tilemap('map','Assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('RED', 'Assets/Red.png', 32, 47);
    game.load.spritesheet('BLUE', 'Assets/Blue.png',32, 64 );
    game.load.spritesheet('together', 'Assets/together.png', 64, 64)
    game.load.spritesheet('hedgeSheet', 'Assets/hedge tiles 2.png', 32, 32);
    game.load.image('background', 'Assets/level1-background.png');
    game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
    
    game.load.audio('night1', ['Sound/in-his-own-way.ogg']);
    game.load.audio('glowfly', ['Sound/glowfly_Chime_1.ogg']);
    
    var FLIES;
    var flies;
    var tween;
    var mushrooms;
    var back;
    var player;
    var p2;
    var p3;
    var transformed; 
    var fly;
    var markerP1;
    var markerP2;
    var markerP3;
    var mapArray;
    var shadowY;
    var music;
    var twinkle;
};
GamePlay.prototype.create = function() {
    //var jason = $.getJSON("Assets/level1.json", function(json){
      // console.log(jason); 
    //});
    //console.log(map.data);
   // Set stage background color
    this.game.stage.backgroundColor = 0x78453A;
    this.markerP1 = new Phaser.Point();
    this.markerP2 = new Phaser.Point();
    this.markerP3 = new Phaser.Point();
    this.shadowY = 0;
    music = game.add.audio('night1');
    music.loopFull();
    
    twinkle = game.add.audio('glowfly');
    
    back = game.add.sprite(0,0, 'background');
    var flyLocations = [
        [48, 144, 368, 560, 912, 1232, 1264],
        [112, 80, 240, 784],
        [144, 432, 1552],
        [208, 80, 240, 368, 688],
        [304, 208, 1264, 1392],
        [336, 688],
        [368, 1040],
        [400, 80],
        [464, 592, 656],
        [560, 144],
        [592, 496],
        [624, 368],
        [656, 48, 112, 1264],
        [688, 240, 592, 944],
        [720, 368],
        [752, 48, 176],
        [784, 1136, 1552],
        [816, 112, 240, 752, 848]
    ];
    
    this.FLIES = [];

    game.world.setBounds(0, 0, 896, 1600);
    this.flies = this.game.add.group();
    console.log(this.flies);
    this.flies.enableBody = true;
    this.flies.physicsBodyType = Phaser.Physics.ARCADE;
    q = 0;
    for(i = 0; i < flyLocations.length; i++){
        for(j = 1; j < flyLocations[i].length; j++){
            console.log(q++);
            fly = new glowFly(game, 'glowfly', flyLocations[i][0], flyLocations[i][j]);
            this.FLIES.push(fly);
            this.flies.add(fly);
            console.log(this.flies);
        }
    }
    console.log(this.FLIES);
    this.mushrooms = this.game.add.group();
    player = new mushroom(game, 'RED', 1, 48, 46);
    p2 = new mushroom(game, 'BLUE', 2, 848, 48);
    p3 = new mushroom(game, 'together', 3, -60, -60);
    this.mushrooms.add(player);
    this.mushrooms.add(p2);
    this.tween = game.add.tween(player).to({}, 0, true);
    
    transformed = false;
    
    map = game.add.tilemap('map');
    map.addTilesetImage('hedges 2', 'hedgeSheet');
    this.mapLayer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(1, 10000, true, this.mapLayer);
    this.mapLayer.resizeWorld();

    this.LIGHT_RADIUS = 0;
    
    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.world.width, this.world.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Create the lights
    this.lights = this.game.add.group();
    
    
    this.transformed = false;
      i = 0;
    var playerLight = this.lights.add(player);
    this.lights.add(p2);
//    this.flies.forEach(function(fly){
//        console.log(i++);
//        this.lights.add(fly);
//    }, this);
//    console.log(this.flies);
    for(i = 0; i < this.FLIES.length; i++){
        this.lights.add(this.FLIES[i]);
    }
    
};
GamePlay.prototype.update = function() {
    //get user input
    //this.physics.arcade.collide(player, this.mapLayer);
    if(transformed){
        game.physics.arcade.collide(p3, this.mapLayer);
    }
    
    game.physics.arcade.collide(player, this.mapLayer);
    
    
    this.markerP1.x = this.math.snapToFloor(Math.floor(player.x), 32) / 32;
    this.markerP1.y = this.math.snapToFloor(Math.ceil(player.y), 32) / 32;
    
    var i = this.mapLayer.index;
    var x1 = this.markerP1.x;
    var y1 = this.markerP1.y;
    
    this.markerP2.x = this.math.snapToFloor(Math.floor(p2.x), 32) / 32;
    this.markerP2.y = this.math.snapToFloor(Math.ceil(p2.y), 32) / 32;
    
    var x2 = this.markerP2.x;
    var y2 = this.markerP2.y;
    
    if(transformed){
        this.markerP3.x = this.math.snapToFloor(Math.floor(p3.x), 32) / 32;
        this.markerP3.y = this.math.snapToFloor(Math.ceil(p3.y), 32) / 32;
    
        var x3 = this.markerP3.x;
        var y3 = this.markerP3.y;
    }
  
        if(player.alive == true ){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)){
                //if(map.getTileAbove(i, x1, y1).collideUp == false){
                    //console.log(map.getTileAbove(i, x, y));
                    //player.y -= 32;
                    player.body.velocity.y = -32;
                //}
                
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
                if((map.getTileRight(i, x1, y1).collideUp == false) && player.x < 448){
                    player.x += 32;
                }
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
                if(map.getTileLeft(i, x1, y1).collideUp == false){
                    player.x-= 32;
                }
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)){
                //if(map.getTileBelow(i, x1, y1).collideUp == false){
                //if(player.y % 46 == 0){
                    game.add.tween(player).to({y: '+32'}, 2000, Phaser.Easing.Linear.None, true);
                //}
                   // player.y+=32;
                //}
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.W)){
                if(map.getTileAbove(i, x2, y2).collideUp == false){
                    p2.y -= 32;
                }
            }
            if (game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
                 if(map.getTileRight(i, x2, y2).collideUp == false){
                    p2.x += 32;
                 }
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.A)){
                 if((map.getTileLeft(i, x2, y2).collideUp == false) && p2.x > 448){
                    p2.x-=32;
                 }
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.S)){
                 if(map.getTileBelow(i, x2, y2).collideUp == false){
                    p2.y+=32;
                 }
            }
        }else{
            if((game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(game.input.keyboard.isDown(Phaser.Keyboard.W))){
                if(map.getTileAbove(i, x3, y3).collideUp == false){
                    p3.y -= 32;
                    this.game.camera.y -=32;
                }
            }else if ((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(game.input.keyboard.isDown(Phaser.Keyboard.D))) {
                if(map.getTileRight(i, x3, y3).collideUp == false){
                    p3.x += 32;
                    //this.game.camera.y +=32;
                }
            }else if((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(game.input.keyboard.isDown(Phaser.Keyboard.A))){
                if(map.getTileLeft(i, x3, y3).collideUp == false){
                    p3.x-=32;
                    //this.game.camera.y -=32;
                }
            }else if((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(game.input.keyboard.isDown(Phaser.Keyboard.S))){
                if(map.getTileBelow(i, x3, y3).collideUp == false){
                    p3.y+=32;
                    this.game.camera.y +=32;
                }
            }else if(
                (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(!game.input.keyboard.isDown(Phaser.Keyboard.S))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(game.input.keyboard.isDown(Phaser.Keyboard.S))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(game.input.keyboard.isDown(Phaser.Keyboard.W))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(!game.input.keyboard.isDown(Phaser.Keyboard.W))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(game.input.keyboard.isDown(Phaser.Keyboard.D))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(!game.input.keyboard.isDown(Phaser.Keyboard.D))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(!game.input.keyboard.isDown(Phaser.Keyboard.A))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(game.input.keyboard.isDown(Phaser.Keyboard.A))
            ){
                this.p3_LIGHT_RADIUS -= .06;
            }
            
        }
    if(p3.lightRadius <= 0){
        game.state.start('GameOver');
    }
 
    if(game.physics.arcade.collide(player, p2) && transformed == false){//player.x == p2.x && player.y == p2.y && transformed == false){
        //p3 = game.add.sprite(player.x, player.y, '');
        
        //game.height = 1200;
        //this.game.camera.y += 410;
        this.shadowY += 410;
        //this.shadowTexture.context.fillRect(0, this.shadowY, this.world.width, 1600);
        //p3 = new mushroom(game, 'together', 3, 448, 448);
        p3.x = 448;
        p3.y = 448;
        this.game.camera.y = p3.y - 220;

        p3.lightRadius = p2.lightRadius+p1.lightRadius;
        this.lights.add(p3);
        
        transformed = true;
        player.x=-100;
        p2.x = -200;
    }
    
    if(transformed){
        if(p3.y + 32 == 1600){
            game.state.start('GameOver');
        }
    }
    
    
    this.updateShadowTexture();
};
GamePlay.prototype.render = function(){
    //game.debug.bodyInfo(player, 32, 32);
//    game.debug.body(player);
//    game.debug.body(p2);
//    game.debug.body(map);
//    for(i = 0; i < this.FLIES.length; i++){
//        game.debug.body(this.FLIES[i]);
//    }
//    if(transformed){
//        game.debug.body(p3);
//    }
};
GamePlay.prototype.updateShadowTexture = function(){
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    this.shadowTexture.context.fillRect(0, this.shadowY, this.world.width, this.world.height);
    //console.log(this.shadowTexture);

    // Iterate through each of the lights and draw the glow
    this.lights.forEach(function(light) {
        // Randomly change the radius each frame
       // console.log(light);
        if(light.exists){
            if(light.player === 1){
            //var radius = this.P1_LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
                this.LIGHT_RADIUS = player.lightRadius;
            }else if(light.player === 2){
            //var radius = this.p2_LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
                this.LIGHT_RADIUS = p2.lightRadius;
            }else if(light.player === 3){
                this.LIGHT_RADIUS = p3.lightRadius;
            }else if(light.key == "glowfly" && light.exists){
            //console.log(light);
                this.LIGHT_RADIUS = 15;
            }
        
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
        }
        
    }, this);

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
    
};

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {
        console.log('GameOver: preload');
    },
    create: function() {
        console.log('GameOver: create');
        game.stage.backgroundColor = "#000";
        game.add.text(80, 230, 'GAMEOVER', { fontSize: '60px', fill: '#FFF' });
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }
    }
}

game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
//game.state.add('game', GamePlay, true);
