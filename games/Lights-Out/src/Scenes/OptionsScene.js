class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  preload () {
  }

  create (data) {
        this.data = data;
        if(!this.data.mode) {
            this.data.mode = 'classic';
        }
      
        this.aGrid = new AlignGrid({scene:this,rows:11,cols:13});
        this.aGrid.showNumbers();
      
        this.cameras.main.fadeFrom(1000);
      
      
      
        this.text = this.add.bitmapText(0, 0,'mister','Options',120);
        this.text.setOrigin(0.5,.5);
        this.aGrid.placeAtIndex(19,this.text);
        
        this.musicButton = this.add.image(200, 250, 'checkedBox');
        this.musicText = this.add.text(250, 240, 'Music Enabled', { fontSize: 24 });

        this.soundButton = this.add.image(200, 350, 'checkedBox');
        this.soundText = this.add.text(250, 340, 'Sound Enabled', { fontSize: 24 });

        this.classicButton = this.add.image(200,450,'checkedBox');
        this.classicText = this.add.text(250,440,'Classic Mode',{
            fontSize: 24});
        
        this.variantButton = this.add.image(200,550,'box');
        this.variantText = this.add.text(250,540,'Variant Mode',{
            fontSize: 24});
        
      
      
        this.musicButton.setInteractive();
        this.soundButton.setInteractive();
        this.classicButton.setInteractive();
        this.variantButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
          this.data.bgMusic = !this.data.bgMusic;
          this.updateAudio();
        }.bind(this));

        this.soundButton.on('pointerdown', function () {
          this.data.sound = !this.data.sound;
          this.updateAudio();
        }.bind(this));
      
        this.classicButton.on('pointerdown', function () {
          if(this.data.mode == 'classic'){
              this.classicButton.setTexture('box');
              this.data.mode = 'variant';
          }
            else if (this.data.mode !== 'classic'){
                this.classicButton.setTexture('checkedBox');
                this.data.mode = 'classic';
            }
        
        }.bind(this));
    
        this.variantButton.on('pointerdown', function () {
          if(this.data.mode == 'variant'){
              this.variantButton.setTexture('box');
              this.data.mode = 'classic';
          }
            else if (this.data.mode !== 'variant'){
                this.variantButton.setTexture('checkedBox');
                this.data.mode = 'variant';
            }
        
        }.bind(this));

        this.updateAudio();
      
      
      this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
      this.menuText = this.add.bitmapText(0,0,'mister-2','Home',38);
      this.menuText.setOrigin(0.5);
      this.aGrid.placeAtIndex(110,this.menuButton);

      Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
 
      this.menuButton.on('pointerdown', function (pointer) {
          
          var red = Phaser.Math.Between(50, 255);
            var green = Phaser.Math.Between(50, 255);
            var blue = Phaser.Math.Between(50, 255);

            this.cameras.main.fade(500);
            
      }.bind(this));
      this.cameras.main.on('camerafadeoutcomplete', function () {

            this.scene.start('Title', this.data);

        }, this);
  }
    
    update(){
        if(this.data.mode == 'classic'){
            this.classicButton.setTexture('checkedBox');
            this.variantButton.setTexture('box');
        }
        else if (this.data.mode == 'variant'){
            this.variantButton.setTexture('checkedBox');
            this.classicButton.setTexture('box');
        }
    }

updateAudio() {
    if (this.data.bgMusic === false) {
        this.musicButton.setTexture('box');
      } 
    else {
        this.musicButton.setTexture('checkedBox');
      }

    if (this.data.sound === false) {
        this.soundButton.setTexture('box');
      } 
    else {
        this.soundButton.setTexture('checkedBox');
      }
}
    
};
