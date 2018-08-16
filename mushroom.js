function mushroom(game, key, playerNum, xPos, yPos){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    this.player = playerNum;
    this.lightRadius = 70;
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.anchor.x = .5;
    this.anchor.y = .5;
    
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;

