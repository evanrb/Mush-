function glowFly(game, key, xPos, yPos, lightEmitterKey){
    
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    
    //create light emmitter to use in collision
    this.lightEmmitter = game.add.emitter(xPos,yPos,100);
    //this.yellowLight = lightEmitterKey;
    this.lightEmmitter.makeParticles(lightEmitterKey);
    this.lightEmmitter.setAlpha(0.3, 0.8);
    game.world.bringToTop(this.lightEmmitter);
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
    
    //on collisions destroy the fly, play the sound, and change the player light radius
    var collide1 = game.physics.arcade.collide(p1, this);
    var collide2 = game.physics.arcade.collide(p2, this);
    var collide3 = game.physics.arcade.collide(p3, this)
    if(collide1){
        twinkle.play();
        this.gone();
        p1.lightRadius += 10;
    }else if(collide2){
        this.gone();
        twinkle.play();
        p2.lightRadius += 10;
    }else if(collide3){
        this.gone();
        twinkle.play();
        p3Radius += 10;
    }
}

//destroy fly and emmit light
glowFly.prototype.gone = function(){
    this.exists = false;
    this.lightEmmitter.start(true, 250, null, 50);
}

