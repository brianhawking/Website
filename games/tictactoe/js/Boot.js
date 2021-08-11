'use strict';
var Ttt = {};

var BasicGame = {
    
    // globals
    players: 0,
    
    
};


Ttt.Boot = function (game) {};

Ttt.Boot.prototype = {
    preload: function () {
        this.load.image('preloaderBar', 'images/loader_bar.png');
        this.load.image('titleimage', 'images/splash2.png');
    },
    
    create: function () {

        
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 270;
		this.scale.minHeight = 320;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#0F1115';
       
        
        this.state.start('Preloader');
    }
};