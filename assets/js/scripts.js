// Elementos do DOM
const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $finishQuizButton = document.querySelector(".finish-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $loginContainer = document.querySelector(".login-container");
const $finalMessages = document.querySelector(".final-messages");
const $nameInput = document.getElementById("name");
const $emailInput = document.getElementById("email");
const $birthdateInput = document.getElementById("birthdate");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $container = document.querySelector('.container');

const questions = [
  {
    question: 'No contexto de controle de versão, o que significa a operação "commit"?',
    answers: [
      { text: "Comparar duas versões de um arquivo", correct: false },
      { text: "Restaurar para uma versão anterior", correct: false },
      { text: "Salvar as alterações feitas", correct: true },
      { text: "Mesclar duas branches", correct: false },
    ],
  },
  {
    question: "O que é um deadlock?",
    answers: [
      { text: "Um erro de compilação", correct: false },
      { text: "Um tipo de vírus de computador", correct: false },
      { text: "Um estado em que dois ou mais processos estão esperando uns pelos outros para completar, criando um impasse", correct: true },
      { text: "Um tipo de exceção", correct: false },
    ],
  },
  {
    question: 'O que "www" em um URL significa?',
    answers: [
      { text: "Web Wide Word", correct: false },
      { text: "World Wide Web", correct: true },
      { text: "Web Window Work", correct: false },
      { text: "Work Web Window", correct: false },
    ],
  },
  {
    question: "Qual das opções abaixo não é um tipo de loop em programação?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: false },
      { text: "do-while", correct: false },
      { text: "do-for", correct: true },
    ],
  },
  {
    question: 'Como escrever "Hello World" numa caixa de alerta?',
    answers: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
    ],
  },
  {
    question: "Em design de software, o que o padrão Singleton garante?",
    answers: [
      { text: "Que várias instâncias de um objeto podem existir", correct: false },
      { text: "Que nenhuma instância de um objeto exista", correct: false },
      { text: "Que apenas uma instância de um objeto exista em todo o programa", correct: true },
      { text: "Que um objeto pode ser instanciado apenas uma vez por classe", correct: false },
    ],
  },
  {
    question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
    answers: [
      { text: 'call minhaFuncao()', correct: false },
      { text: 'call function minhaFuncao()', correct: false },
      { text: 'Nenhum desses códigos chamaria essa função', correct: false },
      { text: 'minhaFuncao()', correct: true },
    ],
  },
];

// Variáveis de controle
let currentQuestionIndex = 0;
let totalCorrect = 0;

// Adiciona um ouvinte de evento de clique ao botão "Começar Quiz"
$startGameButton.addEventListener("click", startGame);

// Adiciona um ouvinte de evento de clique ao botão "Próxima pergunta"
$nextQuestionButton.addEventListener("click", displayNextQuestion);

// Adiciona um ouvinte de evento de clique ao botão "Finalizar"
$finishQuizButton.addEventListener("click", finishGame);


// Função para iniciar o jogo
function startGame() {
  const name = $nameInput.value;
  const email = $emailInput.value;
  const birthdate = $birthdateInput.value;

  if (!name || !email || !birthdate) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  alert(`Bem-vindo, ${name}! Vamos começar o quiz.`)

  //$loginContainer.classList.add("hide");
  $loginContainer.style.display = 'none';
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

// Função para mostrar a próxima pergunta
function displayNextQuestion() {
  resetState();

  if (currentQuestionIndex === questions.length - 1) {
    $nextQuestionButton.style.display = 'none';
    $finishQuizButton.classList.remove("hide");
  }

  const question = questions[currentQuestionIndex];
  $questionText.innerHTML = `Questão ${currentQuestionIndex + 1} - ` + question.question;

  question.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    $answersContainer.appendChild(answerButton);
    answerButton.classList.add("button", "answer");
    answerButton.textContent = answer.text;
    answerButton.addEventListener("click", () => selectAnswer(index));
  });
}

// Função para redefinir o estado
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }
  document.body.removeAttribute("class");
}

// Função para selecionar uma resposta
function selectAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];

  if (question.answers[selectedIndex].correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}


//Função para finalizar o jogo
function finishGame() {
  $questionsContainer.classList.add("hide");
  $finalMessages.classList.remove("hide");

  const totalQuestions = questions.length;
  const performance = (totalCorrect / totalQuestions) * 100;

  let message = "";

  

  if (performance <= 70) {
    document.body.classList.add('reprovou')
    document.body.classList.remove('incorrect')
    document.body.classList.remove('correct')
    message = `
      <p style="font-size: 20px"><b>Você acertou ${totalCorrect} de ${totalQuestions} questões.</b></p>
      <p>Infelizmente, você não atingiu a pontuação mínima para a mensagem especial.</p>
      <p>Tome mais uma xícara de café e continue programando com paixão! ☕👩‍💻👨‍💻</p>
      <button class="button" onclick="restartQuiz()">Refazer teste</button>
    `;
    
  } else {
    document.body.classList.add('passou')
    document.body.classList.remove('incorrect')
    document.body.classList.remove('correct')
    message = `
    <p style="font-size: 30px"><b>Parabéns!</b></p>
    <p>Você acertou ${totalCorrect} de ${totalQuestions} questões.
    <p>Você é a pessoa que transforma códigos em soluções!</p>
    <button class="button" onclick="showFinalMessage()"><span>Aperte aqui para finalizar</span></button>
    `; 
  }

  $finalMessages.innerHTML = `
    ${message}
  `;
}

// Função para reiniciar o quiz
function restartQuiz() {
  window.location.reload()
}


function showFinalMessage() {
  document.body.classList.remove('passou')
  document.body.classList.add('msg-final')
  $finalMessages.style.display = 'none';
  $container.style.display = 'none';
  $container.style.backgroundColor = '';
}