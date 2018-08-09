function mushroom(game, key, playerNum, xPos, yPos){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    this.player = playerNum;
    
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    
}

mushroom.prototype = Object.create(Phaser.Sprite.prototype);
mushroom.prototype.constructor = mushroom;