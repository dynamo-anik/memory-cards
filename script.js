const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//keep track of current card

let currentActiveCard = 0;

//store DOM Cards
const cardsEl = [];

//store card answer question data

// const cardsData = [
//   {
//     question: "AMD's most powerful comsumer  processor?",
//     answer: 'R9 3950X 16 core 32 threads Processor',
//   },
//   {
//     question:
//       'Nvdia is going to announced its new ampere GPU at 1st sep. doses nvdia will be able to impress us? ',
//     answer:
//       'Yes, but the pricing should have been even better, RTX 3090 will cost you $1400',
//   },
//   {
//     question: 'Top 5 processors to buy now',
//     answer: 'i9 10900k, R9 3950X, R9 3900X, R5 3600, i5 10600k',
//   },
// ];

const cardsData = getCardsData();

//get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));

  return cards === null ? [] : cards;
}

//add cards to local storage

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

//create all cards

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//create a single card
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
  </div>
  `;

  //click event for showing answer on any cards
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  //add to the DOM
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

//show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//add event listerners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//show add conatainer
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//close add conatainer
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//adding cards new
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;

  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

//clear cards
clearBtn.addEventListener('click', () => {
  localStorage.clear();

  cardsContainer.innerHTML = '';

  window.location.reload();
});

/////////////////////////////////////////////////////////
//trying infinite sliding but not work on prev
// prevBtn.addEventListener('click', () => {
//   if (currentActiveCard <= 0) {
//     cardsEl[cardsEl.length - 1].className = 'card left';

//     cardsEl[currentActiveCard].className = 'card';

//     currentActiveCard = cardsEl.length - 1;

//     cardsEl[currentActiveCard].className = 'card active';
//   } else {
//     cardsEl[currentActiveCard + 1].className = 'card';
//     cardsEl[currentActiveCard].className = 'card left';

//     currentActiveCard--;

//     cardsEl[currentActiveCard].className = 'card active';
//   }

//   updateCurrentText();
// });

// nextBtn.addEventListener('click', () => {
//   if (currentActiveCard >= cardsEl.length - 1) {
//     cardsEl[currentActiveCard - 1].className = 'card ';

//     cardsEl[currentActiveCard].className = 'card left';

//     currentActiveCard = 0;

//     cardsEl[currentActiveCard].className = 'card active';
//   } else {
//     if (currentActiveCard <= 0) {
//       cardsEl[cardsEl.length - 1].className = 'card ';
//     } else cardsEl[currentActiveCard - 1].className = 'card ';

//     cardsEl[currentActiveCard].className = 'card left';

//     currentActiveCard++;

//     cardsEl[currentActiveCard].className = 'card active';
//   }

//  cardsEl;
// updateCurrentText();
//});
//////////////////////////////////////////////////////////////

//init
createCards();
