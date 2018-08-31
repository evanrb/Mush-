

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {
        console.log('GameOver: preload');
    },
    create: function() {
        console.log('GameOver: create');
        game.stage.backgroundColor = "#000";
        game.add.text(80, 230, 'GAMEOVER', { fontSize: '60px', fill: '#FFF' });
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }
    }
}
