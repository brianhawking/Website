class GameOver extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  preload () {
  }

  create (data) {
      
      // generate a completed grid
        var boxWidth = (config.width/size);
        var boxHeight = (0.8*config.height/size);
    
        for(var j = 0; j < size; j++){
            for(var i = 0; i < size; i++) {
                
                this.buttons[index] = this.add.sprite(i*boxWidth, 0+j*boxHeight,"buttons3",0);
                    
            }
        }
      // overlay Congrats
      
      // add buttons menu/new puzzle/credits
      
      
      
  }
};
