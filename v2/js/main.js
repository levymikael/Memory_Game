// creating an array of cards
var cardsArray = [{
    'name': 'cat',
    'img': 'img/ca1.jpg',
  },
  {
    'name': 'lizard',
    'img': 'img/ca2.jpg',
  },
  {
    'name': 'fox',
    'img': 'img/ca3.jpg',
  },
  {
    'name': 'rabbit',
    'img': 'img/ca4.jpg',
  },
  {
    'name': 'dog',
    'img': 'img/ca5.jpg',
  },
  {
    'name': 'sloth',
    'img': 'img/ca6.jpg',
  },
];
//randm sort of cards
var gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

var firstGuess = '';
var secondGuess = '';
var flipped = 0;
var previousTarget = null;
var delay = 1200;
var counter = 0;

// game section creation
var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// New game button
$(".newGame").on("click", () => {
  gameGrid.forEach(item => {
    var {
      name,
      img
    } = item;

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
});
var match = () => {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};
//after 2 wrong guesses, reset the counter 'flipped'
var resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  flipped = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  var clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (flipped < 2) {
    flipped++;
    if (flipped === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
//Cards match check
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        counter++;
        console.log(counter);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
  //new game proposal
  if (counter === 6) {
    console.log("hello");
    var newGame = document.createElement('div');
    var btnNewGame = document.createElement('button');
    document.getElementById("game").appendChild(newGame);
    newGame.innerHTML= "You won!"
    newGame.appendChild(btnNewGame);
    btnNewGame.innerHTML = "Start a new game";
    btnNewGame.setAttribute("id","newGame")
  }
});

$("#newGame").on("click", () => {
  document.location.reload(true)});