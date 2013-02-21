// ----------------------------------------
// main.js - entry point of program
// Sets up game loop and all calls to game.js where actual game code goes
//-----------------------------------------

// Global vars
fps = null; 
canvas = null;
ctx = null;

var game = null;

// number of miliseconds in current frame
var tickperframe = 0;
// number of seconds in current frame, choose what is best for your needs
var secperframe = 0;


// ----------------------------------------



function GameTick(elapsed)
{
    secperframe = elapsed;
    tickperframe = elapsed*1000;

    fps.update(secperframe);

    // all game calculations here
    game.Calculate();

    // reset transformation matrix to indentity
    ctx.setTransform(1, 0, 0, 1, 0, 0);

   	// Clear the screen
	ctx.fillStyle = "cyan";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

    // game render
    game.Render();

    // Draw FPS
	ctx.fillStyle = "#FF00AA";    
    ctx.font="15px Arial Black";
    ctx.fillText("FPS: "+ fps.str_fps,20,20);
    ctx.fillText("W: "+ canvas.width + " H: "+canvas.height,20,40);

 
}


window.onload = function () {

    canvas = document.getElementById("screen");

    ctx = canvas.getContext("2d");
    fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));

    game = new Game;
    game.Load();

    GameLoopManager.run(GameTick);

    canvas.onmousedown = function (e) {      game.onmousedown(e);    };
    canvas.onmousemove = function (e) {      game.onmousemove(e);    }; 
    canvas.onmouseup = function (e) {      game.onmouseup(e);    }; 
 
    document.onkeydown = function (e) {      game.onkeydown(e);    };
    document.onkeypress = function (e) {      game.onkeypress(e);    };
    document.onkeyup = function (e) {      game.onkeyup(e);    };
};

