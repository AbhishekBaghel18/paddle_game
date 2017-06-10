     	var canvas = document.getElementById('myCanvas');
     	var ctx = canvas.getContext("2d");
        var x = canvas.width / 2;  			// x coordinate of Ball
        var y  = canvas.height -30;  		// y coordinate of Ball
        var ballRadius = 10; 				// radius of ball
        var dx = 2;   						// velocity of ball in x - direction
        var dy = -2;   						// velocity in y- direction
        var paddleHeight = 10;   			// Height of paddle 
        var paddleWidth = 75;				// width of paddle
        var paddleX = (canvas.width-paddleWidth)/2;			//paddle's position on x-axis
        var leftPressed = false;							//for left key to move paddle on left
        var rightPressed = false;							//for right key to move paddle on right side 
        var brickRowCount = 4;								// Number of Rows
        var brickColumnCount = 5;							// Number of Columns
        var brickWidth = 75;								// Width of Brick
        var brickHeight = 20;								// Height of Brick
        var brickPadding = 10;								// Padding between Bricks
        var brickOffsetTop = 30; 							// to give space between canvas edge and brick (x)
        var brickOffsetLeft = 30;							// to give space between canvas edge and brick (y)
        var score = 0;										// Record the Score
        var lives = 3;                                      // Number of lives                                       // For Background music

        var bricks = [];
        for ( c=0; c < brickColumnCount; c++) {
        	bricks[c] = [ ];
        	for(r=0; r < brickRowCount; r++) {
        		bricks[c][r] = {x:0, y:0, status: 1};
        	}
        } 

     	document.addEventListener("keydown", keyDownHandler , false);
     	document.addEventListener("keyup", keyUpHandler , false);
     	document.addEventListener("mousemove", mouseMoveHandler, false);

     	
     	function  keyDownHandler(e) {
     		if(e.keyCode == 39){
     			rightPressed = true;
     		}
     		else if( e.keyCode == 37) {
     			leftPressed = true;
     		}
     	}

     	function keyUpHandler(e) {
     		if(e.keyCode == 39) {
     			rightPressed = false;
     		}
     		else if(e.keyCode == 37) {
     			leftPressed = false;
     		}
     	}

        function mouseMoveHandler(e){
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width){
                paddleX = relativeX - paddleWidth/2;
            }
        }

    
     	function collisionDetection() {
     		for(c=0; c < brickColumnCount; c++){
     			for(r=0; r < brickRowCount; r++){
     				var b = bricks[c][r];
     				if(b.status ==1){
     					if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight ){
     					dy =- dy;
     					b.status = 0;
     					score++;
     					if(score == brickRowCount*brickColumnCount)
     					 {
     					 	alert("YOU WIN, CONGRATULATONS!!!");
                            document.location.reload();                       
     					 }
     				  } 
     			    }
     			}
     		}
     	}

     	function drawScore() {
     		ctx.font = " 16px Arial";
     		ctx.fillStyle = "rgba(7,9,254,1)";
     		ctx.fillText("Score: "+score, 8, 20);
     	}

     	function drawLives() {
     		ctx.font = " 16px Arial";
     		ctx.fillStyle = "rgba(7,9,254,1)";
     		ctx.fillText("Lives: "+lives, canvas.width-65, 20);
     	}

        function drawBall(){
        	ctx.beginPath();
	      	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	      	ctx.fillStyle = "rgba(7,9,254,1)";
	      	ctx.fill();
	      	ctx.closePath();

        }
        function drawPaddle() {
        	ctx.beginPath();
        	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        	ctx.fillStyle = "rgba(7,9,254,1)";
        	ctx.fill();
        	ctx.closePath();
        }

        function drawBricks() {
        	for(c=0; c < brickColumnCount; c++) {
        		for(r=0; r < brickRowCount; r++ ) {
        			if (bricks[c][r].status ==1){
        			var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
        			var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
        			bricks[c][r].x = brickX;
        			bricks[c][r].y = brickY;
        			ctx.beginPath();
        			ctx.rect(brickX, brickY, brickWidth, brickHeight);
        			ctx.fillStyle = "rgba(7,9,254,1)";
        			ctx.fill();
        			ctx.closePath();
        		    }
        		}
        	}
        }

     	function draw() {

     		ctx.clearRect(0, 0, canvas.width, canvas.height);
     		drawBricks();
	        drawBall();
	        drawPaddle();
            drawScore();
            drawLives();
        	collisionDetection();

	      	if(x+dx < ballRadius || x+dx > canvas.width - ballRadius){
	      		dx = -dx;
	      	}
	      	if( y+dy < ballRadius ){
	      		dy = -dy;
	      	}
	      	else if( y+dy > canvas.height - ballRadius) {
	      	    	if(x > paddleX && x < paddleX + paddleWidth){
	      				dy= -dy;
	      				}
	      		 	else{
	      		 		lives--;
	      		 		if(!lives){
	      		 			alert("Game Over!! ");
	      					document.location.reload();
	      		 			}
	      				else {
	      					x = canvas.width/2;
	      					y = canvas.height-30;
	      					dx = 3;
	      					dy = -3;
	      					paddleX = (canvas.width - paddleWidth)/2;
	      		    	 }
	            	}
	      		}
	      	if(rightPressed && paddleX < canvas.width - paddleWidth){
	      		paddleX +=7;
	      	}
	      	else if(leftPressed && paddleX > 0) {
	      		paddleX -=7;
	      	}
	      	x += dx;
	      	y += dy;

            requestAnimationFrame(draw);
	     	}