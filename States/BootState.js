var BootState = function(game) {};

BootState.prototype.preload = function(){
    game.load.image('loading', 'Assets/loading.png');
    game.load.spritesheet('mushroomLoad', 'Assets/joined.png', 64, 64);
};
BootState.prototype.create = function(){
    this.state.start('PreloadState');
};