import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);


function preload()
{
    this.load.image('character', ['assets/character/01.png', 'assets/character/01_n.png']);

    this.load.atlas('character_sheet', 'assets/character.png', 'assets/character.json');
    this.load.image('character_sheet_n', 'assets/character_n.png');
}


function create()
{
    // add single sprite
    var capguy = this.add.sprite(250, 300, 'character');
    capguy.setScale(0.5);
    capguy.setPipeline('Light2D');

    // switch on light
    var light  = this.lights.addLight(350, 250, 200);
    this.lights.enable();
    this.lights.setAmbientColor(0x555555);


    // link sprite sheet to normal map sheet
    var normals = this.textures.get('character_sheet_n').getSourceImage();
    this.textures.get('character_sheet').setDataSource(normals);

    // add sprite from sheet
    var capguy_anim = this.add.sprite(550, 300, 'character_sheet', '01');
    capguy_anim.setPipeline('Light2D');

    // play animation
    var frameNames = this.anims.generateFrameNames('character_sheet', { start: 1, end: 8, zeroPad: 2 });
    this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
    capguy_anim.anims.play('walk');


    // use mouse pointer to move light position
    this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
    });
}
