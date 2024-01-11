const number = Math.trunc(Math.random() * 20) + 1;
let maxScore = -1;
document.querySelector('.check').addEventListener('click', () => {
    let score = Number(document.querySelector('.score').textContent);
    if (score <= 0) {
        document.querySelector('.message').textContent = '💥 You lost the game!';
        document.querySelector('body').style.backgroundColor = 'red';
        return;
    }
    let guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        document.querySelector('.message').textContent = '⛔ No number!';
    }
    if (number === guess) {
        document.querySelector('.message').textContent = '🎉 Congratulations you guessed it right!';
        document.querySelector('.number').textContent = number;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        if (score > maxScore) {
            document.querySelector('.highscore').textContent = score;
            maxScore = score;
        }
    } else if (number < guess) {
        document.querySelector('.message').textContent = '👆📈 Too high!';
        score--;
    } else {
        document.querySelector('.message').textContent = '👇📉 Too low!';
        score--;
    }
    document.querySelector('.score').textContent = score;
})

document.querySelector('.again').addEventListener('click', () => {
    document.querySelector('.score').textContent = 20;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.message').textContent = 'Start guessing!';
    document.querySelector('.guess').value = 'XX';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})