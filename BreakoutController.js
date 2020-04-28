"use strict";
/* globals BreakoutModel, BreakoutView */

var breakoutView = new BreakoutView(),
    breakoutModel = new BreakoutModel(),
    breakoutController = null;

function BreakoutController() {

    this.init = function () {
        breakoutView.CreateBricks(breakoutView);
        var ball = new breakoutView.Ball();
        var paddle = new breakoutView.Paddle();



        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function (event) {
                var g = event.gamma;
                var x = 150 + (g * 6);
                if (x > window.innerWidth - 40) {
                    x = window.innerWidth - 80;
                } else if (x < 0) {
                    x = 0;
                }
                paddle.draw(x);
            });
        }

        ball.draw();
        ball.move();

        function animateBall() {
            requestAnimationFrame(animateBall);
            breakoutView.getCanvas().clearRect(ball.getBx() - 17, ball.getBy() - 17, 34, 34);
            breakoutModel.DetectPaddleCollision(ball, paddle);
            breakoutModel.DetectBrickCollision(ball, breakoutView.getBrickArray(), breakoutView);
            breakoutView.ScoreBoard();
            ball.move();

            if(breakoutView.checkForGameOver()){
                window.alert("You Win !!!");
                breakoutView.resetGame(ball);
            }

            if(breakoutView.checkForPaddleMissingBall(ball)){
                window.alert("Game over.. you loose");
                breakoutView.resetGame(ball);
            }
        }
        animateBall();
    };
}

breakoutController = new BreakoutController();
// window.addEventListener("deviceorientation", breakoutController.init, true);
window.addEventListener("load", breakoutController.init());

