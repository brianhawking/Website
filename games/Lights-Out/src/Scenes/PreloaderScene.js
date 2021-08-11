class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
      
      
    // add logo image
    var logo = this.add.image(400, 200, 'logo');
    logo.setScale(.55);
    this.aGrid = new AlignGrid({scene:this,rows:11, cols:11});
    //this.aGrid.showNumbers();
    this.aGrid.placeAtIndex(82,logo);

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, .8);
    progressBox.fillRect(0, 0, 320, 50);
    this.aGrid.placeAtIndex(35,progressBox);
      
    
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(0,0, 300 * 0.01, 50);
    this.aGrid.placeAtIndex(35,progressBar);
    

      
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.aGrid.placeAtIndex(27,loadingText);
    loadingText.setOrigin(0.5, 0.5);


      
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(49,assetText);
      
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      //progressBar.fillRect(250, 280, 300 * value, 30);
      progressBar.fillRect(0, 0, 320 * value, 50);
        Phaser.Display.Align.In.Center(
    percentText,
    progressBar
  );
      
    });
      


    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(100, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('title', 'assets/Lights-Out.png');
    this.load.image('rightButton','assets/rightButton.png');
      
    this.load.image('phaserLogo', 'assets/logo1.png');
    this.load.image('box', 'assets/ui/grey_box.png');
      this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
      this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
      this.load.audio('piano',['assets/background/piano.mp3']);
      this.load.audio('pop',['assets/sfx/pop1.mp3']);
    
    this.load.spritesheet("buttons3","assets/buttons3.png", { frameWidth: 213, frameHeight: 214 });
      
    // fonts
      this.load.bitmapFont('mister','assets/fonts/mister-pumpkin/font.png','assets/fonts/mister-pumpkin/font.fnt');
      this.load.bitmapFont('mister-2','assets/fonts/mister-2/font.png','assets/fonts/mister-2/font.fnt');
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
    
centerButtonText (gameText, gameButton) {
  Phaser.Display.Align.In.Center(
    gameText,
    gameButton
  );
}
    
};
