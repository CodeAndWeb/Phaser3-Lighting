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
    this.load.setPath('assets/');
    this.load.image('character', ['character/01.png', 'character/01_n.png']);
    this.load.multiatlas('character_sheet', 'character.json');
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
