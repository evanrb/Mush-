function mushroom(game, key, playerNum, xPos, yPos, map, mapLocation1, mapLocation2){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    //add the level array for mushrooms refenece
    this.maze = map;
    
    var p1R = Phaser.Keyboard.D;
    var p1L = Phaser.Keyboard.A;
    var p1U = Phaser.Keyboard.W;
    var p1D = Phaser.Keyboard.S;
    var p2R = Phaser.Keyboard.RIGHT;
    var p2L = Phaser.Keyboard.LEFT;
    var p2U = Phaser.Keyboard.UP;
    var p2D = Phaser.Keyboard.DOWN;
    
    //player num to keep track of player
    this.player = playerNum;
    
    this.lightRadius = 70;
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.collideWorldBounds = true;
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.mapArrayLocation = [-1, -1];
    if(this.player == 1){
        this.body.setSize(32, 32, 0, 15);
    }else if(this.player == 2){
        this.body.setSize(32, 32, 0, 32);
    }else if(this.player == 3){
        this.body.setSize(64, 32, 0, 15);
        this.frameCount = 0;
    }
    
    //set the mushrooms array location to keep track of maze collision
    this.mapArrayLocation = [mapLocation1, mapLocation2];
    
    //set up variables that are player specific
    if(this.player == 1){
        this.upInput = p1U;
        this.rightInput = p1R;
        this.leftInput = p1L;
        this.downInput = p1D;
        this.createP1P2Animations();
    }else if(this.player == 2){
        this.upInput = p2U;
        this.rightInput = p2R;
        this.leftInput = p2L;
        this.downInput = p2D;
        this.createP1P2Animations();
    }else{
        this.y -= 5;
        this.upInput = p1U;
        this.rightInput = p1R;
        this.leftInput = p1L;
        this.downInput = p1D;
        this.upInput2 = p2U;
        this.rightInput2 = p2R;
        this.leftInput2 = p2L;
        this.downInput2 = p2D;
        this.alive = false;
        this.visible = false;
        this.helper = new p3MovementHelper();
        this.pressInstanceFrame = 0;
        this.movementPenalty = 10;
        this.hasLight = true;
        this.inputWorked = false;
        this.createP3Animations();
    }
    
    //moving is basically a pause boolean
    this.moving = false;
    
    //booleans to check if obstacles are grabbed in level 3
    this.grabbingObstacle1 = false;
    this.grabbingObstacle2 = false;
    this.grabbingObstacle3 = false;
    this.grabbingObstacle4 = false;
    
    //animation declarations
    this.animations.add('idleLeft', [6], 7, true);
    this.animations.add('idleRight', [9], 7, true);
    this.animations.add('idleForward', [0], 7, true);
    this.animations.add('idleBack', [3], 7, true);
    this.animations.add('walkForward', [1, 2], 5, true);
    this.animations.add('walkBack', [4, 5], 5, true);
    this.animations.add('walkLeft', [7, 8], 5, true);
    this.animations.add('walkRight', [10, 11], 5, true);
    
    
    //if 0 it is facing forward, if 1 facing backward, if 2 facing right, if 3 facing left
    this.direction = 0;
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

mushroom.prototype.update = function () {
    if (this.alive && !this.moving) {
        if (this.player < 3){
            //restrict player motion when objects are grabbed
            if (game.input.keyboard.justPressed(this.upInput) && !this.grabbingObstacle2 && !this.grabbingObstacle1 && !this.grabbingObstacle4) {
                this.direction = 1;
                //check if the maze has a valid movement location in the necessary direction
                if (this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y - 32, 150);
                    //update the players maze array location appropriately
                    this.mapArrayLocation[0] -= 1;
                }else{
                    //player pressed input toward an invalid location
                    this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.rightInput) && !this.grabbingObstacle3 && !this.grabbingObstacle2 && !this.grabbingObstacle4) {
                this.direction = 2;
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 1] == 0) {
                    this.legalMove(this.x + 32, this.y, 150);
                    this.mapArrayLocation[1] += 1;    
                }else{
                    if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 1] == 3){
                        this.grabbingObstacle2 = true;
                    }
                    if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 1] == 5){
                        this.grabbingObstacle4 = true;
                    }
                    this.hitWall(this.x + 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.leftInput) && !this.grabbingObstacle3 && !this.grabbingObstacle1) {
                this.direction = 3;
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0 || this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 5) {
                    if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 5){
                        this.grabbingObstacle4 = true;
                    }
                    this.legalMove(this.x - 32, this.y, 150);
                    this.mapArrayLocation[1] -= 1;
                } else{
                    if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 3) {
                        this.grabbingObstacle1 = true;
                    }
                    this.hitWall(this.x - 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.downInput) && !this.grabbingObstacle2 && !this.grabbingObstacle1 && !this.grabbingObstacle4 && !this.grabbingObstacle3 ) {
                this.direction = 0;
                if (this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y + 32, 150);
                    this.mapArrayLocation[0] += 1;
                } else{
                    if (this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 3) {
                        this.grabbingObstacle3 = true;
                    }
                    this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                }
            }
        }else {
            //set the light radius to the global variable
            this.lightRadius = p3Radius;
            //use movement helper to check if up input has already been pressed
            if (game.input.keyboard.justPressed(this.upInput) && this.helper.canTakeU1){
                //check movement helper if both up inputs are pressed
                if(this.helper.keyIn(0)){
                    this.inputWorked = true;
                    this.direction = 1;
                    if(this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1] + 1] == 0){
                        this.legalMove(this.x, this.y - 32, 150);
                        this.mapArrayLocation[0] -= 1;
                    }else{
                        this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                    }
                //check if more than 1 input has been pressed and the two correct inputs have not been pressed
                }else if(this.helper.total() > 1){
                    p3Radius -= this.movementPenalty;
                }
                //begin a frame counter if a single input is pressed
                if(this.helper.total() == 1){
                    this.pressInstanceFrame = this.frameCount;
                //if more than 1 input has been pressed than reset movement helper values
                }else if(this.helper.total() > 1){
                    this.helper.clearVals();
                }
            }
            if (game.input.keyboard.justPressed(this.upInput2) && this.helper.canTakeU2){
                    if(this.helper.keyIn(0.2)){
                        this.inputWorked = true;
                        this.direction = 1;
                        if(this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y - 32, 150);
                            this.mapArrayLocation[0] -= 1;
                        }else{
                            this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
                if (game.input.keyboard.justPressed(this.rightInput) && this.helper.canTakeR1){
                    if(this.helper.keyIn(2)){
                        this.inputWorked = true;
                        this.direction = 2;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 2] == 0){
                            this.legalMove(this.x + 32, this.y, 150);
                            this.mapArrayLocation[1] += 1;
                        }else{
                            this.hitWall(this.x + 20, this.y, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.rightInput2) && this.helper.canTakeR2){
                    if(this.helper.keyIn(2.2)){
                        this.inputWorked = true;
                        this.direction = 2;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 2] == 0){
                            this.legalMove(this.x + 32, this.y, 150);
                            this.mapArrayLocation[1] += 1;
                        }else{
                            this.hitWall(this.x + 20, this.y, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.leftInput) && this.helper.canTakeL1){
                    if(this.helper.keyIn(1)){
                        this.inputWorked = true;
                        this.direction = 3;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0){
                            this.legalMove(this.x - 32, this.y, 150);
                            this.mapArrayLocation[1] -= 1;
                        }else{
                            this.hitWall(this.x - 15, this.y, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.leftInput2) && this.helper.canTakeL2){
                    if(this.helper.keyIn(1.2)){
                        this.inputWorked = true;
                        this.direction = 3;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0){
                            this.legalMove(this.x - 32, this.y, 150);
                            this.mapArrayLocation[1] -= 1;
                        }else{
                            this.hitWall(this.x - 15, this.y, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.downInput) && this.helper.canTakeD1){
                    if(this.helper.keyIn(3)){
                        this.inputWorked = true;
                        this.direction = 0;
                        if(this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y + 32, 150);
                            this.mapArrayLocation[0] += 1;
                        }else{
                            this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.downInput2) && this.helper.canTakeD2){
                    if(this.helper.keyIn(3.2)){
                        this.inputWorked = true;
                        this.direction = 0;
                        if(this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y + 32, 150);
                            this.mapArrayLocation[0] += 1;
                        }else{
                            this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                        }
                    }else if(this.helper.total() > 1){
                        p3Radius -= this.movementPenalty;
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            //if an input has been pressed and a half second goes by without pressing another than incur movement penalty 
            if(this.frameCount - this.pressInstanceFrame == 30 && !this.inputWorked){
                this.inputWorked = false;
                p3Radius -= this.movementPenalty;
                this.helper.clearVals();
            }
            this.frameCount += 1;
        }
    }
}

//move the player when there is a valid move input
mushroom.prototype.legalMove = function(xPos, yPos, speed){
    this.animateMovement();
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() { this.endMotion(); }              
};
//crash player into a wall on invalid movement input
mushroom.prototype.hitWall = function(xPos, yPos, speed, endXPos, endYPos, endSpeed){
    this.animateMovement();
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() {
        var tweenBack = game.add.tween(this).to({ x: endXPos, y: endYPos }, endSpeed, Phaser.Easing.Linear.None, true);
        tweenBack.onComplete.add(moveBack, this); function moveBack() { this.endMotion(); }
    }
};

mushroom.prototype.createP1P2Animations = function(){
    this.animations.add('fireLeft', [17, 18, 19, 20, 21], 3, false);
    this.animations.add('fireRight', [22, 23, 24, 25, 26], 3, false);
    this.animations.add('fireForward', [12, 13, 14, 15, 16], 3, false);
    this.animations.add('bumpForward', [27], 1, true);
    this.animations.add('bumpBack', [28], 1, true);
    this.animations.add('bumpLeft', [29, 30], 2, false);
    this.animations.add('bumpRight', [31, 32], 2, false);
};
mushroom.prototype.createP3Animations = function(){
    this.animations.add('fireLeft', [29, 30, 31, 32, 33, 34, 35, 36], 3, false);
    this.animations.add('fireRight', [37, 38, 39, 40, 41, 42, 43, 44], 3, false);
    this.animations.add('fireForward', [21, 22, 23, 24, 25, 26, 27], 3, false);
    this.animations.add('fireBackward', [28, 22, 23, 24, 25, 26, 27], 3, false);
    this.animations.add('bumpForward', [45], 1, false);
    this.animations.add('bumpBack', [46], 1, false);
    this.animations.add('bumpLeft', [47, 48], 2, false);
    this.animations.add('bumpRight', [49, 50], 2, false);
     this.animations.add('lightsOut', [12, 13, 14, 15, 16, 17, 18, 19, 20], 3, false);
};
//set the idle direction of player
mushroom.prototype.endMotion = function(){
    if(this.direction == 0){
        this.animations.play('idleForward');
    }else if(this.direction == 1){
        this.animations.play('idleBack');
    }else if(this.direction == 2){
        this.animations.play('idleRight');
    }else if(this.direction == 3){
        this.animations.play('idleLeft');
    }
    this.moving = false;
};
//animate player motion
mushroom.prototype.animateMovement = function(){
    if(this.direction == 0){
        this.animations.play('walkForward');
    }else if(this.direction == 1){
        this.animations.play('walkBack');
    }else if(this.direction == 2){
        this.animations.play('walkRight');
    }else if(this.direction == 3){
        this.animations.play('walkLeft');
    }
};
mushroom.prototype.playBurnAnimation = function(){
    
};
mushroom.prototype.getDirection = function(){
    return this.direction;
}
mushroom.prototype.die = function(){
    this.destroy();
}