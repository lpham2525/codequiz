const quiz = document.getElementById('quiz')
const results = document.getElementById('results')
const submit = document.getElementById('submit')
const listQuestions = [
  {
    question: `What is "JSON parse" used for?`,
    answers: {
      a: `To turn an object into a string`,
      b: `To turn a string into an object`,
      c: `To turn a string into an integer`,
      d: `To turn an integer into a string`,
      e: `To turn a string into a boolean`
    },
    correct: `b`
  },
  {
    question: `Which of the following statements is true regarding the data type "object"?`,
    answers: {
      a: `It's used to list only numbers`,
      b: `It's used to list only names`,
      c: `It's used to store passwords `,
      d: `It's used to store data in local storage`,
      e: `It's used to list complex data sets with key-value pairs`
    },
    correct: `e`
  },
  {
    question: `In JavaScript, what is meant by "hoisting"?`,
    answers: {
      a: `It's the order in which CSS links are inputted on an HTML page`,
      b: `It's the alphabetical order in which key value pairs appear in the console.`,
      c: `It's when a function is called before it is defined`,
      d: `It's used to copy and paste variables into local storage`,
      e: `It's when a function is console logged first to test if it's working correctly.`
    },
    correct: `c`
  },
  answers: {
    question: `What is the only situation where a programmer would write "event.preventDefault()"?`,
  {
    a: `When a webpage needs a reset stylesheet before any other stylesheets are linked`,
    b: ` When an HTML needs to be tested across multiple browsers`,
    c: `When a programmer needs a code editor to stop autofilling text as it's being typed`,
    d: `When a programmer wants a shortcut to writing ids and classes on a tag`,
    e: `When a button is inside a form and a programmer wants to prevent the page from refreshing when the button is clicked`
  },
  correct: `e`
},
answers: {
  question: `Which of the following statements is false?`,
  {
    a: `Global variables take precedence over local variables.`,
    b: `Id selectors override class selectors`,
    c: `Backticks, unlike using single quotes or double quotes, allow for code to be written on multiple lines`,
    d: `All variables in a ternary should be defined before an operatin is created`,
    e: `Functions should be written with const, not let.`,
  },
    correct: `a`
}
];

document.getElementById('btnOne').addEventListener('click', () =>){
  function createQuiz() {
    let output = ' '
    let answers

    for (let i = 0; i < listQuestions.length; i++) {
      answers = ' '
      for (letter in listQuestions[i].answers) {
        answers.push(
          `<label>
        <input type="radio" name="listQuestions[i]"
         value="${letter}">
            ${letter} + ':'
            ${listQuestions[i].answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${listQuestions[i].question} </div>
        <div class="answers"> ${answers.join(' ')} </div>`
      );
    }
  );
    quiz.innerHTML = output.join(' ')

    createQuiz()

    document.getElementById('btnOne').addEventListener('click', () => {
      let clock = document.getElementById('clock');
      let timePassing = setInterval(() => {
        let timeLeft = getTimeRemaining(endtime === 0);
        clock.innerHTML =
          'minutes: ' + `${minutes}` +
          'seconds: ' + `${seconds}`
        count--
        if (timeLeft ==== 0) {
          clearInterval(timeinterval);
    }
        }, 1000);
}
    })

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function displayResults() { }
const answerHolders = quiz.querySelectorAll('.answers');
let score = 0
let results = ' '

for (let i = 0; i < listQuestions.length; i++) {
  let chosen = (answerHolders[i].querySelector(`input[name=listQuestions[i]:checked`) || {}).value

  if (userAns === listQuestionst[i].correct) {
    score++
    alert("You got it right!")
  }
  else {
    alert("You did not choose the correct answer.")
    //subtract ten seconds from timer
  }
});

displayResults()

results = document.getElementById('submit').addEventListener('click', () =>) {
  document.getElementById('hiddenResults').style.display.inline
  document.getElementById('results-span').textContent = `${score} out of ${listQuestions.length}correct`
}



