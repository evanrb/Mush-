var MainMenu = function(game) {};
//MainMenu.prototype = {

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
        //game.state.start('GamePlay');
        //game.state.start('GamePlayLevel2', 100);
        game.state.start('GamePlayLevel3');
    }
};

MainMenu.prototype.startVideo = function() {
    
    if(!this.creditsOn){
        this.videoOn = true;
        //intro.play(false);
        //intro.addToWorld(0, 0, 0, 0, 1, 1);
        //intro.onComplete.add(this.startGame, this);
        this.startGame();
    }
    
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
