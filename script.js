import {WORDS} from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; //each letter we guess goes in here
let nextLetter = 0; //index of array starting at 0
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]; //looks at array WORDS and chooses a random word from list - math.floor rounds to whole number
console.log(rightGuessString)

function initBoard() { //the UI for the board
    let board = document.getElementById('game-board');

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) { //looping through 6 rows where 5 boxes will be appended
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {   //looping (nesting) 5 boxes. each box it creates is appended to a row
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row) //appends this to the board
    }
}

initBoard()

//listening for keyboard press
document.addEventListener("keyup", (e) => {
    if(guessRemaining === 0) {
        return
    }
    let pressedKey = String(e.key)
    if (pressedKey == "Backspace" && nextLetter !== 0) {
        deleteLetter();
    return
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey);
    }
    console.log(pressedKey)
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) { //remember starts at 0 index
        return
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName('letter-row') [6-guessRemaining] //makes sure our guesses are going into empty row
    let box = row.children[nextLetter] //tracks the box index
    box.textContent = pressedKey //puts letter in box
    box.classList.add("filled-box") //gives it a new css class
    currentGuess.push(pressedKey) //adds pressed key to current guess array
    nextLetter += 1 //makes sure we don't hit end of row and keep going
};

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')
    [6 - guessRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = '' //makes the box empty when deleting
    box.classList.remove('filled-box')
    currentGuess.pop() //removes last element from array
    nextLetter -= 1 //remembers to remove from the index as well
};

function checkGuess() {
    let row = document.getElementsByClassName("letter-row") [6 - guessRemaining]
    let guessString = '' //convert our array into string and check against word list
    let rightGuess = Array.from(rightGuessString) //creates new array rightGuess from rightGuessString
    //When you use Array.from(rightGuessString), it iterates over each character in the rightGuessString
    //and creates an array with each character as an element. So if rightGuessString is, for example, "apple",
    //Array.from(rightGuessString) will result in ['a', 'p', 'p', 'l', 'e'].

    for (const val of currentGuess) { //for each value in currentGuess array will be turned into a string, takes each item in array gets added to string
        guessString += val //each letter entered is added to the guessString
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return;
    }

    if (!WORDS.includes(guessString)) { //the ! added here means "is not included in WORDS"
        alert("Word not in list!")
        return;
    }

    for (let i=0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i] //child of row is a box, in each row, the box is a child
        let letter = currentGuess[i] //the index of our current guess

        let letterPosition = rightGuess.indexOf(currentGuess[i]) //checking if letter position matches with letter in row list, checking to see if letter entered is inside correct guess
        //check inside rightGuess and return the index of rightGuess, if the letter we chose exists inside the correct answer, then it'll return a valid index between 0 and 4

        //if letter doesn't exist you get back -1 as index, not null or undefined
        if (letterPosition === -1) {
            letterColor = 'grey'
        }else {
            if (currentGuess[i] === rightGuess[i]) { //[i] means index of currentGuess
                letterColor = 'green'
            }else{
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = '#'
        }
        let delay = 250 * i //just slows down the box color change
        setTimeout(() => {
            box.style.backgroundColor = letterColor
        }, delay)
    }
        if (guessString === rightGuessString) {  //force game to end on correct answer
            alert("You guessed right! Game over!")
            guessRemaining = 0
            return
        }else {
            guessRemaining -= 1;  //if not correct answer reduce guesses left
            currentGuess =  []; //create new empty array
            nextLetter = 0; //resetting index to 0  

            if (guessRemaining === 0) {
                alert("You've run out of guesses! Game Over!")
                alert(`The correct word was: "${rightGuessString}"`)
            }
        }
    
}

