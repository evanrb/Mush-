function mushroom(game, key, playerNum, xPos, yPos){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
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
    this.body.collideWorldBounds = true;
    this.anchor.x = .5;
    this.anchor.y = .5;
    
    if(this.player == 1){
        this.body.setSize(32, 32, 0, 15);
    }else if(this.player == 2){
        this.body.setSize(32, 32, 0, 32);
    }else if(this.player == 3){
        this.body.setSize(32, 32, 0, 15);
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
        this.alive = false;
        this.visible = false;
    }
    
    this.moving = false;
    this.startMovePosX = this.x;
    this.startMovePosY = this.y;
    this.loggedStartPos = false;
    this.negMovement = false;
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

mushroom.prototype.update = function(){
    
    var collided = game.physics.arcade.collide(this, mapLayer);
    
    if(this.alive && !this.moving ){
        if(this.player < 3){
            if(game.input.keyboard.justPressed(this.upInput)){
                this.body.velocity.y = -32;
                this.moving = true;
                this.negMovement = true;
            }else if(game.input.keyboard.justPressed(this.rightInput)){
                this.body.velocity.x = 53;
                this.moving = true;
                this.negMovement = false;
            }else if(game.input.keyboard.justPressed(this.leftInput)){
                this.body.velocity.x = -32;
                this.moving = true;
                this.negMovement = true;
            }else if(game.input.keyboard.justPressed(this.downInput)){
                this.body.velocity.y = 32;
                this.moving = true;
                this.negMovement = false;
            }
        }else{
            if((game.input.keyboard.justPressed(this.p1U))&&(game.input.keyboard.isDown(this.p2U))){
                p3.y -= 32;
                this.game.camera.y -=32;
            }else if ((game.input.keyboard.justPressed(p1R))&&(game.input.keyboard.isDown(p2R))) {
                p3.x += 32;
            }else if((game.input.keyboard.justPressed(p1L))&&(game.input.keyboard.isDown(p2L))){
                p3.x-=32;
            }else if((game.input.keyboard.justPressed(p1D))&&(game.input.keyboard.isDown(p2D))){
                    p3.y+=32;
                    this.game.camera.y +=32;
            }else if(
                (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(!game.input.keyboard.isDown(Phaser.Keyboard.S))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))&&(game.input.keyboard.isDown(Phaser.Keyboard.S))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(game.input.keyboard.isDown(Phaser.Keyboard.W))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.UP))&&(!game.input.keyboard.isDown(Phaser.Keyboard.W))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(game.input.keyboard.isDown(Phaser.Keyboard.D))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))&&(!game.input.keyboard.isDown(Phaser.Keyboard.D))||
                (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(!game.input.keyboard.isDown(Phaser.Keyboard.A))||
                (!game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))&&(game.input.keyboard.isDown(Phaser.Keyboard.A))
            ){
                this.lightRadius -= .06;
            }
        }
        
    }
    if(this.moving){
        if(!this.loggedStartPos){
            this.startMovePosX = Math.floor(this.x);
            this.startMovePosY = Math.floor(this.y);
            this.loggedStartPos = true;
        }
        if(!this.negMovement){
            if(Math.floor(this.x) == this.startMovePosX + 31 || Math.floor(this.y) == this.startMovePosY + 31){
                this.endMotion();
            }
        }else if(this.negMovement){
            if(Math.floor(this.x) == this.startMovePosX - 31 || Math.floor(this.y) == this.startMovePosY - 31){
                this.endMotion();
            }
        }
        if(collided){
            console.log("I made it");
            console.log(this.x, this.startMovePosX);
            var tweenBack = game.add.tween(this).to( { x: this.startMovePosX, y: this.startMovePosY }, 150, Phaser.Easing.Linear.None, true);
            tweenBack.onComplete.add(doSomething, this);function doSomething () {this.endMotion(); console.log("tween complete");}
        }
    }
}
mushroom.prototype.endMotion = function(){
    this.body.velocity.y = 0;
    this.body.velocity.x = 0;
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.loggedStartPos = false;
    this.moving = false;
    console.log(this.x, this.y);
}