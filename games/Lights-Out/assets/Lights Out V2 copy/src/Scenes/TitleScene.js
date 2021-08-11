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
            new: true
        }
      }
    
    
    // title
    this.title = this.add.sprite(100, 200, 'title');
    this.title.setScale(1.3);
    this.centerButton(this.title, 3);
   
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

    this.optionsButtonText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsButtonText, this.optionsButton);
    
    this.optionsButton.on('pointerdown', function (pointer) {
      this.scene.start('Options',this.data);
    }.bind(this));

//    this.input.on('pointerover', function (event, gameObjects) {
//      gameObjects[0].setTexture('blueButton2');
//    });
//
//    this.input.on('pointerout', function (event, gameObjects) {
//      gameObjects[0].setTexture('blueButton1');
//    });  
      
    // Game Size
    this.sizeButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.sizeButton);

    this.sizeButtonText = this.add.text(0, 0, this.data.size + ' x ' + this.data.size, { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.sizeButtonText, this.sizeButton);

    this.sizeButton.on('pointerdown', function (pointer) {
        this.data.size = 4;
      this.scene.start('Game',this.data);
    }.bind(this));

    // Play
    this.playButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.playButton, 1);

    this.playButtonText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.playButtonText, this.playButton);

    this.playButton.on('pointerdown', function (pointer) {
      this.scene.start('Game',this.data);
    }.bind(this));

//    this.input.on('pointerover', function (event, gameObjects) {
//      gameObjects[0].setTexture('blueButton2');
//    });
//
//    this.input.on('pointerout', function (event, gameObjects) {
//      gameObjects[0].setTexture('blueButton1');
//    });
      
    // Credits 
    this.creditButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditButton, -2);

    this.creditButtonText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditButtonText, this.creditButton);

    this.creditButton.on('pointerdown', function (pointer) {
        
      this.scene.start('Credits',this.data);
    }.bind(this));
      
    // music

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
