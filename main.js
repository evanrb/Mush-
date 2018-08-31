var game;

window.onload = function(){
    game = new Phaser.Game(896, 480, Phaser.AUTO, 'game');//, '', { preload: preload, create: create, update: update });

    game.state.add('MainMenu', MainMenu);
    game.state.add('GamePlay', GamePlay);
    game.state.add('GamePlayLevel2', GamePlayLevel2);
    game.state.add('GamePlayLevel3', GamePlayLevel3);
    game.state.add('GameOver', GameOver);
    game.state.start('MainMenu');
    //game.state.add('game', GamePlay, true);
}