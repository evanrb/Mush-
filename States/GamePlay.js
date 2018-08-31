
var GamePlay = function(game){};
GamePlay.prototype.preload = function() {
 
    //Load Character and GlowFly spritesheets
    game.load.spritesheet('RED', 'Assets/Red.png', 32, 47);
    game.load.spritesheet('BLUE', 'Assets/Blue.png',32, 64 );
    game.load.spritesheet('together', 'Assets/joined.png', 64, 64)
    game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
    
    game.load.spritesheet('tutorial1', 'Assets/tutorial1.png', 896, 97);
    game.load.spritesheet('tutorial2', 'Assets/tutorial2.png', 896, 97);
    game.load.spritesheet('tutorial3', 'Assets/tutorial3.png', 896, 97);
    game.load.spritesheet('tutorial4', 'Assets/tutorial4.png', 896, 97);
    game.load.spritesheet('tutorial5', 'Assets/tutorial5.png', 896, 97);
    game.load.spritesheet('tutorial6', 'Assets/tutorial6.png', 896, 97);
    game.load.spritesheet('tutorial7', 'Assets/tutorial7.png', 896, 97);
    game.load.image('tutorial8', 'Assets/tutorial8.png');
    
    //Load Maze Background
    game.load.image('background', 'Assets/level1-background.png');
    
    game.load.image('pauseBackground', 'Assets/pauseBackground.png');
    game.load.spritesheet('quitButton', 'Assets/quit.png', 128, 92);
    game.load.spritesheet('restartButton', 'Assets/restart.png', 128, 92);
    
    game.load.image('yellowLight', 'Assets/yellow.png');
    
    //Load Audio
    game.load.audio('night1', ['Sound/in-his-own-way.ogg']);
    game.load.audio('glowfly', ['Sound/glowfly_Chime_1.ogg']);
    
    game.load.audio('seperate', ['Sound/level1Seperate.mp3']);
    game.load.audio('join', ['Sound/level1Join.mp3']);
    
    game.load.audio('night1-2', ['Sound/1st-Night.ogg']);
    
    var FLIES;
    var mushrooms;
    var back;
    var p1;
    var p2;
    var p3;
    var mapLayer
    var fly;
    var markerP1;
    var markerP2;
    var markerP3;
    var mapArray;
    var music;
    var twinkle;
    var isPaused;
};
GamePlay.prototype.create = function() {
    
   // Set stage background color(required for shading)
    this.game.stage.backgroundColor = 0x78453A;
    game.world.setBounds(0, 0, 896, 1600);
    back = game.add.sprite(0,0, 'background');
    
    this.p1Arrived = false;
    this.p2Arrived = false;
    this.notConnected = true;
    
    //Add and loop background music
    music = game.add.audio('night1');
    music.loopFull();
    
    sepSound = game.add.audio('seperate');
    joinSound = game.add.audio('join');
    
    music2 = game.add.audio('night1-2');
    
    twinkle = game.add.audio('glowfly');
    twinkle.allowMultiple = true;
    
    this.isPaused = false;
    
    //array of fly locations. Each array represents a column of the map with (x, y) fly locations, x being the first element of the array and y being the other array elements
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
    
    var level1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    //an array of flies
    this.FLIES = [];
    //loop through fly location array and create flies at each location and add those flies to the FLIES array
    for(i = 0; i < flyLocations.length; i++){
        for(j = 1; j < flyLocations[i].length; j++){
            fly = new glowFly(game, 'glowfly', flyLocations[i][0], flyLocations[i][j], 'yellowLight');
            this.FLIES.push(fly);
        }
    }
    
    //a group that holds all the player characters
    this.mushrooms = this.game.add.group();
    p1 = new mushroom(game, 'RED', 1, 48, 42, level1, 1, 1);
    p2 = new mushroom(game, 'BLUE', 2, 848, 32, level1, 1, 26);
    p3 = new mushroom(game, 'together', 3, -60, -2, level1, 13, 13);
    this.mushrooms.add(p1);
    this.mushrooms.add(p2);
    this.mushrooms.add(p3)
    
    
    
    this.LIGHT_RADIUS = 0;
    
    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.world.width, this.world.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Create the lights group
    this.lights = this.game.add.group();
    
    this.lights.add(p1);
    this.lights.add(p2);
    this.lights.add(p3);
    for(i = 0; i < this.FLIES.length; i++){
        this.lights.add(this.FLIES[i]);
    }
    
    this.timer = game.time.create();
    this.timer.add(25000, function(){
        for(i = 0; i < this.FLIES.length; i ++){
            if(this.FLIES[i].y < 480){
                if(this.FLIES[i].exists){
                    this.FLIES[i].gone();
                }
            }
        }
    }, this);
    this.timer.start();
    
    this.preTime = this.timer.duration * .001;
    this.time = this.preTime.toFixed(2);
    this.textTime = this.time.toString();
    this.screenText = game.add.text(448, 240, this.textTime, { font: "65px Arial", fill: "#ff0044", align: "center" });
    this.screenText.anchor.set(.5);
    
    tutorial1 = game.add.sprite(0, 0, 'tutorial1');
    tutorial1.animations.add('tut1Anim', [0, 1, 2, 3], 4, true);
    tutorial1.animations.play('tut1Anim');
    //tutorial2 = game.add.sprite(0, 0, 'tutorial2');
    //tutorial1.animations.add('tut1Anim', [0, 1, 2, 3], 6, true);
    //tutorial1 = game.add.sprite(0, 0, 'tutorial1');
    //tutorial1.animations.add('tut1Anim', [0, 1, 2, 3], 6, true);
    this.tutorialNumber = 1;
    back.inputEnabled = true;
    game.input.mouse.capture = true;
    back.events.onInputDown.add(this.changeTutorial, this);
    p1.moving = true;
    p2.moving = true;
    this.timer.pause();
};
GamePlay.prototype.update = function() {
    
    if(this.timer != null){
        if(this.time != 0){
            this.preTime = this.timer.duration * .001;
            this.time = this.preTime.toFixed(2);
            this.textTime = this.time.toString();
            this.screenText.text = this.textTime;
        }else{this.screenText.destroy();}
    }
    if(game.input.keyboard.justPressed(Phaser.Keyboard.P)){
        if(this.isPaused){
            this.resumeGame();
        }else{
           this.pause(); 
        }
    }
    
    if(p1.mapArrayLocation[0] == 13 && p1.mapArrayLocation[1] == 13 && !p1.moving){
        p1.moving = true;
        this.p1Arrived = true;
    }
    if(p2.mapArrayLocation[0] == 13 && p2.mapArrayLocation[1] == 14 && !p2.moving){
        p2.moving = true;
        this.p2Arrived = true;
    }
    if(this.p1Arrived && this.p2Arrived && this.notConnected){
        if(this.timer != null){
            this.timer.destroy();
            this.screenText.destroy();
        }
        music.pause();
        this.notConnected = false;
        sepSound.play();
        
        var moveCamera = game.add.tween(this.game.camera).to({ x: this.game.camera.x, y: 208 }, 2000, Phaser.Easing.Linear.None, true);
        moveCamera.onComplete.add(allowMovement, this); function allowMovement() { p3.moving = false; game.camera.follow(p3); music2.loopFull();}  
        
        p1.direction = 3;
        p1.animateMovement();
        var tween = game.add.tween(p1).to({ x: p1.x - 20, y: p1.y }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(moveBack, p1); function moveBack() {
            p1.direction = 2;
            p1.animateMovement();
            var tweenBack = game.add.tween(p1).to({ x: p1.x + 30, y: p1.y }, 50, Phaser.Easing.Linear.None, true);
        }
        p2.direction = 3;
        p2.animateMovement();
        var tween2 = game.add.tween(p2).to({ x: p2.x + 20, y: p2.y }, 1000, Phaser.Easing.Linear.None, true);
        tween2.onComplete.add(moveBack2, p2); function moveBack2() {
            p2.direction = 2;
            p2.animateMovement();
            var tweenBack2 = game.add.tween(p2).to({ x: p2.x - 30, y: p2.y }, 50, Phaser.Easing.Linear.None, true);
        }
    }
    
    if(p3.lightRadius <= 0){
        game.state.start('GameOver');
    }
    if(game.physics.arcade.collide(p1, p2)){
        if(this.timer != null){
            this.timer.destroy();
            this.screenText.destroy();
        }
        joinSound.play();
        p3.x = 448;
        p3.y = 416;
        p3.alive = true;
        p3.visible = true;
        p3.moving = true;
        p3.lightRadius = p2.lightRadius+p1.lightRadius;
        p3Radius = p2.lightRadius+p1.lightRadius;
        p1.destroy();
        p2.destroy();
        
    }
    if(p3.y + 32 == 1600){
        music.pause();
        music2.pause();
        game.state.start('GamePlayLevel2', p3.lightRadius);
    }
    
    
    if(this.isPaused){
        this.pauseScreenUpdate();
    }else{this.updateShadowTexture();}
    
};
GamePlay.prototype.render = function(){
    //game.debug.body(p1);
    //game.debug.body(p2);
//    game.debug.body(map);
//    for(i = 0; i < this.FLIES.length; i++){
//        game.debug.body(this.FLIES[i]);
//    }
//    if(transformed){
//        game.debug.body(p3);
//    }
};
GamePlay.prototype.changeTutorial = function(){
    this.tutorialNumber += 1;
    if(this.tutorialNumber == 2){
        tutorial1.destroy();
        tutorial2 = game.add.sprite(0, 0, 'tutorial2');
        tutorial2.animations.add('tut2Anim', [0, 1, 2, 3], 4, true);
        tutorial2.animations.play('tut2Anim');
    }else if(this.tutorialNumber == 3){
        tutorial2.destroy();
        tutorial3 = game.add.sprite(0, 0, 'tutorial3');
        tutorial3.animations.add('tut3Anim', [0, 1], 2, true);
        tutorial3.animations.play('tut3Anim');
    }else if(this.tutorialNumber == 4){
        tutorial3.destroy();
        tutorial4 = game.add.sprite(0, 0, 'tutorial4');
        tutorial4.animations.add('tut4Anim', [0, 1, 2], 4, true);
        tutorial4.animations.play('tut4Anim');
    }else if(this.tutorialNumber == 5){
        tutorial4.destroy();
        tutorial5 = game.add.sprite(0, 0, 'tutorial5');
        tutorial5.animations.add('tut5Anim', [0, 1, 2, 3], 4, true);
        tutorial5.animations.play('tut5Anim');
    }else if(this.tutorialNumber == 6){
        tutorial5.destroy();
        tutorial6 = game.add.sprite(0, 0, 'tutorial6');
        tutorial6.animations.add('tut6Anim', [0, 1, 2], 4, true);
        tutorial6.animations.play('tut6Anim');
    }else if(this.tutorialNumber == 7){
        tutorial6.destroy();
        tutorial7 = game.add.sprite(0, 0, 'tutorial7');
        tutorial7.animations.add('tut7Anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 6, true);
        tutorial7.animations.play('tut7Anim');
    }else if(this.tutorialNumber == 8){
        tutorial7.destroy();
        tutorial8 = game.add.image(0, 0, 'tutorial8');
    }else if(this.tutorialNumber == 9){
        tutorial8.destroy();
        p1.moving = false;
        p2.moving = false;
        this.timer.resume();
        back.inputEnabled = false;
        //game.input.mouse.capture = false;
    }
};
GamePlay.prototype.updateShadowTexture = function(){
    //'rgb(100, 0, 0)'; save for fire level
    // or 300, 100, 200
    this.shadowTexture.context.fillStyle = 'rgb(20, 20, 50)';
    this.shadowTexture.context.fillRect(0, 0, this.world.width, this.world.height);
    //console.log(this.shadowTexture);

    // Iterate through each of the lights and draw the glow
    this.lights.forEach(function(light) {
        // Randomly change the radius each frame
       // console.log(light);
        if(light.exists){
            if(light.player === 1){
            //var radius = this.P1_LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
                this.LIGHT_RADIUS = p1.lightRadius;
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
                    light.x, light.y,this.LIGHT_RADIUS * .05,
                    light.x, light.y, radius);
            //changing gradient color
            
            gradient.addColorStop(0, 'rgba(100, 255, 255, 1.0)');
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
GamePlay.prototype.pause = function(){
    if(this.timer != null){
        this.timer.pause();
    }
    p1.moving = true;
    p2.moving = true;
    p3.moving = true;
    this.isPaused = true;
    this.pauseBackground = game.add.sprite(game.camera.x, game.camera.y, 'pauseBackground');
    this.quitButton = game.add.sprite(game.camera.x + 448, game.camera.y + 286, 'quitButton');
    this.quitButton.anchor.x = .5;
    this.quitButton.anchor.y = .5;
    this.restartButton = game.add.sprite(game.camera.x + 448, game.camera.y + 194, 'restartButton');
    this.restartButton.anchor.x = .5;
    this.restartButton.anchor.y = .5;
    this.quitButton.animations.add('mouseOverQ', [0,1], 20, false);
    this.quitButton.animations.add('mouseRemQ', [1, 0], 20, false);
    this.restartButton.animations.add('mouseOverR', [0,1], 20, false);
    this.restartButton.animations.add('mouseRemR', [1, 0], 20, false);
    this.restartButton.inputEnabled = true;
    this.restartButton.events.onInputDown.add(this.restartGame, this);
    this.quitButton.inputEnabled = true;
    this.quitButton.events.onInputDown.add(this.quitGame, this);
    this.mouseOverQ = false;
    this.mouseOverR = false;
};
GamePlay.prototype.pauseScreenUpdate = function(){
    if (this.quitButton.input.pointerOver() && this.mouseOverQ == false){
        this.quitButton.animations.play('mouseOverQ');
        this.mouseOverQ = true;
    }else if(!this.quitButton.input.pointerOver() && this.mouseOverQ == true){
        this.quitButton.animations.play('mouseRemQ');
        this.mouseOverQ = false;
    }
    if (this.restartButton.input.pointerOver() && this.mouseOverR == false){
        this.restartButton.animations.play('mouseOverR');
        this.mouseOverR = true;
    }else if(!this.restartButton.input.pointerOver() && this.mouseOverR == true){
        this.restartButton.animations.play('mouseRemR');
        this.mouseOverR = false;
    }
};
GamePlay.prototype.resumeGame = function(){
    if(this.timer != null){
        this.timer.resume();
    }
    p1.moving = false;
    p2.moving = false;
    p3.moving = false;
    this.isPaused = false;
    this.pauseBackground.destroy();
    this.restartButton.destroy();
    this.quitButton.destroy();
};
GamePlay.prototype.quitGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('MainMenu');  
};
GamePlay.prototype.restartGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('GamePlay');
};
