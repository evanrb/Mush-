var MainMenu = function(game) {};
//MainMenu.prototype = {
MainMenu.prototype.preload = function() {
    console.log('MainMenu: preload');
    game.load.spritesheet('startButton', 'Assets/start.png', 128, 92);
    game.load.spritesheet('creditsButton', 'Assets/creditsButton.png', 128, 92 );
    game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
    game.load.spritesheet('mainMenuBackground', 'Assets/mainMenu.png', 896, 480);
    game.load.spritesheet('mainMenuLogo1', 'Assets/t1.png', 896, 480);
    game.load.spritesheet('mainMenuLogo2', 'Assets/t2.png', 896, 480);
    game.load.spritesheet('mainMenuLogo3', 'Assets/t3.png', 896, 480);
    game.load.spritesheet('mainMenuLogo4', 'Assets/t4.png', 896, 480);
    game.load.spritesheet('mainMenuLogo5', 'Assets/t5.png', 896, 480);
    game.load.spritesheet('mainMenuLogo6', 'Assets/t6.png', 896, 480);
    game.load.spritesheet('mainMenuLogo7', 'Assets/t7.png', 896, 480);
    game.load.spritesheet('mainMenuLogo8', 'Assets/t8.png', 896, 480);
    game.load.spritesheet('mainMenuLogo9', 'Assets/t9.png', 896, 480);
    game.load.spritesheet('mainMenuLogo10', 'Assets/t10.png', 896, 480);
    
    game.load.image('creditsText', 'Assets/credits.png');
    
    game.load.video('introVideo', ['Video/introVid.mp4']);
    
    //Load Audio
    game.load.audio('menuMusic', ['Sound/mainMenuMusic.mp3']);
    
    var startButton;
    var mouseFly;
    var mouseOver;
};
MainMenu.prototype.create = function() {
    console.log('MainMenu: create');
    var back = game.add.sprite(0, 0, 'mainMenuBackground');
    back.animations.add('liveBackground', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
    back.animations.play('liveBackground');
    
    //Add and loop background music
    music = game.add.audio('menuMusic');
    music.loopFull();
    
    intro = game.add.video('introVideo');
    
    this.logo = game.add.sprite(0, 0, 'mainMenuLogo1');
    
    this.mouseOverS = false;
    this.mouseOverC = false;
    this.startButton = game.add.sprite(game.world.centerX, game.world.centerY + 46, 'startButton');
    this.startButton.anchor.x = .5;
    this.startButton.anchor.x = .5;
    this.startButton.animations.add('mouseOver', [0,1,2,3,4,5], 20, false);
    this.startButton.animations.add('mouseRemoved', [5, 4, 3, 2, 1, 0], 20, false);
    this.startButton.inputEnabled = true;
    this.startButton.events.onInputDown.add(this.startVideo, this);
    
    this.creditsButton = game.add.sprite(game.world.centerX, this.startButton.y + 92, 'creditsButton');
    this.creditsButton.anchor.x = .5;
    this.creditsButton.anchor.x = .5;
    this.creditsButton.animations.add('mouseOverC', [0,1,2,3,4], 20, false);
    this.creditsButton.animations.add('mouseRemovedC', [4, 3, 2, 1, 0], 20, false);
    this.creditsButton.inputEnabled = true;
    this.creditsButton.events.onInputDown.add(this.credits, this);
    
    this.frameChecker = 0;
    this.titleFrameNum = 0;
    this.titleSheet = 1;
    
    this.creditsOn = false;
    
    this.mouseFly = game.add.sprite(0, 0, 'glowfly');
    this.mouseFly.anchor.x = .5;
    this.mouseFly.anchor.y = .5;
    this.mouseFly.alpha = 1;
    game.canvas.addEventListener('mousedown', this.clickSomething);
    game.input.addMoveCallback(this.move, this);
    //game.add.text(52, 200, 'Press ENTER to change states.', { fontSize: '26px', fill: '#FFF', align: "center" });
    
    
    this.creditsBack = game.add.sprite(0, 0, 'mainMenuBackground');
    this.creditsBack.animations.add('liveBackground', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
    this.creditsBack.animations.play('liveBackground');
    this.creditsText = game.add.sprite(0, 0, 'creditsText');
    this.creditsBack.visible = false;
    this.creditsText.visible = false;
    this.clickedDiffFrame = false;
    
    this.creditsBack.inputEnabled = false;
    this.creditsBack.events.onInputDown.add(this.turnCreditsOff, this);
    this.creditsOff = false;
    this.videoOn = false;
};
MainMenu.prototype.update = function() {
    /*if(this.creditsOn == true && game.input.activePointer.leftButton.isDown){
        this.creditsOn = false;
        this.creditsBack.destroy();
        this.creditsText.destroy();
    }*/
    
    if (this.startButton.input.pointerOver() && this.mouseOverS == false){
        this.startButton.animations.play('mouseOver');
        this.mouseOverS = true;
    }else if(!this.startButton.input.pointerOver() && this.mouseOverS == true){
        this.startButton.animations.play('mouseRemoved');
        this.mouseOverS = false;
    }
    if (this.creditsButton.input.pointerOver() && this.mouseOverC == false){
        this.creditsButton.animations.play('mouseOverC');
        this.mouseOverC = true;
    }else if(!this.creditsButton.input.pointerOver() && this.mouseOverC == true){
        this.creditsButton.animations.play('mouseRemovedC');
        this.mouseOverC = false;
    }
    
    
    
    //home made animation loop for title since spritesheet was too large
    if(this.frameChecker % 6 == 0){
        this.logo.destroy();
        if(this.titleSheet == 1){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo1');
        }else if(this.titleSheet == 2){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo2');
        }else if(this.titleSheet == 3){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo3');
        }else if(this.titleSheet == 4){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo4');
        }else if(this.titleSheet == 5){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo5');
        }else if(this.titleSheet == 6){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo6');
        }else if(this.titleSheet == 7){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo7');
        }else if(this.titleSheet == 8){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo8');
        }else if(this.titleSheet == 9){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo9');
        }else if(this.titleSheet == 10){
            this.logo = game.add.sprite(0, -60, 'mainMenuLogo10');
        }
        this.logo.frame = this.titleFrameNum;
        this.titleFrameNum += 1;
        if(this.titleFrameNum == 10){
            this.titleFrameNum = 0;
            this.titleSheet += 1;
            if(this.titleSheet == 11){
                this.titleSheet = 1;
            }
        }
    }
    
    if(this.creditsOn == true){
        this.logo.visible = false;
        if(this.creditsOff){
            this.creditsOn = false;
            this.creditsBack.visible = false;
            this.creditsText.visible = false;
            this.logo.visible = true;
            this.clickedDiffFrame = false;
            this.creditsOff = false;
        }
        this.clickedDiffFrame = true;
    }
    
    if(this.videoOn){
        this.logo.visible = false;
    }
    this.frameChecker += 1;
};
MainMenu.prototype.move = function(pointer, x, y, click){
    if(!click){
        this.mouseFly.x = game.input.mousePointer.x;
        this.mouseFly.y = game.input.mousePointer.y;
    }
};
MainMenu.prototype.startGame = function(){
    //game.input.mouse.requestPointerLock();
    if(!this.creditsOn){
        intro.destroy();
        this.game.world.removeAll();
        music.pause();
        game.state.start('GamePlay');
        //game.state.start('GamePlayLevel2', 100);
        //game.state.start('GamePlayLevel3');
    }
};

MainMenu.prototype.startVideo = function() {
    
    if(!this.creditsOn){
        this.videoOn = true;
        intro.play(false);
        intro.addToWorld(0, 0, 0, 0, 1, 1);
        intro.onComplete.add(this.startGame, this);
        //this.startGame();
    }
    
};

MainMenu.prototype.animationStopped = function(anim){
    this.logo.destroy();
    var nextAnim = 0;
    var speed = 10;
    if(anim == 1){
        this.logo = game.add.sprite(0, 0, 'mainMenuLogo1');
        nextAnim = 2;
    }else if(anim == 2){
        this.logo = game.add.sprite(0, 0, 'mainMenuLogo2');
        nextAnim = 3;
    }else if(anim == 3){
        this.logo = game.add.sprite(0, 0, 'mainMenuLogo3');
        nextAnim = 4;
    }else if(anim == 4){
        this.logo = game.add.sprite(0, 0, 'mainMenuLogo4');
        nextAnim = 5;
    }else if(anim == 5){
        this.logo = game.add.sprite(0, 0, 'mainMenuLogo5');
        nextAnim = 1;
        speed = 1;
    }
    this.logo = game.add.sprite(0, 0, 'mainMenuLogo1');
    var liveLogo = this.logo.animations.add('liveTitle');
    this.logo.animations.play('liveTitle', speed , false);
    liveLogo.onComplete.add(this.animationStopped(nextAnim), this);
};
MainMenu.prototype.credits = function(){
    this.creditsOn = true;
    this.creditsBack.inputEnabled = true;
    this.creditsBack.visible = true;
    this.creditsText.visible = true;
    game.input.mouse.capture = true;
};
MainMenu.prototype.turnCreditsOff = function(){
    this.creditsOff = true;
    this.creditsBack.inputEnabled = false;
};
