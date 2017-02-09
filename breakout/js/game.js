
var canvas = "";
var context = "";
var score = 0;
var lives = 3;
var time = 10;
var highscore = 0;

var colorBall = ["Green","DeepSkyBlue","Purple","Black","Crimson","DeepPink","DarkOrange"]
init = function () {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	myGameloop();
}

var ball = {
	ballX: Math.floor(Math.random()*400),
	ballY: Math.floor(Math.random()*300),
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

	context.fillStyle=ball.color;
	context.beginPath();
	context.arc(ball.ballX,ball.ballY,ball.groesse,0,2*Math.PI);
	context.fill();

	document.getElementById("lives").innerHTML=lives;
	document.getElementById("score").innerHTML=score; 
	document.getElementById("highscore").innerHTML=highscore;
}

moveBall = function () {

	ball.ballX += ball.directionX*ball.speed;
	if ( ball.ballX-ball.groesse<=0) {
		ball.directionX	= 1;
		new Audio ("sound/wand_getroffen.wav").play();
	}

	if (ball.ballX+ball.groesse>=canvas.width ) {
		ball.directionX	= -1;
		new Audio ("sound/wand_getroffen.wav").play();
	}

	ball.ballY += ball.directionY*ball.speed;
	if ( ball.ballY-ball.groesse<=0) {
		ball.directionY	= 1;
		new Audio ("sound/wand_getroffen.wav").play();
	}

	if (ball.ballY+ball.groesse>=canvas.height && ball.directionY==1) {
		ball.directionY	= -1;
		new Audio ("sound/unten.mp3").play();
		lives --
		if (lives == -1){
			var audio = new Audio ("sound/die.wav")
			audio.onended = function () {
				alert("Du hast keine Leben mehr! NEUSTART ")
				score = 0;
				lives = 3;
				ball.speed = 2;
				ball.color = (colorBall[0])
			};
			audio.play();
			ball.speed = 0;
			lives = 0;
			if (score > highscore){
				highscore = score;
			}
		}			
	}	

	if (ball.ballY+ball.groesse > 480 && ball.directionY==1) {
		if (ball.ballX<=paddleX+25&&ball.ballX>=paddleX-25) {
			ball.directionY = -1;
			new Audio ("sound/paddle.wav").play();
			score += 10;
			if ( score % 50 == 0 ){
				ball.speed ++;
				new Audio ("sound/speed.wav").play();
				ball.color=colorBall[Math.floor((score/50)%7)]
			}
			if (score-10 === highscore){
				new Audio ("sound/new_hiscore.wav").play();
			}
		} 		
	}
}


	

myGameloop = function () {

	draw();
	moveBall();
	setTimeout(myGameloop,time);
}

 