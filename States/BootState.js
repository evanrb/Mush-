var BootState = function(game) {};

BootState.prototype.preload = function(){
    game.load.image('loading', 'Assets/loading.png');
};
BootState.prototype.create = function(){
    this.state.start('PreloadState');
};