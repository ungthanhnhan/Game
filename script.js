const dino = document.getElementById('dino');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let score = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;

    // Nhảy lên
    const upInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(upInterval);

            // Hạ xuống
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 5;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    game.appendChild(obstacle);

    let obstaclePosition = game.clientWidth;
    obstacle.style.left = obstaclePosition + 'px';

    const obstacleInterval = setInterval(() => {
        if (obstaclePosition < 0) {
            clearInterval(obstacleInterval);
            game.removeChild(obstacle);
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
        } else if (obstaclePosition < 90 && obstaclePosition > 50 && !isJumping) {
            clearInterval(obstacleInterval);
            alert('Game Over! Điểm của bạn: ' + score);
            document.location.reload();
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20);

    setTimeout(createObstacle, Math.random() * 3000 + 2000);
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') jump();
});

createObstacle();
