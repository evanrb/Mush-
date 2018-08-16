function glowFly(game, key, xPos, yPos){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    this.lightRadius = 10;
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.body.setSize(15, 15, 8, 8);
    this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7, true);
    this.animations.play('move');
}

glowFly.prototype = Object.create(Phaser.Sprite.prototype);
glowFly.prototype.constructor = glowFly;

glowFly.prototype.update = function() {
    var collide1 = game.physics.arcade.collide(player, this);
    var collide2 = game.physics.arcade.collide(p2, this);
    var collide3 = game.physics.arcade.collide(p3, this)
    if(collide1){
        this.exists = false;
        twinkle.play();
        player.lightRadius += 10;
    }else if(collide2){
        this.exists = false;
        twinkle.play();
        p2.lightRadius += 10;
    }else if(collide3){
        this.exists = false;
        twinkle.play();
        p3.lightRadius += 10;
    }
}

