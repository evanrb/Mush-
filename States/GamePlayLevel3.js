
var GamePlayLevel3 = function(game){};

GamePlayLevel3.prototype.create = function() {
    
   // Set stage background color(required for shading)
    this.game.stage.backgroundColor = 0x78453A;
    game.world.setBounds(0, 0, 960, 1184);
    back = game.add.sprite(0,0, 'backgroundl3');
    
    //Add and loop background music
    music = game.add.audio('night3');
    music2 = game.add.audio('night4');
    music2.loopFull();
    
    this.vid = game.add.video('endVideo');
    
    seperateSound = game.add.audio('seperatel3');

    this.isPaused = false;
    
    //level 3 map 2's represent game world objects and 3,5 represent game world object interaction points 
    var level3 = [///////////////////0,0////////////////////////////
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //0
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1], //1
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1], //2 
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1], //3
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1], //4
        [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1], //5
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1], //6
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1], //7
        [1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1], //8
        [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1], //9
        [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1], //10
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1], //11
        [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1], //12
        [1,0,0,0,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1], //13
        [1,0,1,1,1,1,0,1,0,1,1,2,2,2,2,2,3,0,0,0,1,0,0,0,0,0,0,0,0,1], //14
        [1,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,1], //15
        [1,1,1,1,0,1,0,1,0,0,0,0,0,3,2,2,2,2,2,2,0,0,0,1,0,0,0,1,0,1], //16
        [1,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1], //17
        [1,1,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1], //18
        [1,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1], //19
        [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1], //20
        [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1], //21
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,3,1,0,0,0,0,0,0,0,0,1], //22
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1], //23
        [1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,1], //24
        [1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1], //25
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,2,1,0,0,1,0,0,0,0,0,1], //26
        [1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,2,0,0,1,1,0,1,1,1,0,1], //27
        [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,2,0,0,0,1,0,0,0,1,0,1], //28
        [1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,0,0,0,0,2,0,1,0,1,1,1,0,1,0,1], //29
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,2,0,0,5,2,2,2,2,1,0,1], //30
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1], //31
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //32
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
    
    //add game obstacles
    obstacle1 = game.add.sprite(352, 608, 'obstacle1');
    obstacle2 = game.add.sprite(416, 672, 'obstacle2');
    obstacle3 = game.add.sprite(608, 864, 'obstacle3');
    obstacle4 = game.add.sprite(704, 1120, 'obstacle4');
    
    //add fire sprite for aesthetics
    midFire = game.add.sprite(416, 416, 'fireMid');
    midFire.animations.add('moveMidFlames', [0, 1, 2, 3], 12, true);
    midFire.animations.play('moveMidFlames');
    
    //add the fire to the top of the screen to kill players
    this.topFire = game.add.sprite(this.game.camera.x,this.game.camera.y, 'fireTop1');
    game.physics.enable(this.topFire, Phaser.Physics.ARCADE);
    this.topFire.body.setSize(this.game.camera.width, 80, 0, 0);
    
    //overlat for asethetics
    overlay = game.add.sprite(0,0, 'backgroundOverlayl3');
    
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
    
    //move camera constantly
    this.moveCamera = game.add.tween(this.game.camera).to({ y: this.game.world.height - this.game.camera.height}, 20000, Phaser.Easing.Linear.None, true);
    this.moveCamera.onComplete.add(allowMovement, this); function allowMovement() {   }  
    
    this.shadingAlpha = .5;
    this.shadingAlphaText = this.shadingAlpha.toString();
    
    this.frameCount = 0;
    
    //emitters for ash and ember adapted from Nathan's rain example in particles
    emitter = game.add.emitter(game.world.centerX, 0, 500);
    emitter.makeParticles(['ash1', 'ash2', 'ember1', 'ember2']);
    emitter.start(false, 2000, 1, 0);
    emitter.setRotation(0, 0);
    emitter.setXSpeed(-200,0 );
    emitter.setYSpeed(100, 200);
    let area = new Phaser.Rectangle(game.world.centerX, 0, game.world.width, 1);
    emitter.area = area;
    
    //variables to keep track of artificial animation loop for top fire since sprite was too big for phaser animation
    this.topFireFrameNum = 0;
    this.topFireSheet = 1;
    
    this.pauseOn = false;
    
    this.attach = false;
    
    this.bothExist = true;
};
GamePlayLevel3.prototype.update = function() {
    
    emitter.y = game.camera.y;
    
    //artificial animation loop for top fire
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
        game.physics.enable(this.topFire, Phaser.Physics.ARCADE);
        this.topFire.body.setSize(this.game.camera.width, 80, 0, 0);
    }
    
    //colision detection with the top fire
    var collide1 = game.physics.arcade.collide(p1, this.topFire);
    var collide2 = game.physics.arcade.collide(p2, this.topFire);
    
    if(collide1){
        p1.moving = true;
    }if(collide2){
        p2.moving = true;
    }
    
    //hard coded obstacle inteactions
    if(p2.grabbingObstacle1){
        obstacle1.x = p2.x - 208;
        if(p2.mapArrayLocation[1] == 18 && !p2.moving){
            p2.grabbingObstacle1 = false;
            p1.maze[14][11] = 0;
            p2.maze[14][17] = 1;
        }
    }
    if(p1.grabbingObstacle2){
        obstacle2.x = p1.x + 16;
        if(p1.mapArrayLocation[1] == 8 && !p1.moving){
            p1.grabbingObstacle2 = false;
            p1.maze[16][9] = 1;
            p2.maze[16][19] = 0;
        }
    }
    if(p2.grabbingObstacle3){
        obstacle3.y = p2.y + 32;
        if(p2.mapArrayLocation[0] == 18 && !p2.moving){
            p2.grabbingObstacle3 = false;
            p1.maze[28][19] = 0;
            p2.maze[19][19] = 1;
        }else if(p2.mapArrayLocation[0] == 19 && !p2.moving){
            p1.maze[29][19] = 0;
        }else if(p2.mapArrayLocation[0] == 20 && !p2.moving){
            p1.maze[30][19] = 0;
        }
    }
    if(p1.grabbingObstacle4){
        obstacle4.x = p1.x + 16;
        if(p1.mapArrayLocation[1] == 17 && !p1.moving){
            p1.grabbingObstacle4 = false;
            p1.maze[30][18] = 2;
            p2.maze[30][23] = 0;
        }else if(p1.mapArrayLocation[1] == 18 && !p1.moving){
            p1.maze[30][19] = 2;
            p2.maze[30][24] = 0;
        }else if(p1.mapArrayLocation[1] == 19 && !p1.moving){
            p1.maze[30][20] = 2;
            p2.maze[30][25] = 0;
        }else if(p1.mapArrayLocation[1] == 20 && !p1.moving){
            p1.maze[30][21] = 2;
            p2.maze[30][26] = 0;
        }
    }
    if(p2.grabbingObstacle4){
        obstacle4.x = p2.x - 168 - 32;
        if(!p1.moving){
            p2.grabbingObstacle4 = false;
            p1.maze[30][22] = 0;
            p1.maze[30][21] = 2;
            p1.maze[30][17] = 2;
            p2.maze[30][21] = 2;
        }
    }
    
    if(p2.y + 32 >= 1184){
        if(this.bothExist){
            p2.destroy();
            this.bothExist = false;
        }else{
            this.playEndVideo();
        }
    }
    if(p1.y + 32 >= 1184){
        if(this.bothExist){
            p1.destroy();
            this.bothExist = false;
        }else{
            this.playEndVideo();
        }
    }
    
    if(this.pauseOn){
        this.topFire.visible = false;
    }
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.P)){
        if(this.isPaused){
            this.resumeGame();
        }else{
           this.pause(); 
        }
    }
    
    //seperate players when they reach designated location
    if(p3.mapArrayLocation[0] == 10 && p3.mapArrayLocation[1] == 14 && !p3.moving){
        p3.moving = true;
        
        //music.pause();
        seperateSound.play();
        //music2.loopFull();
        
        p1.lightRadius = p3.lightRadius/2;
        p2.lightRadius = p3.lightRadius/2;
        
        p3.destroy();
        p1.x = 464;
        p1.y = 490;
        p1.direction = 0;
        p1.legalMove(p1.x, p1.y + 32, 150);
        
        p2.x = 528;
        p2.y = 480;
        p2.direction = 0;
        p2.legalMove(p2.x, p2.y + 32, 150);
    }
    
    //meant to make a slight shading change it lighting for aesthetics
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
//debug code
GamePlayLevel3.prototype.render = function(){
    game.debug.body(this.topFire);
    //game.debug.body(p2);
//    game.debug.body(map);
//    for(i = 0; i < this.FLIES.length; i++){
//        game.debug.body(this.FLIES[i]);
//    }
//    if(transformed){
//        game.debug.body(p3);
//    }
};
//update the lighting effects CODE ADAPTED FROM: https://gamemechanicexplorer.com/#lighting-3
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
    this.moveCamera.pause();
    this.topFire.visible = false;
    this.pauseOn = true;
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
    this.topFire.visible = true;
    this.pauseOn = false;
    this.moveCamera.resume();
    p1.moving = false;
    p2.moving = false;
    p3.moving = false;
    this.isPaused = false;
    this.pauseBackground.destroy();
    this.restartButton.destroy();
    this.quitButton.destroy();
};
GamePlayLevel3.prototype.quitGame = function(){
    music2.pause();
    this.game.world.removeAll();
    game.state.start('BootState');  
};
GamePlayLevel3.prototype.restartGame = function(){
    music2.pause();
    this.game.world.removeAll();
    game.state.start('GamePlay');
};
//play the ending video
GamePlayLevel3.prototype.playEndVideo = function(){
    this.vid.play(false);
    this.vid.addToWorld(game.camera.x, game.camera.y, 0, 0, 1, 1);
    this.vid.onComplete.add(this.quitGame, this);
};
