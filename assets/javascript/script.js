let clock = document.getElementById('clock')
let count = 90
let score = 0
let highScore = ' '
let saveHighScore = document.getElementById('save')
const minutes = parseInt(60 / 60)
const seconds = parseInt(60 % 60)
const beginBtn = document.getElementById('btnOne')
const nextBtn = document.getElementById('nextBtn')
const questionHolderElem = document.getElementById('questionHolder')
const questionElement = document.getElementById('question')
const answerBtnsElem = document.getElementById('answer-buttons')
const alertElem = document.getElementById('alert')
let shuffleQuestions, currentQuestionIndex
let results = document.getElementById('results')
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
      {
        text: `Functions should be written with const, not let.`,
        correct: false
      }
    ]
  }
]
const mostRecentScore = localStorage.getItem("mostRecentScore")
// const highScores = JSON.parse(localStorage.getItem('highScores')) || []
// console.log(highScores)

// highScores.push(score)


btnOne.addEventListener('click', beginQuiz)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
saveHighScore.addEventListener('click', () => {

}
)
function beginQuiz() {
  score = 0
  beginBtn.classList.add('hide')
  divIntro.classList.add('hide')
  shuffleQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionHolderElem.classList.remove('hide')
  timer()
  setNextQuestion()
}

function timer() {
  const getTime = () => {
    let minutes = Math.floor(count / 60)
    let seconds = count % 60
    document.getElementById('clock').innerHTML = ("Time left: " + ` ${minutes} minutes, ${seconds} seconds`)
  }
  setInterval(() => {
    count--
    if (count === 0) {
      return
    }
    getTime()
  }, 1000)
}

function stopClock() {
  if (count === 0) {
    stopInterval(clock)
    //also tried clearInterval, clearTimeout, stop(), and with clock and count
    document.getElementById('clock').innerHTML = "Time is up!"
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
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', pickAns)
    answerBtnsElem.appendChild(button)
  })
}

function resetState() {
  clearUp(document.body)
  clearUp(alertElem)
  //unable to hide alertElem when new question is presented
  alertElem.classList.add('hide')
  nextBtn.classList.add('hide')
  while (answerBtnsElem.firstChild) {
    answerBtnsElem.removeChild
      (answerBtnsElem.firstChild)
  }
}

function pickAns(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  points(document.body, correct)
  Array.from(answerBtnsElem.children).forEach(button => {
    points(button, button.dataset.correct)
  })
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    //having trouble hiding alertElem, showing the btnOne as "Restart", putting in the right score, listing correct score, and stopping clock.
    questionHolderElem.classList.add('hide')
    alertElem.classList.add('hide')
    stopClock(count)
    beginBtn.innerText = "Restart"
    beginBtn.classList.remove('hide')
    document.getElementById("results").textContent = (`You scored ${score}. Do you want to save this score as your high score?`)
    saveHighScore.classList.remove('hide')

  }
}

function points(element, correct) {
  clearUp(element)
  if (correct) {
    //score variable does not keep track of score correctly
    score++
    document.getElementById('alert').innerHTML = "You answered correctly!"

  } else {
    document.getElementById('alert').innerHTML = "Oh no! Correct answer not chosen!"
    count -= 2

  }
}

function clearUp(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
