import { scifiData } from "./question.js";
import { sportData } from "./question.js";
import { musicData } from "./question.js";

const main = document.createElement("main");
main.classList.add("main");
document.body.appendChild(main);
const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
main.appendChild(wrapper);
const leftSide = document.createElement("div");
leftSide.classList.add("left-side");
const rigthSide = document.createElement("div");
rigthSide.classList.add("right-side");
const gallowsWrapper = document.createElement("div");
gallowsWrapper.classList.add("rel-area");
gallowsWrapper.appendChild(leftSide);

wrapper.appendChild(gallowsWrapper);
// rigthSide.appendChild(leftSide);
wrapper.appendChild(rigthSide);

const tree = document.createElement("img");
tree.classList.add("tree");
tree.src = "./assets/png/tree.png";
tree.alt = "tree-image";
leftSide.appendChild(tree);
const gallowsImg = document.createElement("img");
gallowsImg.classList.add("gallows");
gallowsImg.src = "./assets/png/gallows.png"
gallowsImg.alt = "gallows-image";
leftSide.appendChild(gallowsImg)
const head = document.createElement("img");
head.classList.add("head");
head.src = "./assets/png/head.png"
head.alt = "head-image";
leftSide.appendChild(head)
const body = document.createElement("img");
body.classList.add("body-part");
body.src = "./assets/png/body.png";
body.alt = "body-image";
leftSide.appendChild(body);
const leftHand = document.createElement("img");
leftHand.src = "./assets/png/left-hand.png";
leftHand.alt = "left-hand-image";
leftHand.classList.add("left-hand");
leftSide.appendChild(leftHand);
const rightHand = document.createElement("img");
rightHand.src = "./assets/png/right-hand.png";
rightHand.alt = "right-hand-image";
rightHand.classList.add("right-hand");
leftSide.appendChild(rightHand);
const leftLeg = document.createElement("img");
leftLeg.src = "./assets/png/left-leg.png";
leftLeg.alt = "left-leg-image";
leftLeg.classList.add("left-leg");
leftSide.appendChild(leftLeg);
const rightLeg = document.createElement("img");
rightLeg.src = "./assets/png/right-leg.png";
rightLeg.alt = "right-leg-image";
rightLeg.classList.add("right-leg");
leftSide.appendChild(rightLeg);

const incorrectAnswerWrapper = document.createElement("div");
incorrectAnswerWrapper.classList.add("incorrect-wrapper");
const incorrectTitle = document.createElement("span");
incorrectTitle.classList.add("incorrect-title");
incorrectTitle.textContent = "Incorrect guesses:";
incorrectAnswerWrapper.appendChild(incorrectTitle);
const incorrectCounter = document.createElement("span");
incorrectCounter.classList.add("incorrect-counter");
incorrectCounter.textContent = "0";
incorrectAnswerWrapper.appendChild(incorrectCounter);
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);
const modalBody = document.createElement("div");
modalBody.classList.add("modal-body");
modal.appendChild(modalBody);
const gameTitle = document.createElement("span");
gameTitle.textContent = "Hangman";
gameTitle.classList.add("game-title");
const statusWrapper = document.createElement("div");
modalBody.appendChild(gameTitle);
modalBody.appendChild(statusWrapper);
const chooseTitle = document.createElement("span");
chooseTitle.classList.add("choose-title");
chooseTitle.textContent = "Choose category of questions";
modalBody.appendChild(chooseTitle);
const chooseWrapper = document.createElement("div");
chooseWrapper.classList.add("choose-wrapper");
modalBody.appendChild(chooseWrapper);
const scifiCategory = document.createElement("button");
scifiCategory.textContent = "Sci-fi";
scifiCategory.classList.add("choose-btn");
scifiCategory.classList.add("btn-active");
const sportCategory = document.createElement("button");
sportCategory.textContent = "Sport"
sportCategory.classList.add("choose-btn");
const musicCategory = document.createElement("button");
musicCategory.textContent = "Music";
musicCategory.classList.add("choose-btn");
chooseWrapper.appendChild(scifiCategory);
chooseWrapper.appendChild(sportCategory);
chooseWrapper.appendChild(musicCategory);
const playBtn = document.createElement("button");
playBtn.textContent = "Play game";
playBtn.classList.add("play-btn");
modalBody.appendChild(playBtn);
const keyboardWrap = document.createElement("div");
const categoryTitleWrapper = document.createElement("div");
const hintModal = document.createElement("div");
hintModal.classList.add("hint-modal");
const questIcon = document.createElement("img");
const help = document.createElement("span");
help.classList.add("help-title");
hintModal.appendChild(help);
const categoryTitle = document.createElement("span");
const categoryValue = document.createElement("span");


//needed variab
let indexCurrentQuestion;
let currentAnswer;
let failCounter = 0;
let currentCategory = scifiData;
let correctLetters = 0;
let categoryStr = "Sci-fi";

const modalButtons = [scifiCategory, sportCategory, musicCategory, playBtn];


modalButtons.forEach(el => {
    el.addEventListener("click", (e) => {
        if(e.target.textContent === "Sci-fi") {
            currentCategory = scifiData;
            categoryStr = "Sci-fi";
            e.target.classList.add("btn-active");
            modalButtons[1].classList.remove("btn-active")
            modalButtons[2].classList.remove("btn-active")
        }
        if(e.target.textContent === "Sport") {
            currentCategory = sportData;
            categoryStr = "Sport";
            e.target.classList.add("btn-active");
            modalButtons[0].classList.remove("btn-active")
            modalButtons[2].classList.remove("btn-active")
        }
        if(e.target.textContent === "Music") {
            currentCategory = musicData;
            categoryStr = "Music";
            e.target.classList.add("btn-active");
            modalButtons[0].classList.remove("btn-active")
            modalButtons[1].classList.remove("btn-active")
        }
        if(e.target.textContent === "Play game" || e.target.textContent === "Play again") {
            resetGame();
        }
    })
})

 




function renderKeys() {
    const alphabetic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    keyboardWrap.classList.add("keyboard-wrapp")
    for(let i = 0; i < alphabetic.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = alphabetic[i];
        btn.classList.add("btn-keyboard");
        btn.addEventListener("click", (e) => keyHandler(e.target))
        keyboardWrap.appendChild(btn)
    }
    main.appendChild(keyboardWrap)
}

function renderQuestion(category) {
    const question = document.createElement("span");
    question.classList.add("question");
    indexCurrentQuestion = Math.floor(Math.random() * category.length);
    const store = localStorage.getItem("user") || null;
    if(store) {
        const parsedStore = JSON.parse(store);
        while(parsedStore.lastIndex === indexCurrentQuestion) {
            indexCurrentQuestion = Math.floor(Math.random() * category.length); 
        }
    }
    question.textContent = category[indexCurrentQuestion][0]; 
    rigthSide.appendChild(question)  
    
}

function guessingWord(category) {
    const answer = category[indexCurrentQuestion][1];
    currentAnswer = answer;
    const lengthOfAnswer = answer.length;
    const answerTag = document.createElement("ul");
    for(let i = 0; i < lengthOfAnswer; i++) {
        const unit = document.createElement("li");
        unit.classList.add("guessing-units");
        answerTag.appendChild(unit);
    }
    rigthSide.appendChild(answerTag);
    console.log(answer)
}

function keyHandler(btn) {
    const uppercasedAnswer = currentAnswer.toUpperCase();
    btn.disabled = true;
    btn.style.cursor = "auto";
    if(uppercasedAnswer.includes(btn.textContent) && failCounter !== 6) {
        btn.style.backgroundColor = "#8bea6bde";
        const lettersOfAnswer = document.querySelectorAll("li");
        for(let i = 0; i < uppercasedAnswer.length; i++) {
            if(uppercasedAnswer[i] === btn.textContent) {
                correctLetters++;
                lettersOfAnswer[i].textContent = uppercasedAnswer[i];
                lettersOfAnswer[i].style.borderBottom = "none";
            }
        }
        if(correctLetters === currentAnswer.length) {
            statusWrapper.innerHTML = "";
            generateGameStatus("win")
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    } else {
        if(failCounter !== 6 && correctLetters !== currentAnswer.length) {
            failCounter++;
            btn.style.backgroundColor = "#d376a6e0";
        } 
        incorrectCounter.textContent = `${failCounter} / 6`;
       
        if(failCounter === 1) {
            head.classList.add("active-part");
        }
        if(failCounter === 2) {
            body.classList.add("active-part");
        }
        if(failCounter === 3) {
            leftHand.classList.add("active-part");
        }
        if(failCounter === 4) {
            rightHand.classList.add("active-part");
        }
        if(failCounter === 5) {
            leftLeg.classList.add("active-part");
        }
        if(failCounter === 6) {
            rightLeg.classList.add("active-part");
            statusWrapper.innerHTML = "";
            generateGameStatus("lose")
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    }
}

function clearParts() {
    const partsArr = [head, body, leftHand, rightHand, leftLeg, rightLeg];
    partsArr.map(el => el.classList.remove("active-part"));
}

function resetGame() {
    rigthSide.innerHTML = "";
    keyboardWrap.innerHTML = "";
    categoryTitleWrapper.innerHTML = "";
    questIcon.src = "./assets/svg/question.svg";
    questIcon.alt = "help-icon";
    questIcon.classList.add("help-icon");
    categoryTitleWrapper.classList.add("category-title-wrapper");
    
    categoryTitle.classList.add("category-title");
    categoryTitle.textContent = "Category:";
    
    categoryValue.classList.add("category-value");
    categoryValue.textContent = categoryStr;
    // rigthSide.appendChild(gallowsWrapper)
    categoryTitleWrapper.appendChild(hintModal);
    hintModal.appendChild(categoryTitle);
    hintModal.appendChild(categoryValue);
    categoryTitleWrapper.appendChild(questIcon);
    main.appendChild(categoryTitleWrapper);
    failCounter = 0;
    correctLetters = 0;
    playBtn.classList.add("btn-active");
    setTimeout(() => {
        modal.classList.add("modal-unactive");
    }, 1000);
    renderQuestion(currentCategory)
    guessingWord(currentCategory);
    help.textContent = currentCategory[indexCurrentQuestion][1];
    questIcon.title = currentCategory[indexCurrentQuestion][1];
    incorrectCounter.textContent = `${failCounter} / 6`;
    rigthSide.appendChild(incorrectAnswerWrapper);
    renderKeys();
    clearParts();  
   
    
}
function startGame() {
    categoryTitle.innerHTML = "";
    categoryValue.innerHTML = "";
    modal.classList.remove("modal-unactive");
    playBtn.classList.remove("btn-active");
    // clearParts();  
    saveToLocalStorage();
}


function generateGameStatus(status) {
    statusWrapper.classList.add("status-wrapper");
    const statusTitle = document.createElement("span");
    statusTitle.classList.add("status-title");
    statusTitle.textContent = "Answer:"
    const statusValue = document.createElement("span");
    statusValue.classList.add("status-title");
    gameTitle.textContent = status === "lose" ? "You lose!" : "You win!";
    playBtn.textContent = "Play again";
    statusValue.textContent = currentCategory[indexCurrentQuestion][1];
    statusWrapper.appendChild(statusTitle);
    statusWrapper.appendChild(statusValue);
}

document.addEventListener("keypress", (e) => {
    const alphabetic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keyDigitalArr = keyboardWrap.children;
    const letter = e.code.slice(-1);
    if((e.code === "Enter" || e.code === "Space") && !modal.classList.contains("modal-unactive")) {
        resetGame();
    }
    const currIndexKey = alphabetic.indexOf(letter);
    const answer = currentAnswer;
    if(currIndexKey !== -1 && !keyDigitalArr[currIndexKey].disabled) {
        keyHandler(keyDigitalArr[currIndexKey])
    }
});


function saveToLocalStorage() {
    const storage = {};
    storage.categ = categoryStr,
    storage.lastIndex = indexCurrentQuestion;
    if(localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(storage))
    } else {
        localStorage.setItem("user", JSON.stringify(storage))
    }
}

questIcon.addEventListener("click", openHint);
function openHint() {
    hintModal.classList.add("hint-modal-active");
    setTimeout(() => {
        hintModal.classList.remove("hint-modal-active");
    }, 2000)
}


console.log("Привет, проверяющий! Для твоего удобства ввод с физической клавиатуры может происходить как с русской раскладки, так и с английской! Ответ на вопрос можно найти также в консоли, либо нажав на вопросик в левом верхнем углу страницы. Всего хорошего!")

