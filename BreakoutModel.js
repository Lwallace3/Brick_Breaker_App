"use strict";

function BreakoutModel() {

    this.DetectPaddleCollision = function (ball, paddle) {
        var paddleRightX = paddle.getPaddleX() + 80,
            ballBottomY = ball.getBy() + 15,
            ballBottomLeftX = ball.getBx() - 15,
            ballBottomRightX = ball.getBx() + 15;

        if (ballBottomRightX > paddle.getPaddleX() && ballBottomLeftX < paddleRightX && ballBottomY >= paddle.getPaddleY()) {
            ball.invertMovement();
            ball.draw();
        }
    };

    this.DetectBrickCollision = function (ball, brickArray, breakoutView) {
        brickArray.forEach(brick => {
            var brickRightX = brick.getX() + 60,
                brickBottomY = brick.getY() + 25,
                ballBottomY = ball.getBy() + 15,
                ballTopY = ball.getBy() - 15,
                ballLeftX = ball.getBx() - 15,
                ballRightX = ball.getBx() + 15;

            if (brick.getX() < ballRightX && ballLeftX < brickRightX && ballTopY <= brickBottomY) {
                if (!brick.hasBeenHit()) {
                    ball.invertMovement();
                    ball.draw();
                    breakoutView.ClearBrick(brick);
                }
            } else if (ballBottomY >= brick.getY() && ballTopY <= brickBottomY && (ballLeftX <= brickRightX && ballRightX >= brick.getX())) {
                if (!brick.hasBeenHit()) {
                    ball.invertXMovement();
                    ball.draw();
                    breakoutView.ClearBrick(brick);
                }
            }
        });

    };
}