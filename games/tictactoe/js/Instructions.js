Ttt.Instructions = function(game) {
    this.startBG;
    this.startPrompt;
    this.ding;
    
    this.titleText;
}

Ttt.Instructions.prototype = {
	
	create: function () {
        this.ding = this.add.audio('select_audio');
        
		startBG = this.add.image(this.world.width/2, this.world.height/2, 'blankBG');
        startBG.anchor.setTo(0.5,0.5);
		
    
        
        instructions = this.add.bitmapText(this.world.centerX - 300, 50, 'darling', 'Instructions', 50);
        
        backBtn = this.add.bitmapText(this.world.centerX + 100, 95, 'darling', 'Back', 40);
         backBtn.inputEnabled = true;
		backBtn.events.onInputDown.addOnce(this.startGame, this);
        
		
        
	},

	startGame: function (pointer) {
       // this.ding.play();
		this.state.start('StartMenu');
	},
    
    
};