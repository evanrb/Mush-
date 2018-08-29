
var game = new Phaser.Game(896, 480, Phaser.AUTO, 'game');//, '', { preload: preload, create: create, update: update });

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
    
    this.logo = game.add.sprite(0, 0, 'mainMenuLogo1');
    
    this.mouseOverS = false;
    this.mouseOverC = false;
    this.startButton = game.add.sprite(game.world.centerX, game.world.centerY + 46, 'startButton');
    this.startButton.anchor.x = .5;
    this.startButton.anchor.x = .5;
    this.startButton.animations.add('mouseOver', [0,1,2,3,4,5], 20, false);
    this.startButton.animations.add('mouseRemoved', [5, 4, 3, 2, 1, 0], 20, false);
    this.startButton.inputEnabled = true;
    this.startButton.events.onInputDown.add(this.startGame, this);
    
    this.creditsButton = game.add.sprite(game.world.centerX, this.startButton.y + 92, 'creditsButton');
    this.creditsButton.anchor.x = .5;
    this.creditsButton.anchor.x = .5;
    this.creditsButton.animations.add('mouseOverC', [0,1,2,3,4], 20, false);
    this.creditsButton.animations.add('mouseRemovedC', [4, 3, 2, 1, 0], 20, false);
    this.creditsButton.inputEnabled = true;
    this.creditsButton.events.onInputDown.add(this.startGame, this);
    
    this.frameChecker = 0;
    this.titleFrameNum = 0;
    this.titleSheet = 1;
    
    this.mouseFly = game.add.sprite(0, 0, 'glowfly');
    this.mouseFly.anchor.x = .5;
    this.mouseFly.anchor.y = .5;
    this.mouseFly.alpha = 1;
    game.canvas.addEventListener('mousedown', this.clickSomething);
    game.input.addMoveCallback(this.move, this);
    //game.add.text(52, 200, 'Press ENTER to change states.', { fontSize: '26px', fill: '#FFF', align: "center" });
};
MainMenu.prototype.update = function() {
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
    this.game.world.removeAll();
    music.pause();
    //game.state.start('GamePlay');
    game.state.start('GamePlayLevel2', 100);
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

var GamePlay = function(game){};
GamePlay.prototype.preload = function() {
 
    //Load Character and GlowFly spritesheets
    game.load.spritesheet('RED', 'Assets/Red.png', 32, 47);
    game.load.spritesheet('BLUE', 'Assets/Blue.png',32, 64 );
    game.load.spritesheet('together', 'Assets/joined.png', 64, 64)
    game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
    
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
        this.notConnected = false;
        sepSound.play();
        
        var moveCamera = game.add.tween(this.game.camera).to({ x: this.game.camera.x, y: 208 }, 2000, Phaser.Easing.Linear.None, true);
        moveCamera.onComplete.add(allowMovement, this); function allowMovement() { p3.moving = false; game.camera.follow(p3);}  
        
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
        p1.destroy();
        p2.destroy();
        
    }
    if(p3.y + 32 == 1600){
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


var GamePlayLevel2 = function(game, p3Rad){};
GamePlayLevel2.prototype.preload = function() {
 
    //Load Character
    game.load.spritesheet('together', 'Assets/joined.png', 64, 64)
  
    //Load Maze Background
    game.load.image('background', 'Assets/level2-background.png');
    game.load.image('rainDrop', 'Assets/rainDrop.png');
    
    game.load.image('invisLight', 'Assets/invisibleLight.png');
    game.load.image('pauseBackground', 'Assets/pauseBackground.png');
    game.load.spritesheet('quitButton', 'Assets/quit.png', 128, 92);
    game.load.spritesheet('restartButton', 'Assets/restart.png', 128, 92);
    
    //Load Audio
    game.load.audio('night2', ['Sound/2nd-Night.wav']);
    game.load.audio('thunderBuild', ['Sound/buildThunder.mp3']);
    game.load.audio('softStrike', ['Sound/strike.mp3']);
    
    var mushrooms;
    var back;
    var p3;
    var markerP3;
    var mapArray;
    var music;
    var isPaused;
};
GamePlayLevel2.prototype.create = function() {
    
   // Set stage background color(required for shading)
    this.game.stage.backgroundColor = 0x78453A;
    game.world.setBounds(0, 0, 1600, 1600);
    back = game.add.sprite(0,0, 'background');
    
    //Add and loop background music
    music = game.add.audio('night2');
    music.loopFull();
    music.volume = 0;
    
    thunderBuild = game.add.audio('thunderBuild');
    thunderBuild.loopFull();
    thunderBuild.volume = .8;
    
    this.strikeSound = game.add.audio('softStrike');
    this.strikeSound.allowMultiple = true;
    this.strikeSound.volume = 1;
    
    this.isPaused = false;
    
    var level2 = [///////////////////////////////////////0,0/////////////////////////////
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
    ];
    
    
    //a group that holds all the player characters
    this.mushrooms = this.game.add.group();
    p3 = new mushroom(game, 'together', 3, game.world.centerX, 32, level2, 1, 24);
    p3.alive = true;
    p3.visible = true;
    p3.lightRadius = 100;
    game.camera.follow(p3);
    this.mushrooms.add(p3)   
    
     //rain taken from nathan's eexample particles04.js, thanks Nathan.
    emitter = game.add.emitter(game.world.centerX, 0, 500);
    emitter.makeParticles(['rainDrop']);
    emitter.start(false, 1600, 1, 0);
    emitter.setRotation(0, 0);
    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(300, 500);
    let area = new Phaser.Rectangle(game.world.centerX, 0, game.world.width, 1);
    emitter.area = area;
    
    invisLight = game.add.sprite(game.world.centerX, game.world.centerY, 'invisLight');
    
    
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
    this.lights.add(invisLight);
    this.lights.add(p3);
    invisLight.exists = false;
    this.frameCount = 0;
    this.frameCountInstance = 0;
    
     // Create a bitmap for the lightning bolt texture
    this.lightningBitmap = this.game.add.bitmapData(896, 480);

    // Create a sprite to hold the lightning bolt texture
    this.lightning = this.game.add.image(0 , 0, this.lightningBitmap);

    // Set the anchor point of the sprite to center of the top edge
    // This allows us to position the lightning by simply specifiying the
    // x and y coordinate of where we want the lightning to appear from.
    this.lightning.anchor.setTo(0.5, 0);

    // Trigger lightning on mouse clicks and taps
    //this.game.input.onTap.add(this.zap, this);
    
    this.lightFrameInstance = 0;
    this.lightAlpha = 1;
    this.lightAlphaString = this.lightAlpha.toString();
};
GamePlayLevel2.prototype.update = function() {
   
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.P)){
        if(this.isPaused){
            this.resumeGame();
        }else{
           this.pause(); 
        }
    }
    
    if(p3.y + 32 == 1600){
        game.state.start('GameOver');
    }
    
    if(this.isPaused){
        this.pauseScreenUpdate();
    }else{this.updateShadowTexture();}
    
    if(invisLight.exists = true && this.frameCount - this.lightFrameInstance < 350){
        this.lightAlpha -= .01;
        this.lightAlphaString = this.lightAlpha.toString();
        //this.lightFrameInstance = this.frameCount;
    }
    
    if(this.frameCount % 300 == 0){
        this.lightning.x = this.game.camera.x + (Math.random() * 896);
        this.zap();
        invisLight.exists = true;
        this.lightAlpha = 1;
        this.lightAlphaString = this.lightAlpha.toString();
        this.lightFrameInstance = this.frameCount;
        this.frameCountInstance = this.frameCount;
    }
    if(this.frameCount - this.frameCountInstance == 480){
        invisLight.exists = false;
        this.strikeSound.play();
    }
    
    
    this.frameCount += 1;
};
GamePlayLevel2.prototype.render = function(){
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
// Create a lightning bolt
GamePlayLevel2.prototype.zap = function() {
    console.log("in zap");
    // Create the lightning texture
    this.createLightningTexture(this.lightningBitmap.width/2, 0, 200, 3, false);

    // Make the lightning sprite visible
    this.lightning.alpha = 1;

    // Fade out the lightning sprite using a tween on the alpha property
    // Check out the "Easing function" examples for more info.
    this.game.add.tween(this.lightning)
        .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
        .start();
};
// This function creates a texture that looks like a lightning bolt
GamePlayLevel2.prototype.createLightningTexture = function(x, y, segments, boltWidth, branch) {
    // Get the canvas drawing context for the lightningBitmap
    var ctx = this.lightningBitmap.context;
    var width = this.lightningBitmap.width;
    var height = this.lightningBitmap.height;

    // Our lightning will be made up of several line segments starting at
    // the center of the top edge of the bitmap and ending at the bottom edge
    // of the bitmap.

    // Clear the canvas
    if (!branch) ctx.clearRect(0, 0, width, height);

    // Draw each of the segments
    for(var i = 0; i < segments; i++) {
        // Set the lightning color and bolt width
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = boltWidth;

        ctx.beginPath();
        ctx.moveTo(x, y);

        // Calculate an x offset from the end of the last line segment and
        // keep it within the bounds of the bitmap
        if (branch) {
            // For a branch
            x += this.game.rnd.integerInRange(-10, 10);
        } else {
            // For the main bolt
            x += this.game.rnd.integerInRange(-30, 30);
        }
        if (x <= 10) x = 10;
        if (x >= width-10) x = width-10;

        // Calculate a y offset from the end of the last line segment.
        // When we've reached the ground or there are no more segments left,
        // set the y position to the height of the bitmap. For branches, we
        // don't care if they reach the ground so don't set the last coordinate
        // to the ground if it's hanging in the air.
        if (branch) {
            // For a branch
            y += this.game.rnd.integerInRange(10, 20);
        } else {
            // For the main bolt
            y += this.game.rnd.integerInRange(20, height/segments);
        }
        if ((!branch && i == segments - 1) || y > height) {
            y = height;
        }

        // Draw the line segment
        ctx.lineTo(x, y);
        ctx.stroke();

        // Quit when we've reached the ground
        if (y >= height) break;

        // Draw a branch 20% of the time off the main bolt only
        if (!branch) {
            if (Phaser.Utils.chanceRoll(20)) {
                // Draws another, thinner, bolt starting from this position
                this.createLightningTexture(x, y, 10, 1, true);
            }
        }
    }

    // This just tells the engine it should update the texture cache
    this.lightningBitmap.dirty = true;
};
GamePlayLevel2.prototype.updateShadowTexture = function(){
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
           if(light.player === 3){
                this.LIGHT_RADIUS = p3.lightRadius;
            }else if(light.key == "invisLight" && light.exists){
                this.LIGHT_RADIUS = 15000;
            }
        
            var radius = this.LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);
        // Draw circle of light with a soft edge
            var gradient =
                this.shadowTexture.context.createRadialGradient(
                    light.x, light.y,this.LIGHT_RADIUS * .05,
                    light.x, light.y, radius);
            //changing gradient color
            if(light.key == "invisLight" && light.exists){
                gradient.addColorStop(1, 'rgba(100, 255, 255,' + this.lightAlphaString + ')');
            }else{
                gradient.addColorStop(0, 'rgba(100, 255, 255, 1.0)');
            }
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
GamePlayLevel2.prototype.pause = function(){
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
GamePlayLevel2.prototype.pauseScreenUpdate = function(){
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
GamePlayLevel2.prototype.resumeGame = function(){
    p3.moving = false;
    this.isPaused = false;
    this.pauseBackground.destroy();
    this.restartButton.destroy();
    this.quitButton.destroy();
};
GamePlayLevel2.prototype.quitGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('MainMenu');  
};
GamePlayLevel2.prototype.restartGame = function(){
    music.pause();
    this.game.world.removeAll();
    game.state.start('GamePlay');
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
game.state.add('GamePlayLevel2', GamePlayLevel2);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
//game.state.add('game', GamePlay, true);
