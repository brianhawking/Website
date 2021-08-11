
var config = {
    width: 680,
    height: 920,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
//        width: '100%',
//        height: '100%'
    },
    backgroundColor: 0x000000,
    type: Phaser.Auto,
    scene: [BootScene, PreloaderScene,TitleScene,OptionsScene,GameScene,CreditsScene]
}

var game = new Phaser.Game(config);

