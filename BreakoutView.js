"use strict";

function BreakoutView() {
    var myCanvas = document.getElementById("myCanvas");
    var blockArray = [];
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    var c = myCanvas.getContext('2d');

    this.Block = function(x,y) {
        this.x = x;
        this.y = y;
        this.blockIndex = 0;
        this.hitBrick = false;

        this.draw = function () {
            c.fillRect(x,y,60,30);
        };

        this.getX = function () {
            return x;
        };

        this.getY = function () {
            return y;
        };

        this.setBlockIndex = function (blockI) {
            this.blockIndex = blockI;
        };

        this.getBlockIndex = function () {
            return this.blockIndex;
        };

        this.hit = function () {
            this.hitBrick = true;
        };

        this.hasBeenHit = function () {
            return this.hitBrick;
        };

        this.resetBlock = function () {
            this.hitBrick = false;
            this.draw();
        };
    };

    this.Ball = function() {
        var bx = 200;
        var by = 200;
        var bdx = 1 + Math.ceil(Math.random() * 3);
        var bdy = 2;

        if(bdx > -1 && bdx < -1){
            bdx = 2;
        }

        if(bdy > -1 && bdy < 1){
            bdy = 3;
        }

        this.draw = function () {
            c.beginPath();
            c.arc(bx,by,15, 0, Math.PI * 2,false);
            c.fillStyle = 'blue';
            c.fill();
        };

        this.getBx = function () {
            return bx;
        };

        this.getBdy = function () {
            return bdy;
        };

        this.getBy = function () {
            return by;
        };

        this.setY = function () {
            by = 200;
        };

        this.setX = function () {
            bx = 200;
        };

        this.move = function () {

            if(bx + 15 > window.innerWidth || bx - 15< 0) {
                bdx = -bdx;
            }

            if(by + 15 > window.innerHeight || by -15 <0) {
                bdy = -bdy;
            }

            bx+= bdx;
            by+= bdy;

            this.draw();
        };

        this.invertMovement = function () {
            bdy=  -bdy;
            this.draw();
        };

        this.invertXMovement = function () {
            bdx=  -bdx;
            this.draw();
        };
    };

    this.Paddle = function() {
        var paddleX;
        var paddleY = window.innerHeight-40;

        this.draw = function (x) {
            this.setPaddleX(x);
            c.beginPath();
            c.clearRect(0,paddleY,1000,40);
            c.fillRect(x,paddleY,80,20);
            c.fillStyle = "green";
            c.fill();
        };
        this.setPaddleX = function (x) {
            paddleX = x;
        };

        this.getPaddleX = function () {
            return paddleX;
        };

        this.getPaddleY = function () {
            return paddleY;
        };
    };

    this.ScoreBoard = function () {
        c.clearRect(0, myCanvas.height/3, 1000, 300);
        c.font = "30px Arial";
        c.fillText("Score: " + this.getScore(), myCanvas.width/2, myCanvas.height/2);
    };

    this.CreateBricks = function (breakoutView) {
        let count = 0;
        for (var y = 0; y < 4; y++) {
            for (var i = 0; i < 5; i++) {
                blockArray[count] = new breakoutView.Block((myCanvas.width * i) / 5, (myCanvas.height * y / 15));
                blockArray[count].setBlockIndex(count)
                c.fillStyle = this.getRandomColour();
                blockArray[count].draw();
                count++;
            }
        }
    };

    this.ClearBrick = function (brick) {
        brick.hit();
        c.clearRect(brick.getX()-1,brick.getY()-1,65,35);
        let count = 0;
        for (var y = 0; y < 4; y++) {
            for (var i = 0; i < 5; i++) {
                if(!blockArray[i].hasBeenHit()){
                    c.fillStyle = this.getRandomColour();
                    blockArray[i].draw();
                    count++;
                }
            }
        }
    };

    this.getBrickArray = function () {
        return blockArray;
    };

    this.getCanvas = function () {
        return c;
    };

    this.checkForGameOver = function () {
        for(var i = 0;i < blockArray.length; i++){
            if(!blockArray[i].hasBeenHit()){
                return false;
            }
        }
        return true;
    };

    this.checkForPaddleMissingBall = function (ball) {
        if(ball.getBy() >= window.innerHeight-30){
            console.log("missed");
            return true;
        } else {
            return false;
        }
    };

    this.resetGame = function (ball) {
        ball.setY();
        ball.setX();

        location.reload();
    };

    this.getRandomColour = function(){
        var characters = '0123456778ABCDEF';
        var colour = '#';
        for (var i = 0; i < 6; i++) {
            colour += characters[Math.floor(Math.random() * 16)];
        }
        return colour;
    };

    this.getScore = function () {
        var counter = 0;
        blockArray.forEach(block => {
            if(block.hasBeenHit()){
                counter++;
            }
        });
        return counter;
    };
}