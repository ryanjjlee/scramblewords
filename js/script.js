/* Flow

Wait for user to click start
Initialize
    Letter bank populates, empty word guess boxes appear, timer starts counting down
User clicks guess box
Useer types word guess
    If guess === word from word bank, one correct
    If guess !== word from word bank
        error msg
        clear guess in box
If timer ends before all correct guesses, no more guesses allowed
    Show lose msg
    Show next level btn
    Wait for user to click next level
        Re initialize
If user guesses all words
    Show win msg
    Show next level btn
    Wait for user to click next level
        Re-initialize
*/


/*----- app's state (variables) -----*/
const gameTime = 60;
let level;

const words = '';
const userKeyInputs = [];
let guessedWord = '';
const userGuesses = [];

const letterBank = [
    {level: 1,
        letters: "erareus",
        words: ['erasure', 'eraser', 'searer', 'erase', 'rears','reuse', 'rares','reuse','saree','surer', 'assure', 'erases']}
    ]
    
let lettersInBank;

/*----- cached element references -----*/



/*----- event listeners -----*/
//  Wait for user to click start


/*----- functions -----*/

/* to INITIALIZE:
-   choose level letters
-   populate letter bank
-   create guesses forms

-   after win/loss is met
-   show next level button
-   choose level letters
-   populate letter bank
-   create guesses form
*/

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Get letters
let getLevelLetters = function(level) {
    let levelLetters = letterBank[level - 1].letters.split('');
    return levelLetters;
};

// Get words
    // - shuffle word array
    // - choose first six words in shuffled array
let getLevelWords = function(level) {
    return letterBank[level - 1].words;
};

function outOfTime(){
    $('#guesses').prop('disabled', true);
    alert('time out');
};

function disableStartBtn() {
    $('#start-game').prop('disabled', true);
};

// class Timer{
//     constructor() {
//         this.isRunning = false;
//         this.currentTimer = 0;
//         this.runTimer;
//         this.time = $('#clock');
//     }
// }

// function startTimer(){
//     if(!this.isRunning){
//         this.isRunning = true;
//         this.runTimer = setInterval(
//             ()=>{this.time.innerHTML = ++this.currentTimer;
//         }, 1000);
//     }
// };

// function stopTimer(){
//     if(this.isRunning){
//         clearInterval(this.runTimer);
//         this.isRunning = false;
//     }
// };



// Initialize
const initialize = function() {
    level = 1;
    //  Get letters for bank, shuffle, and return
    lettersInBank = getLevelLetters(level);
    shuffleArray(lettersInBank);
};

//  PRESS START
$('#start-game').click(function(e) {
    let levelWords = getLevelWords(level);
    let $timeDisplay = $('#clock');
    disableStartBtn();
    
    // Start timer countdown
    // const newGameTimer = new Timer();

    // newGameTimer.startTimer();
    // setTimeout(
    //     function(){
    //         newGameTimer.stop();
    //     }, gameTime
    // );

    // RENDER GUESS FORMS
    for (i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * levelWords.length);
        let currentWord = levelWords[randomIndex];
        const $newGuessForm = $(`
            <br>    
            <div class="input-group guesses-form" id="guesses-form-${i+1}">
            <div class="input-group-prepend">
            <span class="input-group-text">Word ${i+1}</span>
            </div>
            <div class="input-group letters">
            ${
                currentWord.split('').map(function(letter){
                    return `<input type="text" aria-label="letter ${i+1}" class="form-control ${i+1}" maxlength="1">`
                }).join(' ')
            }
            </div>
            <button type="button" class="btn btn-warning">Submit Word</button>
            <br>
        `)
        $('.card-group > .card > #guesses').append($newGuessForm);
    }

    // display level letters in bank
    lettersInBank.forEach(function(letter) {
        let $letterToDisplay = (`
            <div class="letter">${letter.toUpperCase()}</div>
        `)
        $('.card > .card-body > #letter-bank').append($letterToDisplay);
    });

    // Check for valid input
    const checkForValidInput = function(userChoice) {
        if(lettersInBank.includes(userChoice)){
            return true;
        } else if(userKeyInputs.includes(userChoice)) {
            return false;
        } else {
            return false;
        }
    };
    
    // User input on keyboard
    $('#guesses').keypress(function(e){
        const userChoice = e.key.toLowerCase();
        if(!checkForValidInput(userChoice)){
            e.preventDefault();
        };
        userKeyInputs.push(userChoice);
        return userKeyInputs;
    });

    // CHECK IF WORD IS IN WORD BANK
    function checkCorrectWord() {
        return levelWords.includes(guessedWord);
    };
    
    // CHECK IF WORD NOT ALREADY GUESSED
    function wordNotAlreadyGuessed() {
        return !userGuesses.includes(guessedWord);
    };
    
    // CHECK IF ALL LETTER BOXES ARE FILLED
    const allLettersFilled = function(input){
         if(input.length === guessedWord.length){
             return true
         } else {
             return false;
         };
    }; 

    // JOIN USER INPUT LETTERS INTO WORD STRING
    const joinLetters = function($guessedLetters) {
        $guessedLetters.each(function() {
            guessedWord += this.value;
        });
    };

    // Handler - Submit Word 
    let $btnSubmitWord = $('#guesses > .guesses-form > button');
    
    // SUBMIT WORD
    $btnSubmitWord.click(function(e) {
        let $guessedLetters = $(this).siblings('.letters').children();
        
        joinLetters($guessedLetters);

        if(checkCorrectWord() && wordNotAlreadyGuessed() && allLettersFilled($guessedLetters)){
            $(this).css("background-color", "#90ee90");
            $(this).prop('disabled', true);
            $guessedLetters.prop('disabled', true);
            $guessedLetters.css("background-color", "#90ee90");
            userGuesses.push(guessedWord);
            guessedWord = '';
        } else {
            $guessedLetters.css("background-color", "#ffa07a");
            guessedWord = '';
        }
    });
});


// function nextLevel() {
//     .value = ''
//      level = level++;
// }



/*----- initialization -----*/
initialize();
