'use strict';
Ttt.Preloader = function (game) {
    this.preloaderBar = null;
    this.titleText = null;
    this.ready = false;
};

Ttt.Preloader.prototype = {
    
    preload: function () {
        
  
        this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+200, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);

        // add the bitmap Fonts
        this.load.bitmapFont('gamefont', 'fonts/delaney/font.png', 'fonts/delaney/font.fnt');

        // add game audio
        this.load.audio('game_audio', 'audio/bgm.mp3');

        // add game board images

        // add tic tac toe board
        this.load.image('board', 'images/board1.png');

        // add the small boxes (contains a blank, X, and O, sprite)
        this.load.spritesheet('boxes', 'images/xo1.png', 50, 50, 3);

        // add the yellow box indicating where a player should be playing
        this.load.image('outline', 'images/outline1.png');

        // add the large X and O when a player wins a large tic tac toe box
        this.load.spritesheet('xo_overall', 'images/xo_overall_tran.png', 200, 200, 2);
        
    },
    
    create: function () {
        this.preloadBar.cropEnabled = false;   
    },
    
    update: function () {
        
        if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
        
    }
    
};