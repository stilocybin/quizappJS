function init() {
  document.querySelector('#btnstart').addEventListener('click', startQuiz);
}

init();

function startQuiz() {
  fetchQuestions().then(displayQuestions);
}

async function fetchQuestions() {
  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&difficulty=medium&type=boolean'
    );
    console.log(response);

    if (!response.ok) {
      throw new Error('Netzwerkfehler!!');
    }

    const questions = await response.json();
    console.log(questions);
    return questions.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function displayQuestions(questions) {
  let html = '';
  for (const {
    category,
    question,
    correct_answer,
    incorrect_answers,
  } of questions) {
    html += `<li><form><small>${category}</small><br>${question} <br> 
    <input type="radio" id="True" name="choice" value="${correct_answer}">
    <label for="True">True </label>
    <input type="radio" id="False" name="choice" value="${incorrect_answers}">
    <label for="False">False </label><br>
    <br></form>
    
    
    </li>`;
  }
  document.querySelector('.questionwrapper').innerHTML = html;

  const btn = document.createElement('button');
  btn.setAttribute('id', 'btnloesen');
  btn.innerHTML = 'Lösung';
  document.querySelector('.questionwrapper').appendChild(btn);

  btn.addEventListener('click', checkAwnsers);
}

function checkAwnsers() {
  const radioTrue = document.querySelectorAll('#True');
  const radioFalse = document.querySelectorAll('#False');

  console.log(radioTrue);
  console.log(radioFalse);

  radioTrue.forEach((rt) => {
    if (rt.checked && rt.value === 'True') {
      console.log(rt, 'KORREKT');
    }
  });
  radioFalse.forEach((rf) => {
    if (rf.checked && rf.value === 'False') {
      console.log(rf, 'KORREKT');
    }
  });
}
