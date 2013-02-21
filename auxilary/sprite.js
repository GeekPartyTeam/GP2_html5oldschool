Sprite = function( config )
{

    this.initialize(config);
}

var p = Sprite.prototype = {};

p.initialize = function(config)
{

    /*
     var spriteConfig = {
     "baseUrl"  : "img/hero/"
     , "fps"    : 12
     , "frames" : ["wd_0.png", "wd_1.png", "wd_2.png"]
     };
     */

    this.frames = [];
    this.valid  = false;
    this.currentFrame = 0;
    this.timer = 0;
    this.fps = config.fps;


    var waiting = config.frames.length;
    var that  = this;


    for (frame in config.frames)
    {
        var img = new Image();
        this.frames.push(img);

        img.onload = function()
        {
            waiting--;

            if (waiting <=0)
                that.valid = true;
        }
        img.src = config.baseUrl + "/" +config.frames[frame];
    }
}



p.setFrame = function (frameNum)
{
    this.currentFrame = this.frames[frameNum];
}


p.update = function(dt)
{
    if (!this.valid) return;

    this.timer += dt;

    var frame = Math.floor( this.timer / (1000/this.fps) ) % this.frames.length;
    this.setFrame(frame);
}

p.draw = function(ctx, x, y)
{
    if (!this.valid) return;

    ctx.drawImage( this.currentFrame, x,y);
}