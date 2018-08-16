function mushroom(game, key, playerNum, xPos, yPos){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
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
    
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

