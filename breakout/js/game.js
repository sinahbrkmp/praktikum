
var canvas = "";
var context = "";

init = function () {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	myGameloop();
}

var ball = {
	ballX: 100,
	ballY: 100,
	groesse: 15,
	color: "Green",
	speed: 2,
	directionX: 1,
	directionY: -1,
};

var paddleX = 0;

paddle = function (e) {
	var x = e.clientX;
	var y = e.clienty;
	paddleX = x ; 
}

draw = function () {
	
	context.fillStyle="PowderBlue";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.fillStyle="red";
	context.fillRect(paddleX-25,480,50,10);

	context.fillStyle="Green"
	context.beginPath();
	context.arc(ball.ballX,ball.ballY,ball.groesse,0,2*Math.PI);
	context.fill();

}

	

myGameloop = function () {

	draw();

	ball.ballX += ball.directionX*ball.speed;
	if ( ball.ballX-ball.groesse<=0) {
		ball.directionX	= 1;
	}

	if (ball.ballX+ball.groesse>=canvas.width ) {
		ball.directionX	= -1;
	}

	ball.ballY += ball.directionY*ball.speed;
	if ( ball.ballY-ball.groesse<=0) {
		ball.directionY	= 1;
	}

	if (ball.ballY+ball.groesse>=canvas.height && ball.directionY==1) {
		ball.directionY	= -1;
	 	ball.speed = 2;
		console.log("falsch")				
	}	

	if (ball.ballY+ball.groesse > 480 && ball.directionY==1) {
		if (ball.ballX<=paddleX+25&&ball.ballX>=paddleX-25) {
			ball.directionY = -1;
			console.log("getroffen");
			ball.speed ++;
		} 		
	}


	

	setTimeout(myGameloop,10);

}

 