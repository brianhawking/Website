'use strict';

Ttt.StartMenu = function (game) {
    this.startBG = null;
};

Ttt.StartMenu.prototype = {
  
    create: function () {
      
        // add the background
        this.startBG = this.add.image(this.world.width / 2, this.world.height / 2, 'titleimage');
        this.startBG.anchor.setTo(0.5, 0.5);
    
        // add 'One Player' Text
        var onePlayerText = this.add.bitmapText(this.world.centerX - 200, this.world.centerY + 90, 'gamefont', 'One Player', 60);
        
        // allow user to click one player
        onePlayerText.inputEnabled = true;
        
        // add event for when a user clicks one player
        onePlayerText.events.onInputDown.addOnce(this.startOnePlayerGame, this);
        
        
        // add 'Two Player' Text
        var twoPlayerText = this.add.bitmapText(this.world.centerX - 200, this.world.centerY + 150, 'gamefont', 'Two Players', 60);
        
        // allow user to click one player
        twoPlayerText.inputEnabled = true;
        
        // add event for when a user clicks one player
        twoPlayerText.events.onInputDown.addOnce(this.startTwoPlayerGame, this);
        
        var instructions = this.add.bitmapText(this.world.centerX - 200, this.world.centerY + 210, 'gamefont', 'Instructions', 60);
        instructions.inputEnabled = true;
		instructions.events.onInputDown.addOnce(this.showInstructions, this);
        
    },
    
    startOnePlayerGame: function (pointer) {
      
        BasicGame.players = 1;
        this.state.start('Game');
        
    },
    
    startTwoPlayerGame: function (pointer) {
        this.state.start('Game');    
    },
    
    showInstructions: function (pointer) {
       // this.state.start('Instructions');   
    }
    
};