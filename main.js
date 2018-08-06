var game = new Phaser.Game(800, 600, Phaser.AUTO);

//the game score
var gameScore;
var pupperSaved;



//main menu
var MainMenu = function(game){};
MainMenu.prototype = {
    preload: function(){
        //text to display start info
        var startText;
        
    },
    create: function(){
        startText = game.add.text(0, game.height/2, "Evan Blank, Classic Clone, Press Space Bar to Start", {font:'34px Arial', fill:'#fff'});
        game.stage.backgroundColor = "#4488AA";
    },
    update: function(){
        //keyboard input to start game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            game.state.start('GamePlay');
        }
    }
}

//gameplay, currently only moving around a placeholder building
var GamePlay = function(game){};
GamePlay.prototype = {
    preload: function(){
        //load atlas
        game.load.atlas('atlas','Assets/classicCloneAssets.png', 'Assets/sprites.json');
        game.load.image('puppy', 'Assets/puppy.png');
        
        
        var playerHeighestPoint;
        var scoreString;
        var scoreText;
        var player;
        var w;
        var buildFloor;
        var buildingArray;
        var playerBuildingIndex;
        var randWindowChoiceFloor;
        var randWindowChoiceWindow;
        var willWindowChange;
        var willThereBeEnemy;
        //var pups;
        var pup;
        var enemyEvent;
        
    },
    create: function(){
        
        pupperSaved = 0;
        //set world size
        game.world.setBounds(0, 0, 800, 1800);
        game.stage.backgroundColor = "#4488AA";
        
        //pups = game.add.group();
        //pups.enableBody = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
       
        
        gameScore = 0;
        scoreString = 'Score: ';
        
        //complete building array
        buildingArray = [[]];
        //array of each floor of windows
        buildFloor = [];
        
        var i;
        var j;
        //add windows and animations creating a building in the form of a 2d array
        for(i = 100; i < game.world.height - 100; i += 50){
            buildFloor = [];
            for (j = 100; j < game.world.width - 100; j += 100) {
                if(Math.floor((Math.random() * 100) + 1) < 95){
                    w = game.add.sprite(j, i, 'atlas', 'openingWindow0');
                    w.animations.add('opening', Phaser.Animation.generateFrameNames('openingWindow', 1, 7, '', 0), 20, false);
                    w.animations.add('closing', Phaser.Animation.generateFrameNames('openingWindow', 7, 0,  '', 0), 10, false);
                    enemyEvent = w.animations.add('enemyAppear', ['openingWindow1','openingWindow2','openingWindow3','openingWindow4','openingWindow5','openingWindow6','openingWindow7','enemy', 'enemy', 'enemy','enemy','enemy','enemy','enemy','enemy','enemy','enemy','enemy','enemy',  'openingWindow7'], 10, false);
                    
                    enemyEvent.onComplete.add(pupDrop, this);
                    
                    buildFloor.push(w);
                }else{
                    buildFloor.push(0);
                }
            } 
            buildingArray.push(buildFloor);
        }
        
        //add player
        player = game.add.sprite(100, 1650, 'atlas', 'sprite13');
        //playerBuildingIndex = [floor player head is on, window player head is over]
        playerBuildingIndex = [buildingArray.length, 0];
        player.animations.add('move', Phaser.Animation.generateFrameNames('sprite', 13, 14, '', 0), 3, true);
        //player.animations.add('idle', )
        //ensure player is on a higher level than building
        player.z += 1;
        player.enableBody = true;

        playerHeighestPoint = player.y;
        
        //set the game camera start position as well as following the player. Dead zone code did not work :(
        game.camera.y = 1200; 
        game.camera.follow(player);
        //game.camera.deadzone = new Phaser.Rectangle(0, 1650, game.width, 150);
        
        //could not fix text to camera so I manually move text
        scoreText = game.add.text(10, 1210, scoreString + gameScore, { font: '34px Arial', fill: '#fadaad' });
        //scoreText.fixedToCamera = true;
    },
    update: function(){
        //get user input
        if(game.input.keyboard.upDuration(Phaser.Keyboard.UP, [30])){
            player.animations.play('move');
            //check if the player can move upward
            if(player.y > 100){
                if(buildingArray[playerBuildingIndex[0]-2][playerBuildingIndex[1]] != 0 && buildingArray[playerBuildingIndex[0]-2][playerBuildingIndex[1]].health != 0 ){
                    //ensure a player is not at the edge before checking surrounding cases
                    if(player.y > 50){
                        player.y -= 50;
                        scoreText.y = player.y + 10;
                        playerBuildingIndex[0] -= 1;
                
                    //make sure to only add score when a player gets to new heights
                        if(player.y < playerHeighestPoint){
                            playerHeighestPoint = player.y;
                            gameScore += 100;
                            scoreText.text = scoreString + gameScore;
                        }
                    }
                }
            }else{game.state.start('ScoreScreen');}
        }
        if (game.input.keyboard.upDuration(Phaser.Keyboard.RIGHT, [20])) {
            //ensure a player is not at the edge before checking surrounding cases
            if(player.x < 600){
                 //check surrounding array elements to see if a window is open near the player
                if(buildingArray[playerBuildingIndex[0]-1][playerBuildingIndex[1]+1] != 0 && buildingArray[playerBuildingIndex[0]-1][playerBuildingIndex[1]+1].health != 0 ){
                    if(player.x < 600){
                        player.x += 100;
                        playerBuildingIndex[1] += 1;
                    }
                }
            }
        }
        if(game.input.keyboard.upDuration(Phaser.Keyboard.LEFT, [20])){
            //ensure a player is not at the edge before checking surrounding cases
            if(player.x > 100){
                 //check surrounding array elements to see if a window is open near the player
                if(buildingArray[playerBuildingIndex[0]-1][playerBuildingIndex[1]-1] != 0 && buildingArray[playerBuildingIndex[0]-1][playerBuildingIndex[1]-1].health !=0 ){
                
                    if(player.x != 100){
                        player.x-=100;
                        playerBuildingIndex[1] -= 1;
                    }
                }
            }
        }
        if(game.input.keyboard.upDuration(Phaser.Keyboard.DOWN, [20])){
            //ensure a player is not at the edge before checking surrounding cases
            if(player.y < 1650){
                //check surrounding array elements to see if a window is open near the player
                if(buildingArray[playerBuildingIndex[0]][playerBuildingIndex[1]] != 0 && buildingArray[playerBuildingIndex[0]][playerBuildingIndex[1]].health != 0 ){
                
                //ensure player cant move very far down
                    if(player.y < 1650 && player.y < playerHeighestPoint + 100 ){
                        playerBuildingIndex[0] +=1;
                        player.y+=50;
                    }
                }
            }
        }
        
        //complex stuff to close and open windows and get enemies to appear all at random and in relative distance of the player
        randWindowChoiceFloor = Math.floor((Math.random() * (playerBuildingIndex[0]-1)) + (playerBuildingIndex[0]-6));
        randWindowChoiceWindow = Math.floor(Math.random() * 5);
        willWindowChange = Math.random() * 100;
        willThereBeEnemy = Math.random() * 3;
        if(willWindowChange >=95 && randWindowChoiceFloor < 33 &&  randWindowChoiceFloor > 0){
            console.log(playerBuildingIndex[0], buildingArray.length, randWindowChoiceFloor, randWindowChoiceWindow);
            if(buildingArray[randWindowChoiceFloor][randWindowChoiceWindow] != 0){
                if(buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].health == 0){
                    buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].health = 1;
                    buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].animations.play('closing');
                   
                }else{
                    buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].health = 0;
                    buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].animations.play('opening');
                    if(willThereBeEnemy > 2 ){
                        buildingArray[randWindowChoiceFloor][randWindowChoiceWindow].animations.play('enemyAppear');
                        
                    }
                    
                }
            }
        }
    }
    
    
    
    
}

//function to drop dogs from enemies
function pupDrop(sprite, animation){
    this.load.atlas('atlas','Assets/classicCloneAssets.png', 'Assets/sprites.json');
    pup = new pupper(game, 'puppy', 0,  sprite.x + 54, sprite.y + 30,);
    pup.enableBody = true;
    game.add.existing(pup);
}

//score screen
var ScoreScreen = function(game){};
ScoreScreen.prototype = {
    preload: function(){
        var gameFinText;
        var gameFinInstr;
    },
    create: function(){
        gameFinText = game.add.text(0, game.height/2, "Good game. Your Score was "+ gameScore, {font:'34px Arial', fill:'#fff'});
        gameFinInstr = game.add.text(0, game.height/2 + 50, "You Saved " + pupperSaved + " Puppers!!!!", {font:'34px Arial', fill:'#fff'});
        gameFinInstr = game.add.text(0, game.height/2 + 100, "Press Space Bar to Restart", {font:'34px Arial', fill:'#fff'});
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            game.state.start('GamePlay');
        }
    }
}






game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('ScoreScreen', ScoreScreen);
game.state.start('MainMenu');
