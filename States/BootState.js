var BootState = function(game) {};

//load the loading images
BootState.prototype.preload = function(){
    game.load.image('loading', 'Assets/loading.png');
    game.load.spritesheet('mushroomLoad', 'Assets/joined.png', 64, 64);
};

//switch to preload state
BootState.prototype.create = function(){
    this.state.start('PreloadState');
};