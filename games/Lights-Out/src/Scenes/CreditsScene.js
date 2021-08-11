class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  preload () {
  }

  create () {
    this.cameras.main.fadeFrom(1000);
        // save the global data 
    this.aGrid = new AlignGrid({scene:this,rows:11,cols:13});
   // this.aGrid.showNumbers();
      
    this.creditsText = this.add.bitmapText(0, 0,'mister','Credits',120);
    this.creditsText.setOrigin(0.5);
      this.aGrid.placeAtIndex(28,this.creditsText);
    
    this.madeByText = this.add.bitmapText(0, 0, 'mister','Created By: \nBrian Veitch', 60);
      this.madeByText.setOrigin(0.5);
      this.aGrid.placeAtIndex(128,this.madeByText);
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    this.madeByText.setY(1000);

    
    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 2000,
      onComplete: function () {
        this.destroy;
      }
    });
 
    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -100,
      ease: 'Power1',
      duration: 12000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });  
  }
};
