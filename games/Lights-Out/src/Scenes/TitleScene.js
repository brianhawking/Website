class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  preload () {
  }

  create (data) {
      
      this.aGrid = new AlignGrid({scene:this,rows:11, cols:11});
      //this.aGrid.showNumbers();
    
    
      if(data.new){
          this.data = data;
        }
      else {
          this.data = {
              size: 3,
              bgMusic: false,
              bgMusicPlaying: false,
              sound: false,
              new: true,
              setUp: false
        }
      }
    
    // bitmap title
      this.bitmapTitle = this.add.bitmapText(0,0,'mister','LIGHTS OUT',140);
    this.bitmapTitle.setOrigin(0.5,1);
    this.aGrid.placeAtIndex(5,this.bitmapTitle);
      
    
      
    this.tweens.add({
        targets: this.bitmapTitle,
        duration: 2000,
        y: this.aGrid.getYcoordinate(38),
        ease: 'Back',
        easeParams: [3.5],
        delay: 500
    });
      

    // Right Button
    this.rightButton = this.add.sprite(0,0,'rightButton').setInteractive();
    this.rightButton.setScale(.15);
    this.aGrid.placeAtIndex(63,this.rightButton);
    this.rightButton.on('pointerdown', function(pointer){
        // change dimensions
        this.changeSize(1);
    }.bind(this));
      
    
    // Left Button
    this.leftButton = this.add.sprite(0,0,'rightButton').setInteractive();
    this.leftButton.flipX = true;
    this.leftButton.setScale(0.15);
    this.aGrid.placeAtIndex(57,this.leftButton);
      
    this.leftButton.on('pointerdown', function(pointer){
        // change dimensions
        this.changeSize(-1);
    }.bind(this));
    
    
    // Options
    this.optionsButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton, -1);

    this.optionsButtonText = this.add.bitmapText(0, 0, 'mister-2', 'Options', 38);
    this.centerButtonText(this.optionsButtonText, this.optionsButton);
    
    this.optionsButton.on('pointerdown', function (pointer) {
      this.scene.start('Options',this.data);
    }.bind(this));
 
      
    // Game Size
    this.sizeButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.sizeButton);

    var size = this.data.size;
    this.sizeButtonText = this.add.bitmapText(0, 0, 'mister-2', size + ' x ' + size, 38);
    this.centerButtonText(this.sizeButtonText, this.sizeButton);

    this.sizeButton.on('pointerdown', function (pointer) {
        
      this.scene.start('Game',this.data);
    }.bind(this));

    // Play
    this.playButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.playButton, 1);

    this.playButtonText = this.add.bitmapText(0, 0, 'mister-2', 'P l a y', 38);
    this.centerButtonText(this.playButtonText, this.playButton);

    this.playButton.on('pointerdown', function (pointer) {
      this.scene.start('Game',this.data);
    }.bind(this));


      
    // Credits 
    this.creditButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditButton, -2);

    this.creditButtonText = this.add.bitmapText(0, 0, 'mister-2','Credits', 38);
    this.centerButtonText(this.creditButtonText, this.creditButton);

    this.creditButton.on('pointerdown', function (pointer) {
        
      this.scene.start('Credits',this.data);
    }.bind(this));
      
    // music
      
    // add pop 
    this.pop = this.sound.add('pop', {
            volume: 0.5, 
            loop: false
        });

    if(this.data.bgMusic === true && this.data.bgMusicPlaying === false) {
        this.bgMusic = this.sound.add('piano', {
            volume: 0.5, 
            loop: true
        });
        this.data.bgMusicPlaying = true;
        this.bgMusic.play();

    }
    if(this.data.bgMusic == false && this.data.bgMusicPlaying === true){
        this.bgMusic.stop();
        this.data.bgMusicPlaying = false;
    }
  }

changeSize(change) {
    this.data.size = this.data.size + change;
    this.sizeButtonText.setText(this.data.size + ' x ' + this.data.size);
    console.log(this.data.size);
}
    
centerButton (gameObject, offset = 0){
    Phaser.Display.Align.In.Center(
        gameObject,
        this.add.zone(config.width/2, config.height/2-offset*100, config.width, config.height)
    );
}  
    
centerButtonText (gameText, gameButton) {
  Phaser.Display.Align.In.Center(
    gameText,
    gameButton
  );
}

};
