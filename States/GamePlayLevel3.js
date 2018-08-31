
var GamePlayLevel3 = function(game){};
GamePlayLevel3.prototype.preload = function() {
 
    //Load Character
    game.load.spritesheet('RED', 'Assets/Red.png', 32, 47);
    game.load.spritesheet('BLUE', 'Assets/Blue.png',32, 64 );
    game.load.spritesheet('together', 'Assets/joined.png', 64, 64)
   
    //Load Maze Background
    game.load.image('background', 'Assets/level3-background.png');
    game.load.image('backgroundOverlay', 'Assets/level3Overlay.png');
    
    game.load.spritesheet('fireTop1', 'Assets/fire1.png', 896, 160);
    game.load.spritesheet('fireTop2', 'Assets/fire2.png', 896, 160);
    game.load.spritesheet('fireTop3', 'Assets/fire3.png', 896, 160);
    game.load.spritesheet('fireTop4', 'Assets/fire4.png', 896, 160);
    
    game.load.spritesheet('fireMid', 'Assets/fireBarrier.png', 385, 768);
    
    game.load.image('pauseBackground', 'Assets/pauseBackground.png');
    game.load.spritesheet('quitButton', 'Assets/quit.png', 128, 92);
    game.load.spritesheet('restartButton', 'Assets/restart.png', 128, 92);
    
    game.load.image('obstacle1', 'Assets/obstacle1.png');
    game.load.image('obstacle2', 'Assets/obstacle2.png');
    game.load.image('obstacle3', 'Assets/obstacle3.png');
    game.load.image('obstacle4', 'Assets/obstacle4.png');
    
    game.load.image('ash1', 'Assets/ash1.png');
    game.load.image('ash2', 'Assets/ash2.png');
    game.load.image('ember1', 'Assets/ember1.png');
    game.load.image('ember2', 'Assets/ember2.png');
    
    //Load Audio
    game.load.audio('night3', ['Sound/3rd-Night.wav']);
    game.load.audio('night4', ['Sound/4th-Night.wav']);
    
    game.load.audio('seperate', ['Sound/level1Join.mp3']);
    
    var mushrooms;
    var back;
    var p1;
    var p2;
    var p3;
    var markerP1;
    var markerP2;
    var markerP3;
    var mapArray;
    var music;
    var isPaused;
};
GamePlayLevel3.prototype.create = function() {
    
   // Set stage background color(required for shading)
    this.game.stage.backgroundColor = 0x78453A;
    game.world.setBounds(0, 0, 960, 1184);
    back = game.add.sprite(0,0, 'background');
    
    //Add and loop background music
    music = game.add.audio('night3');
    
    
    music2 = game.add.audio('night4');
    music2.loopFull();
    
    seperateSound = game.add.audio('seperate');

    this.isPaused = false;
    
    var level3 = [///////////////////0,0////////////////////////////
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1,0,1,1,2,2,2,2,2,3,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,1],
        [1,1,1,1,0,1,0,1,0,0,0,0,0,3,2,2,2,2,2,2,2,2,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1],
        [1,1,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,3,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1],
        [1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,2,1,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,2,0,0,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,2,0,0,0,1,0,0,0,1,0,1],
        [1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,0,0,0,0,2,0,1,0,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,2,0,0,3,2,2,2,3,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1]

    ];
    
    //a group that holds all the player characters
    this.mushrooms = this.game.add.group();
    p1 = new mushroom(game, 'RED', 1, -60, 42, level3, 11, 14);
    p2 = new mushroom(game, 'BLUE', 2, -70, 32, level3, 11, 16);
    p3 = new mushroom(game, 'together', 3, 480, 224, level3, 2, 14);
    this.mushrooms.add(p1);
    this.mushrooms.add(p2);
    this.mushrooms.add(p3)
    p3.lightRadius = 500;
    p3.alive = true;
    p3.visible = true;
    
    obstacle1 = game.add.sprite(352, 608, 'obstacle1');
    obstacle2 = game.add.sprite(416, 672, 'obstacle2');
    obstacle3 = game.add.sprite(608, 864, 'obstacle3');
    obstacle4 = game.add.sprite(704, 1120, 'obstacle4');
    
    midFire = game.add.sprite(416, 416, 'fireMid');
    midFire.animations.add('moveMidFlames', [0, 1, 2, 3], 12, true);
    midFire.animations.play('moveMidFlames');
    
    this.topFire = game.add.sprite(this.game.camera.x,this.game.camera.y, 'fireTop1');
    //topFire.animations.add('moveTopFlames', []);
    //topFire.animations.play('moveTopFlames', 7, true);
    
    
    overlay = game.add.sprite(0,0, 'backgroundOverlay');
    
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
   
    p1.moving = true;
    p2.moving = true;
    
    var moveCamera = game.add.tween(this.game.camera).to({ y: this.game.world.height - this.game.camera.height}, 50000, Phaser.Easing.Linear.None, true);
    moveCamera.onComplete.add(allowMovement, this); function allowMovement() {   }  
    
    this.shadingAlpha = .5;
    this.shadingAlphaText = this.shadingAlpha.toString();
    
    this.frameCount = 0;
    
    emitter = game.add.emitter(game.world.centerX, 0, 500);
    emitter.makeParticles(['ash1', 'ash2', 'ember1', 'ember2']);
    emitter.start(false, 2000, 1, 0);
    emitter.setRotation(0, 0);
    emitter.setXSpeed(-200,0 );
    emitter.setYSpeed(100, 200);
    let area = new Phaser.Rectangle(game.world.centerX, 0, game.world.width, 1);
    emitter.area = area;
    
    this.topFire = game.add.sprite(this.game.camera.x,this.game.camera.y, 'fireTop1');
    this.topFireFrameNum = 0;
    this.topFireSheet = 1;
};
GamePlayLevel3.prototype.update = function() {
    
    emitter.y = game.camera.y;
    
    
    if(this.frameCount % 6 == 0){
        this.topFire.destroy();
        if(this.topFireSheet == 1){
            this.topFire = game.add.sprite(game.camera.x, game.camera.y, 'fireTop1');
        }else if(this.topFireSheet == 2){
            this.topFire = game.add.sprite(game.camera.x, game.camera.y, 'fireTop2');
        }else if(this.topFireSheet == 3){
            this.topFire = game.add.sprite(game.camera.x, game.camera.y, 'fireTop3');
        }else if(this.topFireSheet == 4){
            this.topFire = game.add.sprite(game.camera.x, game.camera.y, 'fireTop4');
        }
        this.topFire.frame = this.topFireFrameNum;
        this.topFireFrameNum += 1;
        if(this.topFireFrameNum == 4){
            this.topFireFrameNum = 0;
            this.topFireSheet += 1;
            if(this.topFireSheet == 5){
                this.topFireSheet = 1;
            }
        }
        //this.topFire.fixedToCamera = true;
    }
    
    if(p2.mapArrayLocation )
    
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.P)){
        if(this.isPaused){
            this.resumeGame();
        }else{
           this.pause(); 
        }
    }
    
    if(p3.mapArrayLocation[0] == 10 && p3.mapArrayLocation[1] == 14 && !p3.moving){
        p3.moving = true;
        
        //music.pause();
        seperateSound.play();
        //music2.loopFull();
        
        p1.lightRadius = p3.lightRadius/2;
        p2.lightRadius = p3.lightRadius/2;
        
        p3.destroy();
        p1.x = 464;
        p1.y = 480;
        p1.direction = 0;
        p1.legalMove(p1.x, p1.y + 32, 150);
        
        p2.x = 528;
        p2.y = 480;
        p2.direction = 0;
        p2.legalMove(p2.x, p2.y + 32, 150);
    }
    
    if(p3.lightRadius <= 0){
        game.state.start('GameOver');
    }
    
    if(this.frameCount % 10 == 0){
        if(this.shadingAlpha == .9){
            this.shadingAlpha += .1
        }else{
            this.shadingAlpha -= .1;
        }
        this.shadingAlphaText = this.shadingAlpha.toString();
    }
    
    if(this.isPaused){
        this.pauseScreenUpdate();
    }else{this.updateShadowTexture();}
    
    
    
    this.frameCount += 1;
    
};
GamePlayLevel3.prototype.render = function(){
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
GamePlayLevel3.prototype.updateShadowTexture = function(){
    //'rgb(100, 0, 0)'; save for fire level
    // or 300, 100, 200
    this.shadowTexture.context.fillStyle = 'rgb(300, 100, 200)';
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
GamePlayLevel3.prototype.pause = function(){
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
GamePlayLevel3.prototype.pauseScreenUpdate = function(){
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
GamePlayLevel3.prototype.resumeGame = function(){
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
GamePlayLevel3.prototype.quitGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('MainMenu');  
};
GamePlayLevel3.prototype.restartGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('GamePlay');
};