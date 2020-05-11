let clock = document.getElementById('clock')
let time = 90
let score = 0
let highScore = ' '
const saveHighScore = document.getElementById('saveBtn')
const showHighScores = document.getElementById('showScore')
const minutes = parseInt(60 / 60)
const seconds = parseInt(60 % 60)
const beginBtn = document.getElementById('btnOne')
const nextBtn = document.getElementById('nextBtn')
const restartBtn = document.getElementById('restartBtn')
const questionHolderElem = document.getElementById('questionHolder')
const questionElement = document.getElementById('question')
const answerBtnsElem = document.getElementById('answer-buttons')
const alertElem = document.getElementById('alert')
const displayScores = document.getElementById('highScores')
let shuffleQuestions, currentQuestionIndex
let results = document.getElementById('results')
let timerId
const questions = [
  {
    question: `What is "JSON parse" used for?`,
    answers: [
      { text: `To turn an object into a string`, correct: false },
      { text: `To turn a string into an object`, correct: true },
      { text: `To turn a string into an integer`, correct: false },
      { text: `To turn an integer into a string`, correct: false },
      { text: `To turn a string into a boolean`, correct: false }
    ]
  },
  {
    question: `Which of the following statements is true regarding the data type "object"?`,
    answers: [
      { text: `It's used to list only numbers`, correct: false },
      { text: `It's used to list only names`, correct: false },
      { text: `It's used to store passwords `, correct: false },
      { text: `It's used to store data in local storage`, correct: false },
      { text: `It's used to list complex data sets with key-value pairs`, correct: true }
    ]
  },
  {
    question: `In JavaScript, what is meant by "hoisting"?`,
    answers: [
      { text: `It's the order in which CSS links are inputted on an HTML page`, correct: false },
      { text: `It's the alphabetical order in which key value pairs appear in the console.`, correct: false },
      { text: `It's when a function is called before it is defined`, correct: true },
      { text: `It's used to copy and paste variables into local storage`, correct: false },
      { text: `It's when a function is console logged first to test if it's working correctly.`, correct: false }
    ]
  },
  {
    question: `What is the only situation where a programmer would write "event.preventDefault()"?`,
    answers: [
      { text: `When a webpage needs a reset stylesheet before any other stylesheets are linked`, correct: false },
      { text: ` When an HTML needs to be tested across multiple browsers`, correct: false },
      { text: `When a programmer needs a code editor to stop autofilling text as it's being typed`, correct: false },
      { text: `When a programmer wants a shortcut to writing ids and classes on a tag`, correct: false },
      { text: `When a button is inside a form and a programmer wants to prevent the page from refreshing when the button is clicked`, correct: true }
    ]
  },
  {
    question: `Which of the following statements is false?`,
    answers: [
      { text: `Global variables take precedence over local variables.`, correct: true },
      { text: `Id selectors override class selectors`, correct: false },
      { text: `Backticks, unlike using single quotes or double quotes, allow for code to be written on multiple lines`, correct: false },
      { text: `All variables in a ternary should be defined before an operation is created`, correct: false },
      { text: `Functions should be written with const, not let.`, correct: false }
    ]
  }
]

btnOne.addEventListener('click', beginQuiz)
restartBtn.addEventListener('click', beginQuiz)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
saveBtn.addEventListener('click', () => {
  localStorage.setItem('High Score', `${score}`)
  displayScores.appendChild('Score saved!')
})
showScore.addEventListener('click', displayHighScores)

function beginQuiz() {
  score = 0
  time = 90
  divIntro.classList.add('hide')
  shuffleQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionHolderElem.classList.remove('hide')
  timerId = setInterval(clockTick, 1000)
  setNextQuestion()
  saveHighScore.classList.add('hide')
  showHighScores.classList.add('hide')
  document.getElementById('results').innerHTML = ''
}

function quizEnd() {
  // stop timer
  clearInterval(timerId)
}

function clockTick() {
  let minutes = Math.floor(time / 60)
  let seconds = time % 60
  time--
  clock.textContent = ("Time left: " + ` ${minutes} minutes, ${seconds} seconds`)
  // check if user ran out of time
  if (time <= 0) {
    document.getElementById('clock').innerHTML = "Time is up!"
    quizEnd()
    questionHolderElem.classList.add('hide')
    nextBtn.classList.add('hide')
  }
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.dataset.correct = answer.correct
    button.addEventListener('click', pickAns)
    answerBtnsElem.appendChild(button)
  })
}

function resetState() {
  clearUp(document.body)
  alertElem.textContent = ''
  nextBtn.classList.add('hide')
  while (answerBtnsElem.firstChild) {
    answerBtnsElem.removeChild
      (answerBtnsElem.firstChild)
  }
}


function pickAns(event) {
  const selectedButton = event.target
  const correct = JSON.parse(selectedButton.dataset.correct)
  console.log(selectedButton.dataset)
  points(selectedButton, correct)
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    questionHolderElem.classList.add('hide')
    alertElem.textContent = ''
    quizEnd()
    beginBtn.innerText = 'Restart Quiz'
    divIntro.classList.remove('hide')
    restartBtn.classList.remove('hide')
    saveHighScore.classList.remove('hide')
    showHighScores.classList.remove('hide')
    document.getElementById('results').textContent = (`You scored ${score}. Do you want to save this score as your high score?`)
  }
}

function points(element, correct) {
  clearUp(element)
  if (correct) {
    score++
    document.getElementById('alert').innerHTML = "You answered correctly!"
  } else {
    document.getElementById('alert').innerHTML = "Oh no! Correct answer not chosen!"
    time -= 2
  }
}

function clearUp(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function displayHighScores() {
  if (localStorage.getItem('score')) {
    displayScores.appendChild(`${localStorage.getItem('score')}`)
  }
}

//stop user from pressing on an answer again once they clicked on something or for the score to be moved up by one only if the user clicked on the right answer once