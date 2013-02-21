//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

}

Game.prototype.Load = function () {

    // load sound
    this.SoundJump = new buzz.sound("res/jump.ogg");
    this.SoundJump.play();

    // load ambient music and play it
    this.SoundAmbient = new buzz.sound("res/sound.ogg");
    this.SoundAmbient.loop().play();

    // set up creature
    this.creatureImg = new Image();
    this.creatureImg.src = 'res/creature.png';

    this.creaturePos = new Vec2(canvas.width / 2, canvas.height / 2);

    // set up girl
    this.girlSpr = new Sprite({
        "baseUrl"  : "res/girl/"
        , "fps"    : 30
        , "frames" : ["girl_01.png", "girl_02.png", "girl_03.png","girl_04.png"
        , "girl_05.png", "girl_06.png", "girl_07.png", "girl_08.png" 
        , "girl_09.png", "girl_10.png", "girl_11.png", "girl_12.png"
        , "girl_13.png", "girl_14.png", "girl_15.png", "girl_16.png" ]
    });
    this.girlPos = new Vec2(0, canvas.height / 2);
}

Game.prototype.Calculate = function () {
    this.girlPos.x += tickperframe / 5;
    if (this.girlPos.x > canvas.width) this.girlPos.x = -100;
    this.girlSpr.update(tickperframe);
}


Game.prototype.Render = function () {
    
    ctx.drawImage(this.creatureImg, 0, 0, 128, 128, this.creaturePos.x, this.creaturePos.y, 128, 128);

    this.girlSpr.draw(this.girlPos.x, this.girlPos.y);
}

//---------------------------------------------
// mouse input

Game.prototype.onmousedown = function (e) {

    // get pos from event e
    this.creaturePos.x = e.layerX;
    this.creaturePos.y = e.layerY;

    // play sound
    this.SoundJump.stop();
    this.SoundJump.play();

}
Game.prototype.onmousemove = function (e) {
}
Game.prototype.onmouseup = function (e) {
}

//---------------------------------------------
// keyboard input

Game.prototype.onkeydown = function (e) {

    // e.whitch contains charcode of pressed key

    // left
    if (e.which == 37) this.creaturePos.x -= 10;
    // right
    if (e.which == 39) this.creaturePos.x += 10;
    // up
    if (e.which == 38) this.creaturePos.y -= 10;
    // down
    if (e.which == 40) this.creaturePos.y += 10;

    this.SoundJump.stop();
    this.SoundJump.play();
}

Game.prototype.onkeypress = function (e) {


}
   
Game.prototype.onkeyup = function (e) {

}




