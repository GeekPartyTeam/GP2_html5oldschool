// ------------------------------------
// Assorted JavaScript utility functions

function isDef(v) 			{ return v !== undefined; }
function isNull(v) 			{ return v === null; }
function isDefAndNotNull(v) { return vl != null; }

// Helper to provides requestAnimationFrame in a cross browser way.
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}


// ----------------------------------------
// By Javier Arevalo ////
// FPS Meter class ///

FPSMeter = function (cls, root) {
    this.fpsArray = new Array();
    this.fpsIndex = 0;
    this.fps = document.createElement("div");
    this.fps.setAttribute("class", cls);
    root.appendChild(this.fps);
    this.str_fps = " ";
    
    this.fpst = new Array();
    
    for (var i = 0; i < 3; ++i)
    {
    this.fpst.push(this.fps.appendChild(document.createElement("p")));
    } 
    
}

FPSMeter.prototype.constructor = FPSMeter;

FPSMeter.prototype.update = function (elapsed)
{
	if (this.fpsArray.length < 100)
	{
		this.fpsArray.push(elapsed);
	}
	else
	{
		this.fpsArray[this.fpsIndex] = elapsed;
		this.fpsIndex = (this.fpsIndex + 1) % this.fpsArray.length;
	}
	var min = this.fpsArray[0], max = this.fpsArray[0], avg = 0;
	this.fpsArray.forEach(function(o, i, a) {
		if (min > o) min = o;
		if (max < o) max = o;
		avg += o;
	});
	avg /= this.fpsArray.length;

    this.str_fps = (1/avg).toFixed(0);
/*	this.fpst[0].textContent = "min: " + min.toFixed(3) + " max: " + max.toFixed(3);
	this.fpst[1].textContent = "avg: " + avg.toFixed(3) + " fps: " + (1/avg).toFixed(0);
	this.fpst[2].textContent = "current: " + elapsed.toFixed(3); */
}



// ----------------------------------------
// GameLoopManager
// By Javier Arevalo


var GameLoopManager = new function() {
	this.lastTime = 0;
	this.gameTick = null;
	this.prevElapsed = 0;
	this.prevElapsed2 = 0;

	this.run = function(gameTick) {
		var prevTick = this.gameTick;
		this.gameTick = gameTick;
		if (this.lastTime == 0)
		{
			// Once started, the loop never stops.
			// But this function is called to change tick functions.
			// Avoid requesting multiple frames per frame.
			var bindThis = this;
			requestAnimationFrame(function() { bindThis.tick(); } );
			this.lastTime = 0;
		}
	}
	
	this.stop = function() {
		this.run(null);
	}

	this.tick = function () {
		if (this.gameTick != null)
		{
			var bindThis = this;
			requestAnimationFrame(function() { bindThis.tick(); } );
		}
		else
		{
			this.lastTime = 0;
			return;
		}
		var timeNow = Date.now();
		var elapsed = timeNow - this.lastTime;
		if (elapsed > 0)
		{
			if (this.lastTime != 0)
			{
				if (elapsed > 1000) // Cap max elapsed time to 1 second to avoid death spiral
					elapsed = 1000;
				// Hackish fps smoothing
				var smoothElapsed = (elapsed + this.prevElapsed + this.prevElapsed2)/3;
				this.gameTick(0.001*smoothElapsed);
				this.prevElapsed2 = this.prevElapsed;
				this.prevElapsed = elapsed;
			}
			this.lastTime = timeNow;
		}
	}
}

