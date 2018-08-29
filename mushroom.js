function mushroom(game, key, playerNum, xPos, yPos, map, mapLocation1, mapLocation2){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    this.maze = map;
    
    var p1R = Phaser.Keyboard.D;
    var p1L = Phaser.Keyboard.A;
    var p1U = Phaser.Keyboard.W;
    var p1D = Phaser.Keyboard.S;
    var p2R = Phaser.Keyboard.RIGHT;
    var p2L = Phaser.Keyboard.LEFT;
    var p2U = Phaser.Keyboard.UP;
    var p2D = Phaser.Keyboard.DOWN;
    
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
    
    this.mapArrayLocation = [mapLocation1, mapLocation2];
    
    if(this.player == 1){
        this.upInput = p1U;
        this.rightInput = p1R;
        this.leftInput = p1L;
        this.downInput = p1D;
    }else if(this.player == 2){
        this.upInput = p2U;
        this.rightInput = p2R;
        this.leftInput = p2L;
        this.downInput = p2D;
    }else{
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
    }
    
    this.moving = false;
    
    this.animations.add('idleLeft', [8], 7, true);
    this.animations.add('idleRight', [12], 7, true);
    this.animations.add('idleForward', [0], 7, true);
    this.animations.add('idleBack', [4], 7, true);
    this.animations.add('walkForward', [1, 3], 1, true);
    this.animations.add('walkBack', [5, 7], 1, true);
    this.animations.add('walkLeft', [9, 11], 2, true);
    this.animations.add('walkRight', [13, 15], 2, true);
    
    // just a number if 0 it is facing forward, if 1 facing backward, if 2 facing right, if 3 facing left
    this.direction = 0;
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

mushroom.prototype.update = function () {
    if (this.alive && !this.moving) {
        if (this.player < 3){
            if (game.input.keyboard.justPressed(this.upInput)) {
                this.direction = 1;
                if (this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y - 32, 150);
                    this.mapArrayLocation[0] -= 1;
                } else {
                    this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.rightInput)) {
                this.direction = 2;
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 1] == 0) {
                    this.legalMove(this.x + 32, this.y, 150);
                    this.mapArrayLocation[1] += 1;
                } else {
                    this.hitWall(this.x + 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.leftInput)) {
                this.direction = 3;
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0) {
                    this.legalMove(this.x - 32, this.y, 150);
                    this.mapArrayLocation[1] -= 1;
                } else {
                    this.hitWall(this.x - 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.downInput)) {
                this.direction = 0;
                if (this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y + 32, 150);
                    this.mapArrayLocation[0] += 1;
                } else {
                    this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                }
            }
        }else {
                if (game.input.keyboard.justPressed(this.upInput)){
                    if(this.helper.keyIn(0)){
                        this.direction = 1;
                        if(this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y - 32, 150);
                            this.mapArrayLocation[0] -= 1;
                        }else{
                            this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.upInput2)){
                    if(this.helper.keyIn(0.2)){
                        this.direction = 1;
                        if(this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y - 32, 150);
                            this.mapArrayLocation[0] -= 1;
                        }else{
                            this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
                if (game.input.keyboard.justPressed(this.rightInput)){
                    if(this.helper.keyIn(2)){
                        this.direction = 2;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 2] == 0){
                            this.legalMove(this.x + 32, this.y, 150);
                            this.mapArrayLocation[1] += 1;
                        }else{
                            this.hitWall(this.x + 20, this.y, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.rightInput2)){
                    if(this.helper.keyIn(2.2)){
                        this.direction = 2;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 2] == 0){
                            this.legalMove(this.x + 32, this.y, 150);
                            this.mapArrayLocation[1] += 1;
                        }else{
                            this.hitWall(this.x + 20, this.y, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.leftInput)){
                    if(this.helper.keyIn(1)){
                        this.direction = 3;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0){
                            this.legalMove(this.x - 32, this.y, 150);
                            this.mapArrayLocation[1] -= 1;
                        }else{
                            this.hitWall(this.x - 15, this.y, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.leftInput2)){
                    if(this.helper.keyIn(1.2)){
                        this.direction = 3;
                        if(this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0){
                            this.legalMove(this.x - 32, this.y, 150);
                            this.mapArrayLocation[1] -= 1;
                        }else{
                            this.hitWall(this.x - 15, this.y, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.downInput)){
                    if(this.helper.keyIn(3)){
                        this.direction = 0;
                        if(this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y + 32, 150);
                            this.mapArrayLocation[0] += 1;
                        }else{
                            this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if (game.input.keyboard.justPressed(this.downInput2)){
                    if(this.helper.keyIn(3.2)){
                        this.direction = 0;
                        if(this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0 && this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1] + 1] == 0){
                            this.legalMove(this.x, this.y + 32, 150);
                            this.mapArrayLocation[0] += 1;
                        }else{
                            this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                        }
                    }
                    if(this.helper.total() == 1){
                        this.pressInstanceFrame = this.frameCount;
                    }else if(this.helper.total() > 1){
                        this.helper.clearVals();
                    }
                }
            if(this.frameCount - this.pressInstanceFrame == 30){
                this.lightRadius -= .06;
                this.helper.clearVals();
            }
            this.frameCount += 1;
            console.log(this.mapArrayLocation);
        }
    }
}

mushroom.prototype.legalMove = function(xPos, yPos, speed){
    this.animateMovement();
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() { this.endMotion(); }              
}
mushroom.prototype.hitWall = function(xPos, yPos, speed, endXPos, endYPos, endSpeed){
    this.animateMovement();
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() {
        var tweenBack = game.add.tween(this).to({ x: endXPos, y: endYPos }, endSpeed, Phaser.Easing.Linear.None, true);
        tweenBack.onComplete.add(moveBack, this); function moveBack() { this.endMotion(); }
    }
}
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
}
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
}
mushroom.prototype.getDirection = function(){
    return this.direction;
}
mushroom.prototype.die = function(){
    this.destroy();
}