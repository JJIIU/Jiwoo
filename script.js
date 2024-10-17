const cat = document.getElementById('cat');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startMessage = document.createElement('div'); // 시작 메시지 생성
let isJumping = false;
let score = 0;
let obstacleInterval;

startMessage.innerText = '스페이스바를 눌러 게임 시작!';
startMessage.style.position = 'absolute';
startMessage.style.top = '50%';
startMessage.style.left = '50%';
startMessage.style.transform = 'translate(-50%, -50%)';
startMessage.style.fontSize = '24px';
startMessage.style.color = 'black';
document.getElementById('game-container').appendChild(startMessage);

function jump() {
    if (isJumping) return;

    isJumping = true;
    let jumpHeight = 0;

    const jumpUp = setInterval(() => {
        if (jumpHeight >= 150) { // 점프 높이를 150px로 증가
            clearInterval(jumpUp);
            const jumpDown = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(jumpDown);
                    isJumping = false;
                    cat.style.bottom = '0px'; // 항상 바닥에 위치
                }
                jumpHeight -= 10;
                cat.style.bottom = `${jumpHeight}px`;
            }, 20);
        }
        jumpHeight += 15; // 점프 시 높이를 15px로 증가
        cat.style.bottom = `${jumpHeight}px`;
    }, 20);
}

function startGame() {
    obstacleInterval = setInterval(() => {
        const obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
        const catPosition = parseInt(window.getComputedStyle(cat).getPropertyValue('bottom'));

        // 충돌 감지: 장애물과 고양이가 충돌하는 경우
        if (obstaclePosition < 50 && obstaclePosition > 0 && catPosition < 40) {
            alert('게임 오버! 점수: ' + score);
            clearInterval(obstacleInterval);
            location.reload(); // 페이지 새로 고침
        }

        // 장애물 이동
        if (obstaclePosition <= 400) {
            obstacle.style.right = obstaclePosition + 5 + 'px';
        } else {
            obstacle.style.right = '-40px'; // 장애물이 화면을 벗어나면 초기 위치로
            score++;
            scoreDisplay.innerText = '점수: ' + score;
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // 스페이스바가 눌렸는지 확인
        if (!obstacleInterval) { // 게임이 시작되지 않았다면
            startGame();
            startMessage.style.display = 'none'; // 시작 메시지 숨기기
        }
        jump();
    }
});





