

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {
        console.log('GameOver: preload');
    },
    create: function() {
        console.log('GameOver: create');
        game.stage.backgroundColor = "#000";
        game.add.sprite(0, 0, 'gameOver');
        this.frameCount = 0;
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            location.reload();
            //game.state.start('MainMenu');
        }
        if(this.frameCount == 300){
            location.reload();
            //game.state.start('MainMenu');
        }
        this.frameCount += 1;
        
    }
}
