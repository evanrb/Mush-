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
        this.body.setSize(29, 29, 0, 15);
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
    console.log(Math.ceil(32));
    console.log(this.x, this.y);
    this.distanceTraveledX = 0;
    this.distanceTraveledY = 0;
    this.startMovePosX = this.x;
    this.startMovePosY = this.y;
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

mushroom.prototype.update = function(){
    
    game.physics.arcade.collide(this, mapLayer);
    
    this.distanceTraveledX = Math.floor(Math.abs(this.x - this.startMovePosX));
    this.distanceTraveledY = Math.floor(Math.abs(this.y - this.startMovePosY));
    
    if(this.alive == true){
        if(this.player < 3){
            if(this.distanceTraveledX == 16 || this.distanceTraveledY == 16 ){
                console.log(this.x);
                this.x = Math.floor(this.x);
                console.log(this.x);
                this.body.velocity.y = 0;
                this.body.velocity.x = 0;
                this.startMovePosX = this.x;
                this.startMovePosY = this.y;
            }
            if(game.input.keyboard.justPressed(this.upInput)){
                //if(this.distanceTraveledX == 0){//Math.ceil(this.y - 14) % 32 == 0 && this.body.velocity.y == 0){
                    this.body.velocity.y = -32;
                //}
            }else if(game.input.keyboard.justPressed(this.rightInput)){
                //console.log(Math.ceil(this.x - 16), this.body.velocity.x);
                //if(this.distanceTraveledX == 0){
                    this.body.velocity.x = 53;
                //}
            }else if(game.input.keyboard.justPressed(this.leftInput)){
                    this.body.velocity.x = -32;
            }else if(game.input.keyboard.justPressed(this.downInput)){
                    this.body.velocity.y = 32;
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
}