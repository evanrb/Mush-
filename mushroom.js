function mushroom(game, key, playerNum, xPos, yPos, map){
    
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
        this.mapArrayLocation = [1, 1];
    }else if(this.player == 2){
        this.body.setSize(32, 32, 0, 32);
        this.mapArrayLocation = [1, 26];
    }else if(this.player == 3){
        this.body.setSize(32, 32, 0, 15);
        this.mapArrayLocation = [14, 14];
    }
    
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
    }
    
    this.moving = false;
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

mushroom.prototype.update = function () {
    if (this.alive && !this.moving) {
        if (this.player < 3){
            if (game.input.keyboard.justPressed(this.upInput)) {
                if (this.maze[this.mapArrayLocation[0] - 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y - 32, 150);
                    this.mapArrayLocation[0] -= 1;
                } else {
                    this.hitWall(this.x, this.y - 5, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.rightInput)) {
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] + 1] == 0) {
                    this.legalMove(this.x + 32, this.y, 150);
                    this.mapArrayLocation[1] += 1;
                } else {
                    this.hitWall(this.x + 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.leftInput)) {
                if (this.maze[this.mapArrayLocation[0]][this.mapArrayLocation[1] - 1] == 0) {
                    this.legalMove(this.x - 32, this.y, 150);
                    this.mapArrayLocation[1] -= 1;
                } else {
                    this.hitWall(this.x - 5, this.y, 150, this.x, this.y, 150);
                }
            } else if (game.input.keyboard.justPressed(this.downInput)) {
                if (this.maze[this.mapArrayLocation[0] + 1][this.mapArrayLocation[1]] == 0) {
                    this.legalMove(this.x, this.y + 32, 150);
                    this.mapArrayLocation[0] += 1;
                } else {
                    this.hitWall(this.x, this.y + 5, 150, this.x, this.y, 150);
                }
            }
        }else {
            if ((game.input.keyboard.justPressed(this.upInput)) && (game.input.keyboard.isDown(this.upInput2))) {
                p3.y -= 32;
                this.game.camera.y -= 32;
            } else if ((game.input.keyboard.justPressed(this.rightInput)) && (game.input.keyboard.isDown(this.rightInput2))) {
                p3.x += 32;
            } else if ((game.input.keyboard.justPressed(this.leftInput)) && (game.input.keyboard.isDown(this.leftInput2))) {
                p3.x -= 32;
            } else if ((game.input.keyboard.justPressed(this.downInput)) && (game.input.keyboard.isDown(this.downInput2))) {
                p3.y += 32;
                this.game.camera.y += 32;
            } else if (
                (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)) && (!game.input.keyboard.isDown(Phaser.Keyboard.S)) ||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)) && (game.input.keyboard.isDown(Phaser.Keyboard.S)) ||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.UP)) && (game.input.keyboard.isDown(Phaser.Keyboard.W)) ||
                (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) && (!game.input.keyboard.isDown(Phaser.Keyboard.W)) ||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) && (game.input.keyboard.isDown(Phaser.Keyboard.D)) ||
                (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) && (!game.input.keyboard.isDown(Phaser.Keyboard.D)) ||
                (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) && (!game.input.keyboard.isDown(Phaser.Keyboard.A)) ||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) && (game.input.keyboard.isDown(Phaser.Keyboard.A))
                ){this.lightRadius -= .06; }
        }
    }
}

mushroom.prototype.legalMove = function(xPos, yPos, speed){
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() { this.endMotion(); }              
}
mushroom.prototype.hitWall = function(xPos, yPos, speed, endXPos, endYPos, endSpeed){
    this.moving = true;
    var tween = game.add.tween(this).to({ x: xPos, y: yPos }, speed, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(doSomething, this); function doSomething() {
        var tweenBack = game.add.tween(this).to({ x: endXPos, y: endYPos }, endSpeed, Phaser.Easing.Linear.None, true);
        tweenBack.onComplete.add(moveBack, this); function moveBack() { this.endMotion(); }
    }
}
mushroom.prototype.endMotion = function(){
    this.moving = false;
}
mushrool.prototype.die = function(){
    this.destroy();
}