var PreloadState = function(game) {};

PreloadState.prototype.preload = function(){
    
    //set up loading graphics
    game.add.sprite(game.world.width - 190 , game.world.height - 55, 'loading');
    loadShrooms = game.add.sprite(game.world.centerX, game.world.centerY, 'mushroomLoad');
    loadShrooms.anchor.x = .5;
    loadShrooms.anchor.y = .5;
    loadShrooms.animations.add('moveLoadingShrooms', [1, 3], 4, true);
    loadShrooms.animations.play('moveLoadingShrooms');
    
    //loading MainMenu Assets
    game.load.spritesheet('startButton', 'Assets/start.png', 128, 92);
    game.load.spritesheet('creditsButton', 'Assets/creditsButton.png', 128, 92 );
    //game.load.spritesheet('glowfly', 'Assets/glowFly.png', 32, 32);
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
    
    
    //load level 1 stuff
    //Load Character and GlowFly spritesheets
    game.load.spritesheet('RED', 'Assets/lessRed.png', 35, 47);
    game.load.spritesheet('BLUE', 'Assets/lessBlue.png',34, 67 );
    game.load.spritesheet('together', 'Assets/joinedSized.png', 70, 70);
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
    game.load.image('backgroundl1', 'Assets/level1-background.png');
    
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
    
    
    //load level 2 Assets
  
    //Load Maze Background
    game.load.image('backgroundl2', 'Assets/level2-background.png');
    game.load.image('rainDrop', 'Assets/rainDrop.png');
    
    game.load.image('invisLight', 'Assets/invisibleLight.png');
    
    //Load Audio
    game.load.audio('night2', ['Sound/2nd-Night.wav']);
    game.load.audio('thunderBuild', ['Sound/buildThunder.mp3']);
    game.load.audio('softStrike', ['Sound/softerStrike.mp3']);
    game.load.audio('rainSound', ['Sound/rain.mp3']);
    
    game.load.video('Video', ['Video/level2End.mp4']);
    
    
    //load level 3
   
    //Load Maze Background
    game.load.image('backgroundl3', 'Assets/level3-background.png');
    game.load.image('backgroundOverlayl3', 'Assets/level3Overlay.png');
    
    game.load.spritesheet('fireTop1', 'Assets/fire1.png', 896, 160);
    game.load.spritesheet('fireTop2', 'Assets/fire2.png', 896, 160);
    game.load.spritesheet('fireTop3', 'Assets/fire3.png', 896, 160);
    game.load.spritesheet('fireTop4', 'Assets/fire4.png', 896, 160);
    
    game.load.spritesheet('fireMid', 'Assets/fireBarrier.png', 385, 768);
    
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
    
    game.load.audio('seperatel3', ['Sound/level1Join.mp3']);
    
    game.load.video('endVideo', ['Video/end.mp4']);
    
    //game over screen
    game.load.image('gameOver', 'Assets/gameOver.png');
};

//switch to main menu
PreloadState.prototype.create = function(){
    this.state.start('MainMenu');
};