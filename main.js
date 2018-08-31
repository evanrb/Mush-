var game;

//global variable to keep persistent player 3 light radius
var p3Radius;
    
window.onload = function(){
    game = new Phaser.Game(896, 480, Phaser.AUTO, 'game');//, '', { preload: preload, create: create, update: update });
    
    p3Radius = 100;
    
    game.state.add('BootState', BootState);
    game.state.add('PreloadState', PreloadState);
    game.state.add('MainMenu', MainMenu);
    game.state.add('GamePlay', GamePlay);
    game.state.add('GamePlayLevel2', GamePlayLevel2);
    game.state.add('GamePlayLevel3', GamePlayLevel3);
    game.state.add('GameOver', GameOver);
    game.state.start('BootState');
}