let scoreBtns = document.querySelectorAll('.score-btn');
let nextRoundBtn = document.getElementById('next-round');
let resetBtn = document.getElementById('reset');
let redScoreText = document.querySelector('.score.red');
let blueScoreText = document.querySelector('.score.blue');

let scores = {
	red: 0,
	blue: 0,
};
let roundScores = {
	red: {
		on: 0,
		in: 0,
	},
	blue: {
		on: 0,
		in: 0,
	},
};

const handleScoreTouch = (e) => {
	e.preventDefault();

	let clickedValue = e.target.innerText;
	let clickedBtn = e.target;
	let team = clickedBtn.classList[1];
	let onOrIn = clickedBtn.classList[2];

	// If button is not active, active it
	if (!clickedBtn.classList.contains('active')) {
		// Set other button to in active if there is one
		if (e.target.parentElement.querySelectorAll('.active')[0]) {
			e.target.parentElement
				.querySelectorAll('.active')[0]
				.classList.remove('active');
		}

		roundScores[`${team}`][`${onOrIn}`] = parseInt(clickedValue);

		clickedBtn.classList.add('active');
	}
};

const handleNextRound = (e) => {
	e.preventDefault();

	// Set total Scores

	let redTempScore = roundScores.red.on + roundScores.red.in * 3;
	let blueTempScore = roundScores.blue.on + roundScores.blue.in * 3;

	if (redTempScore > blueTempScore) {
		scores.red = redTempScore - blueTempScore;
	} else if (redTempScore < blueTempScore) {
		scores.blue = blueTempScore - redTempScore;
	}

	// Reset Round Score Values
	roundScores = {
		red: {
			on: 0,
			in: 0,
		},
		blue: {
			on: 0,
			in: 0,
		},
	};

	// Set total scores text values
	setScoreTextsToValue();

	// Reset buttons
	resetAllButtons();
};

const handleReset = (e) => {
	e.preventDefault();

	resetAllButtons();

	scores = {
		red: 0,
		blue: 0,
	};
	roundScores = {
		red: {
			on: 0,
			in: 0,
		},
		blue: {
			on: 0,
			in: 0,
		},
	};

	setScoreTextsToValue();
};

const resetAllButtons = () => {
	let activeBtns = document.querySelectorAll('.score-btn.active');
	activeBtns.forEach((btn) => btn.classList.remove('active'));
};

const setScoreTextsToValue = () => {
	redScoreText.innerText = scores.red.toString();
	blueScoreText.innerText = scores.blue.toString();
};

resetBtn.addEventListener('touchstart', handleReset);
resetBtn.addEventListener('click', handleReset);

nextRoundBtn.addEventListener('touchstart', handleNextRound);
nextRoundBtn.addEventListener('click', handleNextRound);

scoreBtns.forEach((btn) => {
	btn.addEventListener('touchstart', handleScoreTouch);
	btn.addEventListener('click', handleScoreTouch);
});
