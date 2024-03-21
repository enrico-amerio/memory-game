let game = document.querySelector('.game');
let gameFreezer = document.querySelector('.game-freezer');
const popupContainer = document.querySelector('.popup-container')
const refreshBtn = document.getElementById("refresh-btn");
let points = 0;
const cardsArray = [
  { name: "Img 1", img: "../img/elf.png", ID: 1 },
  { name: "Img 2", img: "../img/frodo.png", ID: 2 },
  { name: "Img 3", img: "../img/gandalf.png", ID: 3 },
  { name: "Img 4", img: "../img/gollum.png", ID: 4 },
  { name: "Img 5", img: "../img/legolas.png", ID: 5 },
  { name: "Img 6", img: "../img/orc.png", ID: 6 },
  { name: "Img 7", img: "../img/ring.png", ID: 7 },
  { name: "Img 8", img: "../img/sauron.png", ID:8 },
];
let duplicateArray = cardsArray.slice();
let finalArray = cardsArray.concat(duplicateArray);
let hasFlippedCard = false;
let firstCard;
let secondCard;

shuffle(finalArray);
for(let i = 0; i < finalArray.length; i++){
 game.innerHTML += `<div class="card d-flex" data-card-number="${finalArray[i].ID}">
  <div class="front-face"><img src="${finalArray[i].img}" alt=""></div>
  <div class="back-face"></div>
  </div>`
};

const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
  card.addEventListener("click", function(){
    card.classList.add('flip')
    if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = card;
    }else{
      secondCard = card;
      if(firstCard.dataset.cardNumber === secondCard.dataset.cardNumber){
        points++
        console.log(points);
        firstCard = null;
        secondCard = null;
        hasFlippedCard = false;
      }else{
        freezeBoard()
        setTimeout(removeFlip,800)
      }
    }
    if(points === 8){
      setTimeout(endGame,1000)
    }
  })
});
refreshBtn.addEventListener("click", function(){
  window.location.reload();
});
function removeFlip(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  hasFlippedCard = false;
};
function freezeBoard(){
  gameFreezer.classList.remove('d-none');
  setTimeout(unfreezeBoard,800);
}
function unfreezeBoard(){
  gameFreezer.classList.add('d-none');
}
function endGame(){
  popupContainer.classList.remove('d-none');
}
// Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
