//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

}

Game.prototype.Load = function () {



    // load sound
    this.SoundJump = new buzz.sound("res/jump.ogg");
    this.SoundJump.play();

    // load ambient sound / music and play it
    this.SoundAmbient = new buzz.sound("res/sound.ogg");
    this.SoundAmbient.loop().play();

    // load image
    this.imageObj = new Image();
    this.imageObj.src = 'res/creature.png';

    this.pos = new Vec2(canvas.width / 2, canvas.height / 2);

    this.hero = new Sprite({
        "baseUrl"  : "res/hero/"
        , "fps"    : 12
        , "frames" : ["hero_01.png", "hero_02.png", "hero_03.png","hero_04.png", "hero_05.png", "hero_06.png"]
    });
}

Game.prototype.Calculate = function () {
    this.hero.update(tickperframe);
}

Game.prototype.Render = function () {
    ctx.drawImage(this.imageObj, 0,0,128,128 , this.pos.x, this.pos.y,128,128);

    this.hero.draw(ctx,100,100);
}

// mouse input
Game.prototype.onmousedown = function (e) {

    // get pos from event e
    this.pos.x = e.layerX;
    this.pos.y = e.layerY;

    // play sound
    this.SoundJump.stop();
    this.SoundJump.play();

}
Game.prototype.onmousemove = function (e) {
}
Game.prototype.onmouseup = function (e) {
}

// keyboard input
Game.prototype.onkeydown = function (e) {

    // e.whitch contains charcode of pressed key

    // left
    if (e.which == 37) this.pos.x -= 10;
    // right
    if (e.which == 39) this.pos.x += 10;
    // up
    if (e.which == 38) this.pos.y -= 10;
    // down
    if (e.which == 40) this.pos.y += 10;

    this.SoundJump.stop();
    this.SoundJump.play();
}

Game.prototype.onkeypress = function (e) {


}
   
Game.prototype.onkeyup = function (e) {

}




