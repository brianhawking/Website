class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  preload () {
  }

  create (data) {
        this.data = data;

      
        this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
        this.musicButton = this.add.image(200, 200, 'checkedBox');
        this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

        this.soundButton = this.add.image(200, 300, 'checkedBox');
        this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
          this.data.bgMusic = !this.data.bgMusic;
          this.updateAudio();
        }.bind(this));

        this.soundButton.on('pointerdown', function () {
          this.data.sound = !this.data.sound;
          this.updateAudio();
        }.bind(this));

        this.updateAudio();
      
      
      this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
      this.menuText = this.add.text(0, 0, 'Menu',   { fontSize: '32px', fill: '#fff' });

      Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
 
      this.menuButton.on('pointerdown', function (pointer) {
            this.scene.start('Title', this.data);
      }.bind(this));
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
